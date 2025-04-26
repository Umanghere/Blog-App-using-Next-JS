import { assets } from "@/assets/assets";
import Sidebar from "@/components/AdminComponents/Sidebar";
import Image from "next/image";
import { ToastContainer } from "react-toastify";

export default function Layout({ children }) {
  return (
    <>
      <div className="flex flex-col sm:flex-row h-screen">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
          toastClassName="custom-toast-body" 
        />
        <Sidebar />
        <div className="flex flex-col w-full border-1 overflow-auto">
          <div className="flex items-center justify-between bg-slate-200 w-full py-3 h-14 sm:max-h-[60px] px-4 sm:px-8 md:px-12 border-b-2 border-black">
            <h3 className="font-medium text-lg sm:text-xl">Admin Panel</h3>
            <Image
              className="border-1 w-8 h-8 sm:w-10 sm:h-10"
              src={assets.profile_icon}
              width={40}
              height={40}
              alt="Profile"
            />
          </div>
          <div className="overflow-auto flex-grow">{children}</div>
        </div>
      </div>
    </>
  );
}
