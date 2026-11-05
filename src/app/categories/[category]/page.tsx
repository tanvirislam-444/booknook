
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  totalCopies: number;
  image: string;
}

const BooksCategoryPage = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;


  const res = await fetch("http://localhost:8000/books", {
    cache: "no-store",
  });

  if (!res.ok) {
    toast.error("Failed to fetch books");
  }

  const books: Book[] = await res.json();

  
  const filteredBooks = books.filter(
    (book) =>
      book.category?.toLowerCase() === category.toLowerCase()
  );


  const categoryName =
    category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <section className="min-h-screen bg-[#F8F5EF] px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-[#422B1F]">
            {categoryName} Books
          </h1>

          <p className="mt-2 text-[#806D60]">
            Explore our {categoryName} book collection.
          </p>

          <p className="mt-2 text-sm font-medium text-[#B97852]">
            {filteredBooks.length} books found
          </p>
        </div>

   
        {filteredBooks.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-[#422B1F]">
              No books found!
            </h2>

            <p className="mt-2 text-[#806D60]">
              There are no books available in this category.
            </p>

            <Link
              href="/all-books"
              className="mt-5 inline-block rounded-lg bg-[#B97852] px-5 py-2 font-semibold text-white transition hover:bg-[#965638]"
            >
              View All Books
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredBooks.map((book) => (
              <div
                key={book._id}
                className="group overflow-hidden rounded-xl border border-[#EAE0D5] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
              >
           
                <div className="overflow-hidden">
                  <Image
                    src={book.image}
                    alt={book.title}
                    width={400}
                    height={300}
                    className="h-64 w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="p-5">
                  <h2 className="font-serif text-xl font-bold text-[#422B1F]">
                    {book.title}
                  </h2>

                  <p className="mt-1 text-sm text-[#806D60]">
                    By {book.author}
                  </p>

                  <p className="mt-3 text-sm font-medium text-[#B97852]">
                    {book.category}
                  </p>

                  <p className="mb-4 mt-2 text-sm text-[#806D60]">
                    Available Copies: {book.totalCopies}
                  </p>

                  <Link
                    href={`/all-books/${book._id}`}
                    className="inline-block w-full rounded-md bg-[#B97852] px-3 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[#965638]"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default BooksCategoryPage;

