
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

interface Borrow {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  userName: string;
  userEmail: string;
  borrowDate: string;
  returnDate: string;
  status?: "borrowed" | "returned";
  returnedAt?: string;
}

const MyBorrowBooksPage = () => {
  const { data: session, isPending } = authClient.useSession();

  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [returningId, setReturningId] = useState<string | null>(null);
  const [error, setError] = useState("");

  // Fetch borrowed books
  useEffect(() => {
    const fetchBorrows = async () => {
      if (!session?.user?.email) return;

      try {

        const res = await fetch(`http://localhost:8000/borrows?email=${encodeURIComponent(session.user.email)}`,
          { cache: "no-store" }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch borrowed books");
        }

        const data: Borrow[] = await res.json();
        setBorrows(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load your borrowed books.");
      }
    };

    if (!isPending) {
      if (session?.user?.email) {
        fetchBorrows();
      }
    }
  }, [session?.user?.email, isPending]);

  // Statistics
  const currentlyBorrowed = borrows.filter(
    (book) => book.status !== "returned"
  );

  // Date formatting
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  // Return Book
  const handleReturnBook = async (id: string) => {
    try {
      setReturningId(id);

      const res = await fetch(
        `http://localhost:8000/borrows/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to return book");
        
      }
      setBorrows((prev) =>
  prev.filter((book) => book._id !== id)
);

alert("Book returned successfully!");
    } catch (err) {
      console.error(err);
      alert(
        err instanceof Error ? err.message : "Something went wrong!"
      );
    } finally {
      setReturningId(null);
    }
  };

  // Login check
  if (!session?.user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F5EF]">
        <p className="font-semibold text-[#422B1F]">
          Please login to see your borrowed books.
        </p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#F8F5EF] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">

        {/* Page Heading */}
        <div className="mb-7">
          <h1 className="font-serif text-3xl font-bold text-[#422B1F]">
            My Borrowed Books
          </h1>

          <p className="mt-2 text-sm text-[#806D60]">
            Keep track of the books you&apos;re currently reading.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="mb-7 grid grid-cols-1 gap-5 sm:grid-cols-2">

          {/* Currently Borrowed */}
          <div className="flex items-center gap-5 rounded-xl border border-[#EAE0D5] bg-[#F3EADF] p-5 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FAF5EC] text-3xl">
              📖
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#422B1F]">
                {currentlyBorrowed.length}
              </h2>

              <p className="text-sm text-[#806D60]">
                Currently Borrowed
              </p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-5 rounded-lg bg-red-100 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Borrowed Books Table */}
        <div className="overflow-hidden rounded-xl border border-[#EAE0D5] bg-white shadow-sm">

          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left">

              {/* Table Header */}
              <thead className="border-b border-[#EAE0D5] bg-[#FAF7F2]">
                <tr className="text-sm font-semibold text-[#422B1F]">
                  <th className="px-10 py-4">Book</th>
                  <th className="px-5 py-4">Borrow Date</th>
                  <th className="px-5 py-4">Return Date</th>
                  <th className="px-13 py-4">Action</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-[#EAE0D5]">

                {borrows.map((book) => (
                  <tr
                    key={book._id}
                    className="transition hover:bg-[#FAF7F2]"
                  >

                    {/* Book Image and Title */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-4">

                        <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-md bg-[#F3EDE4]">
                          <Image
                            src={book.bookImage}
                            alt={book.bookTitle}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>

                        <h3 className="font-semibold text-[#422B1F]">
                          {book.bookTitle}
                        </h3>

                      </div>
                    </td>

                    {/* Borrow Date */}
                    <td className="px-5 py-4 text-sm text-[#806D60]">
                      {formatDate(book.borrowDate)}
                    </td>

                    {/* Return Date */}
                    <td className="px-5 py-4 text-sm text-[#806D60]">
                      {formatDate(book.returnDate)}
                    </td>

                    {/* Action */}
                    <td className="px-5 py-4">

                      {book.status === "returned" ? (
                        <span className="inline-block rounded-lg bg-green-100 px-5 py-2 text-sm font-semibold text-green-700">
                          Returned
                        </span>
                      ) : (
                        <button
                          onClick={() => handleReturnBook(book._id)}
                          disabled={returningId !== null}
                          className="rounded-lg bg-[#B97852] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#965638] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {returningId === book._id
                            ? "Returning..."
                            : "Return Book"}
                        </button>
                      )}

                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {borrows.length === 0 && !error && (
            <div className="px-5 py-16 text-center">
              <div className="mb-3 text-5xl">📚</div>

              <h3 className="text-xl font-bold text-[#422B1F]">
                No Borrowed Books Yet!
              </h3>

              <p className="mt-2 text-sm text-[#806D60]">
                You haven&apos;t borrowed any books yet.
              </p>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default MyBorrowBooksPage;
