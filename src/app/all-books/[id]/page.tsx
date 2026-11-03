import BookDetailsContent from "@/components/borrowbook-components/BorrowUpdate";
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

const BookDetailsPage = async ({params,}: {params: Promise<{ id: string }>;}) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:8000/books/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F5EF]">
        <h2 className="text-2xl font-bold text-[#422B1F]">Book not found!</h2>
      </div>
    );
  }

  const book: Book = await res.json();

  return (
    <section className="min-h-screen bg-[#F8F5EF] px-4 py-12 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Book Details Card */}
        <div className="grid grid-cols-1 items-center gap-8 rounded-2xl border border-[#EAE0D5] bg-white p-5 shadow-sm md:grid-cols-2 md:gap-10 md:p-8">
          {/* Book Image */}
          <div className="relative mx-auto h-[420px] w-full max-w-[350px] overflow-hidden rounded-xl bg-[#F3EDE4]">
            <Image
              src={book.image}
              alt={book.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 350px"
              className="object-cover"
            />
          </div>

          {/* Book Information */}
          <div className="flex flex-col">
            {/* Category */}
            <div>
              <span className="inline-block rounded-full bg-[#F5E6D5] px-4 py-1 text-xs font-semibold text-[#A66A4D]">
                {book.category}
              </span>
            </div>

            {/* Title and Author */}
            <h1 className="mt-3 font-serif text-3xl font-bold text-[#422B1F] sm:text-4xl">
              {book.title}
            </h1>

            <p className="mt-2 text-base text-[#806D60]">by {book.author}</p>

            {/* Description */}
            <div className="mt-6">
              <h2 className="mb-2 text-sm font-semibold text-[#422B1F]">
                About This Book
              </h2>

              <p className="text-sm leading-7 text-[#806D60]">
                {book.description}
              </p>
            </div>

            {/* Copies and Added By */}
            <div className="mt-6 grid grid-cols-1 gap-4 rounded-xl border border-[#EAE0D5] bg-[#FAF7F2] p-5 sm:grid-cols-2">
              {/* Available Copies */}
              <div>
                <p className="text-xs font-medium text-[#806D60]">
                  Available Copies
                </p>

                <p className="mt-2 text-2xl font-bold text-[#422B1F]">
                  {book.totalCopies}
                </p>
              </div>

              {/* Added By */}
              <div className="border-t border-[#EAE0D5] pt-4 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
                <p className="text-xs font-medium text-[#806D60]">Added By</p>

                <p className="mt-2 font-semibold text-[#422B1F]">
                  {book.userName}
                </p>

                <p className="mt-1 break-all text-xs text-[#806D60]">
                  {book.userEmail}
                </p>

                <p className="mt-2 text-xs text-[#A69A8E]">
                  {new Date(book.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Borrow Button */}
         <BookDetailsContent book={book} />

            <Link
              href="/all-books"
              className="mt-5 block w-full rounded-lg bg-[#FAF7F2] px-5 py-3.5 text-center text-sm font-semibold text-[#B97852] transition hover:bg-[#965638] hover:text-white"
            >
              Back to all books
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetailsPage;
