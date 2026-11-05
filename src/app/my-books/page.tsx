"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import EditBook from "@/components/EditBook";
import DeleteBookPage from "@/components/DeletBook";
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

const MyBooksPage = () => {
  const { data: session, isPending } = authClient.useSession();

  const [books, setBooks] = useState<Book[]>([]);

  const email = session?.user?.email;

  useEffect(() => {
    if (isPending) return;

    if (!email) {
      return;
    }

    const fetchMyBooks = async () => {
      const token = await getTokenFromClient();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/my-books?email=${encodeURIComponent(email)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await res.json();
      setBooks(data);
    };

    fetchMyBooks();
  }, [email, isPending]);

  const totalCopies = books.reduce(
    (total, book) => total + book.totalCopies,
    0,
  );

  const handleUpdate = async (
    id: string,
    updatedData: Partial<Book>,
  ): Promise<void> => {
    try {
      const token = await getTokenFromClient();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/books/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        },
      );

      if (!res.ok) {
        throw new Error("Failed to update book");
      }
      const result = await res.json();
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === id ? { ...book, ...updatedData } : book,
        ),
      );
      return result;
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const handleDelete = (id: string) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
  };

  return (
    <main className="min-h-screen bg-[#faf5eb] px-4 py-10 text-[#35251c] sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Collection</h1>
            <p className="mt-1 text-sm text-[#927e6e]">
              Manage the books you&apos;ve contributed to BookNook.
            </p>
          </div>

          <a
            href="/add-book"
            className="rounded-lg bg-[#b65e35] px-5 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-[#984a29]"
          >
            + Add New Book
          </a>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-center gap-4 rounded-xl border border-[#eadfce] bg-[#f5ecdd] p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl">
              📚
            </div>
            <div>
              <h2 className="text-2xl font-bold">{books.length}</h2>
              <p className="text-sm text-[#927e6e]">Total Books</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-[#eadfce] bg-[#f5ecdd] p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl">
              📖
            </div>
            <div>
              <h2 className="text-2xl font-bold">{totalCopies}</h2>
              <p className="text-sm text-[#927e6e]">Total Copies</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-[#eadfce] bg-[#f5ecdd] p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl">
              🏷️
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {new Set(books.map((book) => book.category)).size}
              </h2>
              <p className="text-sm text-[#927e6e]">Categories</p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-[#eadfce] bg-[#fffdf8] shadow-sm">
          <div className="border-b border-[#eadfce] px-5 py-4">
            <h2 className="text-lg font-bold">Your Books</h2>
            <p className="text-sm text-[#927e6e]">
              Books added by your account
            </p>
          </div>

          {books.length === 0 ? (
            <div className="px-5 py-16 text-center">
              <div className="mb-3 text-5xl">📚</div>
              <h3 className="text-xl font-bold">No books yet!</h3>
              <p className="mt-2 text-sm text-[#927e6e]">
                You haven&apos;t added any books to your collection.
              </p>
              <a
                href="/add-book"
                className="mt-5 inline-block rounded-lg bg-[#b65e35] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#984a29]"
              >
                Add Your First Book
              </a>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full min-w-[650px] text-left">
                  <thead className="bg-[#f5ecdd] text-sm text-[#715b49]">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Book</th>
                      <th className="px-5 py-4 font-semibold">Category</th>
                      <th className="px-5 py-4 font-semibold">Total Copies</th>
                      <th className="px-6 py-4 font-semibold">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {books.map((book) => (
                      <tr
                        key={book._id}
                        className="border-t border-[#eee4d6] transition hover:bg-[#faf5eb]"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <Image
                              src={book.image}
                              alt={book.title}
                              width={60}
                              height={80}
                              className="h-16 w-12 rounded-md object-cover shadow-sm"
                            />

                            <div>
                              <h3 className="font-semibold text-[#35251c]">
                                {book.title}
                              </h3>
                              <p className="mt-1 text-sm text-[#927e6e]">
                                {book.author}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <span className="rounded-full bg-[#eee5d7] px-3 py-1 text-xs font-medium text-[#715b49]">
                            {book.category}
                          </span>
                        </td>

                        <td className="px-5 py-4 font-semibold text-[#35251c]">
                          {book.totalCopies}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <EditBook book={book} onUpdate={handleUpdate} />
                            <DeleteBookPage
                              book={book}
                              onDelete={handleDelete}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Book Cards */}
              <div className="grid grid-cols-1 gap-4 md:hidden">
                {books.map((book) => (
                  <div
                    key={book._id}
                    className="rounded-xl border border-[#eee4d6] bg-white p-4 shadow-sm"
                  >
                    {/* Book Information */}
                    <div className="flex items-start gap-3">
                      <Image
                        src={book.image}
                        alt={book.title}
                        width={70}
                        height={95}
                        className="h-24 w-[70px] shrink-0 rounded-lg object-cover shadow-sm"
                      />

                      <div className="min-w-0 flex-1">
                        <h3 className="break-words text-base font-bold text-[#35251c]">
                          {book.title}
                        </h3>

                        <p className="mt-1 text-sm text-[#927e6e]">
                          {book.author}
                        </p>

                        <span className="mt-3 inline-block max-w-full break-words rounded-full bg-[#eee5d7] px-3 py-1 text-xs font-medium text-[#715b49]">
                          {book.category}
                        </span>
                      </div>
                    </div>

                    {/* Total Copies */}
                    <div className="mt-4 flex items-center justify-between rounded-lg bg-[#faf5eb] px-4 py-3">
                      <span className="text-sm font-medium text-[#715b49]">
                        Total Copies
                      </span>

                      <span className="text-lg font-bold text-[#35251c]">
                        {book.totalCopies}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="min-w-0 [&_button]:w-full [&_button]:justify-center">
                        <EditBook book={book} onUpdate={handleUpdate} />
                      </div>

                      <div className="min-w-0 [&_button]:w-full [&_button]:justify-center">
                        <DeleteBookPage book={book} onDelete={handleDelete} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default MyBooksPage;
