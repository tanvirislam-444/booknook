"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  totalCopies: number;
  description: string;
  image: string;
}

interface EditBookProps {
  book: Book;
  onUpdate: (id: string, formData: Partial<Book>) => Promise<void>;
}

const EditBook = ({ book, onUpdate }: EditBookProps) => {
  const [category, setCategory] = React.useState<string | null>(book.category);
  const [open, setOpen] = React.useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const updatedBook = {
      title: formData.get("title") as string,
      author: formData.get("author") as string,
      category: category??"",
      totalCopies: Number(formData.get("totalCopies")),
      description: formData.get("description") as string,
      image: formData.get("image") as string,
    };
    try {
      await onUpdate(book._id, updatedBook);
      setOpen(false);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <button
            type="button"
            className="rounded-lg bg-[#e8d5bd] px-4 py-2 text-sm font-semibold text-[#70452e] shadow-none hover:bg-[#d6bea1]"
          >
            Edit
          </button>
        }
      />

      <DialogContent className="max-h-[90vh] overflow-y-auto border-[#eadfce] bg-[#fffdf8] sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#35251c]">
            Edit Book
          </DialogTitle>

          <DialogDescription className="text-[#927e6e]">
            Update your book information below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
      
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#715b49]">
              Book Title
            </label>
            <Input
              name="title"
              defaultValue={book.title}
              required
              className="border-[#eadfce] focus-visible:ring-[#b65e35]"
            />
          </div>

       
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#715b49]">
              Author
            </label>
            <Input
              name="author"
              defaultValue={book.author}
              required
              className="border-[#eadfce] focus-visible:ring-[#b65e35]"
            />
          </div>

         
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#715b49]">
              Category
            </label>

            <Select
              name="category"
              value={category}
              onValueChange={setCategory}
            >
              <SelectTrigger className="w-full border-[#eadfce]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Fiction">Fiction</SelectItem>
                <SelectItem value="Non-Fiction">Kids</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
                <SelectItem value="History">History</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Self-help">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#715b49]">
              Total Copies
            </label>
            <Input
              name="totalCopies"
              type="number"
              min="1"
              defaultValue={book.totalCopies}
              required
              className="border-[#eadfce] focus-visible:ring-[#b65e35]"
            />
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#715b49]">
              Image URL
            </label>
            <Input
              name="image"
              type="url"
              defaultValue={book.image}
              required
              className="border-[#eadfce] focus-visible:ring-[#b65e35]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#715b49]">
              Description
            </label>
            <Textarea
              name="description"
              defaultValue={book.description}
              rows={4}
              required
              className="resize-none border-[#eadfce] focus-visible:ring-[#b65e35]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-[#eadfce] text-[#715b49]"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="bg-[#b65e35] font-semibold text-white hover:bg-[#984a29]"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBook;
