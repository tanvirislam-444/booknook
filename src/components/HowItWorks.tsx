
import { BookOpen, BookMarked, Library } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Discover a book",
    description:
      "Browse our curated collection and find your next favorite book.",
    icon: BookOpen,
  },
  {
    id: 2,
    title: "Borrow your favorite",
    description:
      "Request a book and enjoy it for a few days.",
    icon: BookMarked,
  },
  {
    id: 3,
    title: "Return and explore",
    description:
      "Return the book and discover something new.",
    icon: Library,
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-[#FAF5EC] rounded-xl px-5 py-8 sm:mx-8 my-10">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <h2 className="mb-5 font-serif text-xl font-bold text-[#422B1F]">
          How BookNook Works
        </h2>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.id}
                className="flex items-start gap-4 rounded-xl border border-[#EDE2D3] bg-white px-4 py-4 shadow-[0_4px_15px_rgba(66,43,31,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                {/* Icon */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-[#F0DDC7] bg-[#C66A43] text-white">
                  <Icon size={18} strokeWidth={2} />
                </div>

                {/* Text */}
                <div>
                  <h3 className="mb-2 font-serif text-sm font-bold text-[#422B1F]">
                    {step.id}. {step.title}
                  </h3>

                  <p className="text-xs leading-relaxed text-[#75685D]">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
