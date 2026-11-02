
import Image from "next/image";
import Link from "next/link";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
}

const NewArrivals = async () => {
  const res = await fetch("http://localhost:8000/books/latest-books", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch latest books");
  }

  const books: Book[] = await res.json();

  return (
    <section className="bg-[#FAF5EC] rounded-xl px-5 py-8 sm:mx-8 my-10">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-7">
          <h2 className="font-serif text-3xl font-bold text-[#422B1F]">
            New Arrivals
          </h2>

          <p className="mt-2 text-sm text-[#806D60]">
            Discover the newest additions to our library.
          </p>
        </div>

        {/* Books Grid */}
        {books.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {books.map((book) => (
              <div
                key={book._id}
                className="group flex flex-col overflow-hidden rounded-xl border border-[#EAE0D5] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Book Image */}
                <div className="relative h-64 w-full overflow-hidden bg-[#F3EDE4]">
                  <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Book Information */}
                <div className="flex flex-1 flex-col p-4">

                  <h3 className="line-clamp-1 font-serif text-lg font-bold text-[#422B1F]">
                    {book.title}
                  </h3>

                  <p className="mt-1 text-sm text-[#806D60]">
                    {book.author}
                  </p>

                  <div className="my-3">
                    <span className="inline-block rounded-full bg-[#F5EEE7] px-3 py-1 text-xs font-medium text-[#A66A4D]">
                      {book.category}
                    </span>
                  </div>

                  {/* View Details */}
                  <Link
                    href={`/all-books/${book._id}`}
                    className="mt-auto block rounded-lg bg-[#B97852] px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[#965638]"
                  >
                    View Details
                  </Link>

                </div>
              </div>
            ))}

          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-[#D8C7B6] bg-white py-16 text-center">
            <h3 className="font-serif text-xl font-bold text-[#422B1F]">
              No Books Available
            </h3>
            <p className="mt-2 text-sm text-[#806D60]">
              New books will appear here when added.
            </p>
          </div>
        )}

        {/* See All Books Button */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/all-books"
            className="rounded-lg bg-[#B97852] px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#965638]"
          >
            See All Books →
          </Link>
        </div>

      </div>
    </section>
  );
};

export default NewArrivals;
