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

const Banner = () => {
  return (
    <section className="mx-auto max-w-7xl px-8 pt-5">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="book-slider h-[650px] overflow-hidden rounded-t-xl md:h-[520px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="h-full">
            <div className="grid h-full grid-cols-1 md:grid-cols-2">
              {/* Left image */}
              <div className="relative h-[300px] md:h-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={slide.id === 1}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Right content */}
              <div className="flex flex-col justify-center bg-[#422B1F] px-8 py-12 text-[#FFF8EC] sm:px-12 md:px-14">
                <p className="mb-4 text-xs font-semibold tracking-[2px] text-[#D9A77E]">
                  {slide.subtitle}
                </p>

                <h1 className="max-w-lg font-serif text-4xl font-bold leading-tight sm:text-5xl">
                  {slide.title}
                </h1>

                <p className="mt-5 max-w-md text-sm leading-7 text-[#E7D8C8]">
                  {slide.description}
                </p>

                <Link
                  href="/all-books"
                  className="mt-7 inline-flex w-fit shrink-0 items-center justify-center whitespace-nowrap rounded-md bg-[#C66A43] px-7 py-4 text-sm font-semibold text-white transition duration-300 hover:bg-[#A94F2E]"
                >
                  Browse Books
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Feature section */}
      <div className="grid grid-cols-2 gap-5 rounded-b-xl bg-[#F8F1E7] px-5 py-7 sm:grid-cols-4 ">
        {[
          "Curated Selection",
          "Independent Finds",
          "Modern Experience",
          "Reader Focused",
        ].map((feature) => (
          <div key={feature} className="flex items-center justify-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C9B59D] text-xl text-[#422B1F]">
              ✦
            </span>
            <span className="text-sm font-semibold text-[#422B1F]">
              {feature}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Banner;
