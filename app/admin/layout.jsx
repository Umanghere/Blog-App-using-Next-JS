import { assets } from "@/assets/assets";
import Sidebar from "@/components/AdminComponents/Sidebar";
import Image from "next/image";
import { ToastContainer } from "react-toastify";

export default function Layout({ children }) {
  return (
    <>
      <div className="flex h-screen">
        <ToastContainer theme="dark" />
          <Sidebar />
          <div className="flex flex-col w-full border-1">
            <div className="flex items-center justify-between bg-slate-200 w-full py-3 max-h-[60px] px-12 border-b-2 border-black">
              <h3 className="font-medium text-xl">Admin Panel</h3>
              <Image className="border-1 " src={assets.profile_icon} width={40} alt="" />
            </div>
            {children}
          </div>
      </div>
    </>
  );
}
