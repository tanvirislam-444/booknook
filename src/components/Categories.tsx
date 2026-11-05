
import Link from "next/link";
import {
  Sparkles,
  Atom,
  Landmark,
  Smile,
  BookOpen,
} from "lucide-react";

const categories = [
  {
    name: "Fiction",
    description: "Novels and short stories",
    icon: Sparkles,
  },
  {
    name: "Science",
    description: "Discover how the world works",
    icon: Atom,
  },
  {
    name: "History",
    description: "Stories from the past",
    icon: Landmark,
  },
  {
    name: "Kids",
    description: "Picture books and more",
    icon: Smile,
  },
  {
    name: "Others",
    description: "Explore more collections",
    icon: BookOpen,
  },
];

const ExploreCategories = () => {
  return (
    <section className="bg-[#FAF5EC] rounded-xl px-5 py-8 sm:mx-8 my-10">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-7 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#422B1F] sm:text-3xl">
              Explore Categories
            </h2>
            <p className="mt-2 text-sm text-[#806D60]">
              Find your next favorite book by category.
            </p>
          </div>

          <Link
            href="/all-books"
            className="text-sm font-semibold text-[#B97852] transition hover:text-[#965638]"
          >
            Explore All →
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                href={`/categories/${category.name.toLowerCase()}`}
                className="group flex flex-col items-center justify-center rounded-xl border border-[#EAE0D5] bg-white px-4 py-7 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#B97852] hover:shadow-md"
              >
                {/* Icon */}
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#F5EEE7] transition duration-300 group-hover:bg-[#B97852]">
                  <Icon
                    size={24}
                    strokeWidth={1.7}
                    className="text-[#B97852] transition group-hover:text-white"
                  />
                </div>

                {/* Category Name */}
                <h3 className="font-serif text-lg font-bold text-[#422B1F]">
                  {category.name}
                </h3>

                {/* Description */}
                <p className="mt-1 text-xs text-[#806D60]">
                  {category.description}
                </p>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ExploreCategories;
