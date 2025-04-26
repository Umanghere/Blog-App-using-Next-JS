'use client'
import BlogList from "@/components/BlogList";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        toastClassName="custom-toast-body" // 👈 only this needed
      />
      <Header />
      <main className="flex-grow">
        <BlogList />
      </main>
      <Footer />

    </>
  );
}
