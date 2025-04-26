import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogItem = ({ title, description, category, image, id }) => {
  return (
    <div className="w-full bg-white border border-black transition-all duration-300 hover:shadow-[-5px_5px_0px_#000000] sm:hover:shadow-[-7px_7px_0px_#000000]">
      <Link href={`/blogs/${id}`}>
        <div className="relative w-full h-48 sm:h-56">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover border-b border-black"
          />
        </div>
      </Link>
      <p className="ml-4 mt-4 px-1 inline-block bg-black text-white text-xs sm:text-sm">
        {category}
      </p>
      <div className="p-4">
        <h5 className="mb-2 text-base sm:text-lg font-medium tracking-tight text-gray-900 line-clamp-2">
          {title}
        </h5>
        <div
          className="mb-3 text-xs sm:text-sm tracking-tight text-gray-700 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: description.slice(0, 120) }}
        ></div>
        <Link
          href={`/blogs/${id}`}
          className="inline-flex items-center py-1 text-sm sm:text-base font-semibold text-center"
        >
          Read More{" "}
          <Image
            className="ml-2"
            src={assets.arrow}
            alt="arrow img"
            width={12}
            height={12}
          />
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;