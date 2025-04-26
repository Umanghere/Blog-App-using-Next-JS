"use client";

import { assets } from "@/assets/assets";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Footer from "@/components/Footer";
import Link from "next/link";
import axios from "axios";

const Page = () => {
  const params = useParams();
  const [data, setData] = useState(null);

  const fetchBlogData = async () => {
    const response = await axios.get("/api/blog", {
      params: {
        id: params.id,
      },
    });
    setData(response.data);
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  if (!data)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );

  return (
    <>
      <div className="bg-gray-200 py-4 sm:py-5 px-4 sm:px-8 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          {/* Go to home page */}
          <Link href="/">
            <Image
              src={assets.logo}
              width={180}
              height={50}
              alt="Logo"
              className="w-[100px] sm:w-[130px] md:w-[180px]"
            />
          </Link>

          <Link href="/admin">
            <button className="flex cursor-pointer items-center gap-1 sm:gap-2 text-sm sm:text-base font-medium py-1 px-2 sm:py-2 sm:px-4 md:py-3 md:px-6 border border-black shadow-[-4px_4px_0px_#000000] sm:shadow-[-7px_7px_0px_#000000]">
              Get Started{" "}
              <Image src={assets.arrow} width={12} height={12} alt="Arrow" />
            </button>
          </Link>
        </div>
        <div className="text-center my-10 sm:my-16 md:my-24">
          <h1 className="text-xl sm:text-3xl md:text-5xl font-semibold max-w-[700px] mx-auto px-2">
            {data.title}
          </h1>
          <div className="mt-6">
            <Image
              className="mx-auto border border-white rounded-full"
              src={data.authorImg}
              width={60}
              height={60}
              alt="Author's Image"
            />
          </div>
          <p className="mt-1 pb-2 text-base sm:text-lg">{data.author}</p>
        </div>
      </div>
      <div className="px-10 sm:px-8 max-w-[800px] md:mx-auto mt-[-60px] sm:mt-[-80px] md:mt-[-100px] mb-10">
        <div className="relative w-full h-48 sm:h-64 md:h-[450px] not-even:">
          <Image
            className="border-4 border-white object-cover"
            src={data.image}
            alt="Blog Image"
            fill
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>

        <div
          className="blogContent mt-6 sm:mt-8 text-sm sm:text-base break-words"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>

        <div className="my-12 sm:my-16 md:my-24">
          <p className="text-black font-semibold my-4">
            Share this article on Social media
          </p>
          <div className="flex space-x-2">
            <Image
              src={assets.facebook_icon}
              width={40}
              height={40}
              alt="Facebook"
              className="w-8 sm:w-10 h-8 sm:h-10"
            />
            <Image
              src={assets.twitter_icon}
              width={40}
              height={40}
              alt="Twitter"
              className="w-8 sm:w-10 h-8 sm:h-10"
            />
            <Image
              src={assets.googleplus_icon}
              width={40}
              height={40}
              alt="Google+"
              className="w-8 sm:w-10 h-8 sm:h-10"
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Page;
