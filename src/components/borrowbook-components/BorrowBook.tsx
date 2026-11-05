"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { toast } from "sonner";

interface Book {
  _id: string;
  title: string;
  image: string;
  totalCopies: number;
}
interface BorrowBookProps {
  book: Book;
  onBorrowSuccess: (remainingCopies: number) => void;
}

const BorrowBook = ({ book, onBorrowSuccess }: BorrowBookProps) => {
  const { data: session } = authClient.useSession();
  const [open, setOpen] = useState(false);

  const [borrowDate] = useState(() => new Date());

  const [returnDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date;
  });

  const handleBorrow = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session?.user) {
      toast.error("Please login first!");
      return;
    }

    try {
    

      const borrowData = {
        bookId: book._id,
        bookTitle: book.title,
        bookImage: book.image,
        userName: session.user.name,
        userEmail: session.user.email,
        borrowDate: borrowDate.toISOString(),
        returnDate: returnDate.toISOString(),
      };
        const token = await getTokenFromClient();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/borrows`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(borrowData),
      });

      const result = await res.json();

      
      if (!res.ok) {
        toast.error(result.message || "Failed to borrow book!");
        return;
      }

      onBorrowSuccess(result.remainingCopies);

      toast.success("Book borrowed successfully!");
      setOpen(false);
    } catch (error) {
      console.error("Borrow error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <button
            type="button"
            disabled={book.totalCopies <= 0 || !session?.user}
            className="mt-8 w-full rounded-lg bg-[#B97852] py-3 text-sm font-semibold text-white transition hover:bg-[#965638] disabled:cursor-not-allowed disabled:bg-[#FAF7F2] disabled:text-[#B97852]"
          >
            {book.totalCopies > 0
              ? "Borrow This Book"
              : "Currently Unavailable"}
          </button>
        }
      />

      <DialogContent data-lenis-prevent 
      className="max-h-[90dvh] overflow-y-auto overscroll-contain border-[#E8DCCB] bg-[#FFFDFA] sm:max-w-md"
      >
        <form onSubmit={handleBorrow}>
          <DialogHeader>
            <DialogTitle>Borrow This Book</DialogTitle>
            <DialogDescription>
              Confirm your information before borrowing this book.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <Label htmlFor="book-title">Book Title</Label>
              <Input id="book-title" value={book.title} readOnly />
            </Field>

            <Field>
              <Label htmlFor="user-name">Your Name</Label>
              <Input
                id="user-name"
                value={session?.user?.name ?? ""}
                readOnly
              />
            </Field>

            <Field>
              <Label htmlFor="user-email">Your Email</Label>
              <Input
                id="user-email"
                type="email"
                value={session?.user?.email ?? ""}
                readOnly
              />
            </Field>

            <Field>
              <Label htmlFor="borrow-date">Borrow Date</Label>
              <Input
                id="borrow-date"
                type="date"
                value={borrowDate.toISOString().split("T")[0]}
                readOnly
              />
            </Field>

            <Field>
              <Label htmlFor="return-date">Expected Return Date</Label>
              <Input
                id="return-date"
                type="date"
                value={returnDate.toISOString().split("T")[0]}
                readOnly
              />
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-5">
            <DialogClose
              render={
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              }
            />

            <Button
              className="bg-[#B97852] hover:bg-amber-900"
              type="submit"
              disabled={book.totalCopies <= 0 || !session?.user}
            >
              Borrow Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowBook;
