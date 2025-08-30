"use client";

import { assets } from "@/assets/assets";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [image, setImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "",
    authorImg: "/author_img.png",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandle = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("authorImg", data.authorImg);
    formData.append("image", image);

    try {
      const response = await axios.post("/api/blog", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success(response.data.msg);
        setImage(false);
        setData({
          title: "",
          author: "",
          description: "",
          category: "Startup",
          authorImg: "/author_img.png",
        });
      } else {
        toast.error("Failed to add blog.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        `Error: ${error.response?.data?.msg || "Something went wrong"}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={onSubmitHandle}
        className="pt-4 sm:pt-5 md:pt-8 lg:pt-12 px-4 sm:px-8 md:px-12 lg:px-16 w-full max-w-3xl mx-auto"
      >
        <p className="text-lg sm:text-xl font-medium">Upload Thumbnail</p>
        <label htmlFor="image" className="group block w-fit mt-3 sm:mt-4">
          <Image
            className="transition-transform duration-200 group-hover:scale-105 cursor-pointer"
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            width={140}
            height={70}
            alt="Upload Image"
          />
        </label>
        <input
          disabled={isLoading}
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          hidden
          required
        />

        <p className="text-lg sm:text-xl font-medium mt-4 sm:mt-6">
          Blog Title
        </p>
        <input
          disabled={isLoading}
          name="title"
          onChange={onChangeHandler}
          value={data.title}
          className="w-full mt-2 sm:mt-3 px-3 sm:px-4 py-2 sm:py-3 border focus:outline-none focus:ring-1 focus:ring-black"
          type="text"
          placeholder="Type here"
          required
        />

        <p className="text-lg sm:text-xl font-medium mt-4 sm:mt-6">
          Author Name
        </p>
        <input
          disabled={isLoading}
          name="author"
          onChange={onChangeHandler}
          value={data.author}
          className="w-full mt-2 sm:mt-3 px-3 sm:px-4 py-2 sm:py-3 border focus:outline-none focus:ring-1 focus:ring-black"
          type="text"
          placeholder="Enter Author's name"
          required
        />

        <p className="text-lg sm:text-xl font-medium mt-4 sm:mt-6">
          Blog Description
        </p>
        <textarea
          disabled={isLoading}
          name="description"
          onChange={onChangeHandler}
          value={data.description}
          className="w-full mt-2 sm:mt-3 px-3 sm:px-4 py-2 sm:py-3 border focus:outline-none focus:ring-1 focus:ring-black"
          type="textarea"
          rows={6}
          placeholder="Write content here"
          required
        />

        <p className="text-lg sm:text-xl font-medium mt-4 sm:mt-6">
          Blog Category
        </p>
        <select
          disabled={isLoading}
          name="category"
          onChange={onChangeHandler}
          value={data.category}
          className="w-full max-w-[160px] mt-2 sm:mt-3 px-3 sm:px-4 py-2 sm:py-3 border text-gray-500 focus:outline-none focus:ring-1 focus:ring-black"
        >
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <br />
        <button
          disabled={isLoading}
          type="submit"
          className={`mt-6 sm:mt-8 w-full max-w-[160px] h-10 sm:h-12 text-white transition-colors 
            ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black hover:bg-gray-800"
          }`}
        >
            {isLoading ? "Loading..." : "Add"}
        </button>
      </form>
    </>
  );
};

export default Page;
