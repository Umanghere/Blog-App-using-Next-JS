import { assets } from "@/assets/assets";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="flex justify-around flex-col gap-4 sm:gap-0 sm:flex-row bg-black py-5 px-4 items-center">
      <Image 
        src={assets.logo_light} 
        alt="Logo light" 
        width={180}
        height={50}
        className="w-[130px] sm:w-auto"
      />
      <p className="text-white text-xs sm:text-sm text-center">
        All right reserved. Copyright @blogApp
      </p>
      <div className="flex space-x-1">
        <Image src={assets.facebook_icon} alt="facebook icon" width={32} height={32} className="w-8 sm:w-10" />
        <Image src={assets.twitter_icon} alt="twitter icon" width={32} height={32} className="w-8 sm:w-10" />
        <Image src={assets.googleplus_icon} alt="google plus icon" width={32} height={32} className="w-8 sm:w-10" />
      </div>
    </div>
  );
};

export default Footer;