
"use client";

import Link from "next/link";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    id: 1,
    subtitle: "WELCOME TO BOOKNOOK",
    title: "Curated Stories. Thoughtfully Selected.",
    description:
      "Discover a world of imagination, knowledge, and inspiration. Find your next favorite book with BookNook.",
    image: "/images/image-1.avif",
  },
  {
    id: 2,
    subtitle: "A WORLD OF KNOWLEDGE",
    title: "Every Book Opens a New World.",
    description:
      "Explore exciting stories, discover new ideas, and enjoy reading one page at a time.",
    image: "/images/image-5.avif",
  },
  {
    id: 3,
    subtitle: "YOUR NEXT CHAPTER STARTS HERE",
    title: "Find the Book You'll Love.",
    description:
      "From timeless classics to modern favorites, discover books selected for curious minds.",
    image: "/images/image-4.avif",
  },
];

const features = [
  "Curated Selection",
  "Independent Finds",
  "Modern Experience",
  "Reader Focused",
];

const Banner = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
        }}
        className="book-slider overflow-hidden rounded-t-xl"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="grid min-h-[680px] grid-cols-1 md:min-h-[520px] md:grid-cols-2">

              {/* Left Image */}
              <div className="relative h-[260px] sm:h-[320px] md:h-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={slide.id === 1}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Right Content */}
              <div className="flex min-h-[420px] flex-col items-start justify-center bg-[#422B1F] px-6 py-10 text-[#FFF8EC] sm:px-10 sm:py-12 md:min-h-0 md:px-10 lg:px-14">

                <p className="mb-4 text-xs font-semibold tracking-[2px] text-[#D9A77E]">
                  {slide.subtitle}
                </p>

                <h1 className="max-w-lg font-serif text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                  {slide.title}
                </h1>

                <p className="mt-5 max-w-md text-sm leading-7 text-[#E7D8C8] sm:text-base">
                  {slide.description}
                </p>

                <Link
                  href="/all-books"
                  className="mt-7 inline-flex min-h-12 w-fit shrink-0 items-center justify-center whitespace-nowrap rounded-md bg-[#C66A43] px-7 py-3.5 text-sm font-semibold text-white transition duration-300 hover:bg-[#A94F2E]"
                >
                  Browse Books
                </Link>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Feature Section */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-6 rounded-b-xl bg-[#F8F1E7] px-4 py-7 sm:grid-cols-2 sm:gap-5 sm:px-6 md:grid-cols-4">

        {features.map((feature) => (
          <div
            key={feature}
            className="flex items-center justify-center gap-2 sm:gap-3"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#C9B59D] text-lg text-[#422B1F] sm:h-10 sm:w-10 sm:text-xl">
              ✦
            </span>

            <span className="text-center text-xs font-semibold text-[#422B1F] sm:text-sm">
              {feature}
            </span>
          </div>
        ))}

      </div>
    </section>
  );
};

export default Banner;

