import Image from "next/image";
import Link from "next/link";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  totalCopies: number;
  description: string;
  image: string;
  createdAt: string;
  userName: string;
  userEmail: string;
}

const AllBooksPage = async () => {
  const res = await fetch("http://localhost:8000/books", {
    cache: "no-store",
  });

  const data: Book[] = await res.json();

  return (
    <section className="min-h-screen bg-[#F8F5EF] px-4 py-12 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-10 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#422B1F] sm:text-4xl">
              Explore Our Library
            </h1>
            <p className="mt-2 text-sm text-[#806D60]">
              Find your next favorite story from our collection.
            </p>
          </div>

          <p className="text-sm font-medium text-[#A66A4D]">
            Home / All Books
          </p>
        </div>

        {/* Books Count */}
        <p className="mb-5 text-sm text-[#806D60]">
          Total Books:{" "}
          <span className="font-bold text-[#422B1F]">{data.length}</span>
        </p>

        {/* Books Grid */}
        {data.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((book) => (
              <div
                key={book._id}
                className="group flex gap-4 rounded-xl border border-[#EAE0D5] bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Image */}
                <div className="h-40 w-28 shrink-0 overflow-hidden rounded-md bg-[#F3EDE4] sm:h-44 sm:w-32">
                  <Image
                    src={book.image}
                    alt={book.title}
                     width={300}
                      height={450}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Book Information */}
                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div>
                    <h2 className="line-clamp-2 font-serif text-lg font-bold text-[#422B1F]">
                      {book.title}
                    </h2>

                    <p className="mt-1 text-sm text-[#806D60]">
                      {book.author}
                    </p>

                    <span className="mt-3 inline-block rounded-full bg-[#F5EEE7] px-3 py-1 text-xs font-medium text-[#A66A4D]">
                      {book.category}
                    </span>
                  </div>

                  {/* Details Button */}
                  <Link
                    href={`/all-books/${book._id}`}
                    className="mt-4 rounded-md bg-[#B97852] px-3 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[#965638]"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-[#D8C7B6] bg-white py-20 text-center">
            <h2 className="font-serif text-2xl font-bold text-[#422B1F]">
              No Books Available
            </h2>
            <p className="mt-2 text-sm text-[#806D60]">
              There are no books in the library yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllBooksPage;