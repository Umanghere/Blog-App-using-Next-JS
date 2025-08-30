import { blog_data } from "@/assets/assets";
import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import axios from "axios";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true)

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("api/blog");
      setBlogs(response.data.blogs);
    } 
    catch (error) {
      console.error("Error: ", error)
    }
    finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) {
        return (
          <div className="flex justify-center items-center h-[60vh]">
            <h1 className="text-2xl font-bold">Loading Blogs...</h1>
          </div>
        );
     }

  return (
    <>
      <div className="mx-16 sm:px-8 md:px-16">
        <div className="flex justify-center gap-3 sm:gap-6 lg:gap-10 my-6 sm:my-10">
          <button
            onClick={() => setMenu("All")}
            className={
              menu === "All"
                ? "bg-black cursor-pointer text-white py-1 px-3 sm:px-4 rounded-sm"
                : "cursor-pointer py-1 px-3 sm:px-4"
            }
          >
            All
          </button>
          <button
            onClick={() => setMenu("Technology")}
            className={
              menu === "Technology"
                ? "bg-black cursor-pointer text-white py-1 px-3 sm:px-4 rounded-sm"
                : "cursor-pointer py-1 px-3 sm:px-4"
            }
          >
            Technology
          </button>
          <button
            onClick={() => setMenu("Startup")}
            className={
              menu === "Startup"
                ? "bg-black cursor-pointer text-white py-1 px-3 sm:px-4 rounded-sm"
                : "cursor-pointer py-1 px-3 sm:px-4"
            }
          >
            Startup
          </button>
          <button
            onClick={() => setMenu("Lifestyle")}
            className={
              menu === "Lifestyle"
                ? "bg-black cursor-pointer text-white py-1 px-3 sm:px-4 rounded-sm"
                : "cursor-pointer py-1 px-3 sm:px-4"
            }
          >
            Lifestyle
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 mb-16 mx-auto max-w-6xl">
          {blogs
            .filter((item) => (menu === "All" ? true : item.category === menu))
            .map((item, index) => {
              return (
                <BlogItem
                  key={index}
                  image={item.image}
                  description={item.description}
                  title={item.title}
                  category={item.category}
                  id={item._id}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default BlogList;
