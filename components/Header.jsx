import { assets } from "@/assets/assets";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Header = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("email", email);
    const response = await axios.post("/api/email", formData);
    try{
      if (response.data.success) {
        toast.success(response.data.msg, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                className: 'custom-toast',
                bodyClassName: 'custom-toast-body',
                style: {
                  // Customize width here
                  width: '300px',
                  minHeight: '60px'
                }
              });;
        setEmail("");
      } else {
        toast.error("Error");
      }
    }
    catch(error){
      console.error("Error Subscribing email: ", error)
      toast.error(
              `Error: ${error.response?.data?.msg || "Something went wrong"}`
            ); 
    }
    finally{
      setIsLoading(false)
    }
  };

  return (
    <div className="py-4 px-6 sm:py-5 sm:px-8 md:px-12 lg:px-28">
      
      <div className="flex justify-between items-center">
        <Link href="/">
          <Image
            src={assets.logo}
            alt="logo"
            width={180}
            height={60}
            className="w-[100px] pb-8 sm:w-[130px] md:w-[180px]"
          />
        </Link>
        <Link href="/admin">
          <button className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base font-medium py-1 px-2 sm:py-2 sm:px-4 md:py-3 md:px-6 border border-solid border-black shadow-[-4px_4px_0px_] sm:shadow-[-7px_7px_0px_] hover:cursor-pointer">
            Get Started 
            <Image src={assets.arrow} alt="get started" width={12} height={12} />
          </button>
        </Link>
      </div>

      <div className="text-center my-4 sm:my-8">
        <h1 className="mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium">Latest Blogs</h1>
        <p className="mt-4 text-center sm:mt-6 md:mt-10 max-w-[740px] mx-auto text-sm sm:text-base px-2">
          Discover stories that inform, inspire, and spark new ideas. From tech trends to lifestyle insights, explore blogs that keep you curious and engaged.
        </p>

        <form
          onSubmit={onSubmitHandler}
          className="flex justify-between w-full max-w-[500px] mx-auto mt-6 sm:mt-10 border border-black shadow-[-4px_4px_0px_#000000] sm:shadow-[-7px_7px_0px_#000000] px-1 sm:px-0"
        >
          <input
            disabled={isLoading}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            required
            placeholder="Enter your Email"
            className="pl-2 sm:pl-4 outline-none text-sm sm:text-base w-full py-2 sm:py-3"
          />
          <button
            disabled={isLoading}
            type="submit"
            className={`border-l border-black py-2 sm:py-4 px-2 sm:px-4 md:px-8 whitespace-nowrap text-sm sm:text-base transition-colors ${
              isLoading 
                ? "bg-gray-200 cursor-not-allowed" 
                : "active:bg-gray-200 active:text-white"
            }`}
          >
            {isLoading ? "Loading..." : "Subscribe"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;