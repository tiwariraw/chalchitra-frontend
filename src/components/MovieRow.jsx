"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function MovieRow({ title, movies }) {
  const rowRef = useRef(null);

  //   function to scroll left or right
  const scrollRow = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      rowRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative px-10 py-4">
      {/* Movie category title */}
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      {/* Left Scroll Button */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black"
        onClick={() => scrollRow("left")}
      >
        ◀
      </button>
      {/* Movie Row Horizontally Scrollable */}
      <div
        ref={rowRef}
        className="flex space-x-4 overflow-x-scroll scrollbar-hide"
      >
        {movies?.map((movie) => {
          return (
            <motion.div
              key={movie.id}
              className="relative w-48 flex flex-shrink-0 group cursor-pointer"
            >
              {/* Movie Poster */}
              <Image
                src={movie.poster_path}
                alt={movie.title}
                width={192}
                height={288}
                className="rounded priority"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-end p2">
                <p className="text-sm font-semibold text-white">
                  {movie.title}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
      {/* Right Scroll Button */}
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black"
        onClick={() => scrollRow("right")}
      >
        ▶
      </button>
    </section>
  );
}
