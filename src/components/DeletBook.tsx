
"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  totalCopies: number;
  description: string;
  image: string;
}

interface DeleteBookProps {
  book: Book;
  onDelete: (id: string) => void;
}

const DeleteBookPage = ({ book, onDelete }: DeleteBookProps) => {
  const handleDelete = async () => {
    try {
      const token = await getTokenFromClient()
      const res = await fetch( `http://localhost:8000/books/${book._id}`,
        {
          method: "DELETE",
                headers: {
        Authorization: `Bearer ${token}`
      },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete book");
      }

      onDelete(book._id);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <button
            type="button"
            className="rounded-lg bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-200"
          >
            Delete
          </button>
        }
      />

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete {book.title}?
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBookPage;

