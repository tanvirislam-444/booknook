"use client";

import { useState, useRef, useSyncExternalStore } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { toast } from "sonner";
import {
  BookPlus,
  ImagePlus,
  CalendarDays,
  UserRound,
  Mail,
  Upload,
  X,
  Copy,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const initialForm = {
  title: "",
  author: "",
  category: "",
  totalCopies: 1,
  description: "",
  image: "",
};

// Display the date without causing a hydration mismatch.
const getDate = () =>
  new Date().toLocaleDateString("en-GB", {
    dateStyle: "full",
  });

const getServerDate = () => "";
const subscribe = () => () => {};

export default function AddBookPage() {
  const [form, setForm] = useState(initialForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageName, setImageName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const dateAdded = useSyncExternalStore(
    subscribe,
    getDate,
    getServerDate
  );

  // Demo information. Replace with Better Auth session data later.
  const userName = "Tanvir Islam";
  const userEmail = "tanvir@gmail.com";

  // Handle image selection
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      e.target.value = "";
      return;
    }

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImageFile(file);
    setImageName(file.name);
    setImagePreview(URL.createObjectURL(file));
  };

  // Remove selected image
  const removeImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImageFile(null);
    setImagePreview(null);
    setImageName("");

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.category) {
      toast.error("Please select a book category.");
      return;
    }

    if (!imageFile) {
      toast.error("Please select a book cover image.");
      return;
    }

    if (form.totalCopies < 1 || !Number.isInteger(form.totalCopies)) {
      toast.error("Total copies must be at least 1.");
      return;
    }

    try {
      setIsSubmitting(true);

      //  Upload image to your Next.js API route
      const imageFormData = new FormData();
      imageFormData.append("image", imageFile);

      const imageResponse = await fetch("/api/upload-image", {
        method: "POST",
        body: imageFormData,
      });

      const imageResult = await imageResponse.json();

      if (!imageResponse.ok) {
        throw new Error(imageResult.message || "Image upload failed.");
      }

      //  Get the hosted image URL
      const imageUrl = imageResult.imageUrl;

      if (!imageUrl) {
        throw new Error("Could not get the uploaded image URL.");
      }

      //  Create the book data, including the date
      const createdAt = new Date().toISOString();

      const bookData = {
        ...form,
        image: imageUrl,
        createdAt,
        userName,
        userEmail,
      };

      //  Save book data to your Express API
      const response = await fetch("http://localhost:8000/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add book.");
      }

      toast.success("Book added successfully!");

      // Reset form after successful submission
      setForm(initialForm);
      removeImage();

      console.log("Saved book:", result);
    } catch (error) {
      console.error("Add book error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F5EF] px-4 py-10 md:py-14">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[3px] text-[#B97852]">
              BookNook / Add Book
            </p>

            <h1 className="font-serif text-3xl font-bold text-[#422B1F] md:text-4xl">
              Share a New Story
            </h1>

            <p className="mt-2 text-sm text-[#81766B]">
              Add a book to your collection and share it with readers.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-[#8A796B]">
            <BookPlus size={17} className="text-[#B97852]" />
            New Collection
          </div>
        </div>

        <Card className="overflow-hidden rounded-xl border-[#E9DED0] bg-white shadow-[0_8px_30px_rgba(66,43,31,0.05)]">
          <CardContent className="p-0">
            <form onSubmit={handleSubmit}>
              <div className="border-b border-[#EFE7DC] bg-[#FCFAF6] px-6 py-5 md:px-8">
                <h2 className="font-serif text-xl font-bold text-[#422B1F]">
                  Book Information
                </h2>

                <p className="mt-1 text-sm text-[#95877B]">
                  Enter the details of the book you want to add.
                </p>
              </div>

              <div className="grid gap-8 p-6 md:grid-cols-[1fr_280px] md:p-8">
                {/* Book fields */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-[#422B1F]">
                      Book Title <span className="text-[#BD6743]">*</span>
                    </Label>

                    <Input
                      id="title"
                      name="title"
                      required
                      value={form.title}
                      onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                      }
                      placeholder="Enter the book title"
                      className="h-11 border-[#E6D9C9] bg-white focus-visible:ring-[#B97852]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="author" className="text-[#422B1F]">
                      Author Name <span className="text-[#BD6743]">*</span>
                    </Label>

                    <Input
                      id="author"
                      name="author"
                      required
                      value={form.author}
                      onChange={(e) =>
                        setForm({ ...form, author: e.target.value })
                      }
                      placeholder="Enter author's name"
                      className="h-11 border-[#E6D9C9] focus-visible:ring-[#B97852]"
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <Label className="text-[#422B1F]">
                      Category <span className="text-[#BD6743]">*</span>
                    </Label>

                    <Select
                      value={form.category}
                      onValueChange={(value) =>
                        setForm({ ...form, category: value ?? "" })
                      }
                    >
                      <SelectTrigger className="h-11 w-full border-[#E6D9C9] focus:ring-[#B97852]">
                        <SelectValue placeholder="Choose a category" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="Fiction">Fiction</SelectItem>
                        <SelectItem value="Science">Science</SelectItem>
                        <SelectItem value="History">History</SelectItem>
                        <SelectItem value="Kids">Kids</SelectItem>
                        <SelectItem value="Others">Others</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="totalCopies" className="text-[#422B1F]">
                      Total Copies <span className="text-[#BD6743]">*</span>
                    </Label>

                    <div className="relative">
                      <Copy
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B97852]"
                      />

                      <Input
                        id="totalCopies"
                        name="totalCopies"
                        type="number"
                        min="1"
                        step="1"
                        required
                        value={form.totalCopies}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            totalCopies: Number(e.target.value),
                          })
                        }
                        className="h-11 border-[#E6D9C9] pl-10 focus-visible:ring-[#B97852]"
                      />
                    </div>

                    <p className="text-xs text-[#A3978C]">
                      Enter the total number of copies available in your
                      library.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-[#422B1F]">
                      Short Description{" "}
                      <span className="text-[#BD6743]">*</span>
                    </Label>

                    <Textarea
                      id="description"
                      name="description"
                      required
                      value={form.description}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                      rows={5}
                      placeholder="Write a short introduction about this book..."
                      className="resize-none border-[#E6D9C9] focus-visible:ring-[#B97852]"
                    />

                    <p className="text-right text-xs text-[#A3978C]">
                      Write a brief description for readers.
                    </p>
                  </div>
                </div>

                {/* Image upload */}
                <div className="space-y-3">
                  <Label className="text-[#422B1F]">
                    Book Cover Image <span className="text-[#BD6743]">*</span>
                  </Label>

                  <div className="relative flex min-h-[330px] flex-col items-center justify-center overflow-hidden rounded-lg border border-dashed border-[#DCCBBB] bg-[#FCFAF6] p-4 text-center">
                    {imagePreview ? (
                      <>
                        <Image
                          src={imagePreview}
                          alt="Book cover preview"
                          fill
                          unoptimized
                          className="object-contain p-4"
                        />

                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute right-3 top-3 z-10 rounded-full bg-[#422B1F] p-2 text-white hover:bg-[#BD6743]"
                          aria-label="Remove image"
                        >
                          <X size={16} />
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F1E5D7] text-[#B97852]">
                          <ImagePlus size={27} />
                        </div>

                        <h3 className="font-serif font-semibold text-[#422B1F]">
                          Upload Book Cover
                        </h3>

                        <p className="mt-2 text-xs leading-5 text-[#948477]">
                          Choose an image from your device.
                          <br />
                          PNG, JPG or JPEG
                        </p>

                        <label
                          htmlFor="book-image"
                          className="mt-5 flex cursor-pointer items-center gap-2 rounded-md bg-[#BD6743] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#A95434]"
                        >
                          <Upload size={15} />
                          Choose Image
                        </label>
                      </>
                    )}

                    <Input
                      ref={imageInputRef}
                      id="book-image"
                      name="image"
                      type="file"
                      accept="image/png,image/jpeg"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>

                  {imageName && (
                    <p className="truncate text-xs text-[#81766B]">
                      Selected: {imageName}
                    </p>
                  )}

                  <p className="text-xs leading-5 text-[#948477]">
                    Your book cover will be uploaded and its hosted URL will
                    be saved with the book.
                  </p>
                </div>
              </div>

              {/* User information */}
              <div className="mx-6 mb-7 rounded-lg border border-[#E9DED0] bg-[#FCFAF6] p-5 md:mx-8">
                <div className="mb-4">
                  <h3 className="font-serif text-lg font-bold text-[#422B1F]">
                    Added By
                  </h3>

                  <p className="mt-1 text-xs text-[#948477]">
                    Your account information
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-xs text-[#81766B]">
                      <UserRound size={14} />
                      User Name
                    </Label>

                    <Input
                      value={userName}
                      readOnly
                      className="h-10 border-[#E6D9C9] bg-[#F3EEE7] text-sm text-[#716357]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-xs text-[#81766B]">
                      <Mail size={14} />
                      Email Address
                    </Label>

                    <Input
                      value={userEmail}
                      readOnly
                      className="h-10 border-[#E6D9C9] bg-[#F3EEE7] text-sm text-[#716357]"
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 border-t border-[#E9DED0] pt-4 text-xs text-[#81766B]">
                  <CalendarDays size={15} className="text-[#B97852]" />
                  Date Added: {dateAdded || "Loading..."}
                </div>
              </div>

              {/* Submit */}
              <div className="flex flex-col-reverse gap-3 border-t border-[#EFE7DC] bg-[#FCFAF6] px-6 py-5 sm:flex-row sm:items-center sm:justify-between md:px-8">
                <p className="text-xs text-[#94877B]">
                  Fields marked with * are required.
                </p>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-11 rounded-md bg-[#BD6743] px-8 font-semibold text-white hover:bg-[#A95434]"
                >
                  <BookPlus size={17} className="mr-2" />
                  {isSubmitting ? "Adding Book..." : "Add Book"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="mt-5 text-center text-xs text-[#A3978C]">
          BookNook — A small library for curious minds.
        </p>
      </div>
    </main>
  );
}