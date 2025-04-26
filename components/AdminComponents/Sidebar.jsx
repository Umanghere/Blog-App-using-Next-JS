"use client"

import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  // Close sidebar when pathname changes (user navigates to a new page)
  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [pathname]);
  
  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest('.sidebar-container') && !e.target.closest('.sidebar-toggle')) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Animation variants
  const sidebarVariants = {
    open: { 
      x: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    },
    closed: { 
      x: "-100%", 
      opacity: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    }
  };
  
  const menuItemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: (i) => ({ 
      y: 0, 
      opacity: 1,
      transition: { 
        delay: i * 0.1,
        duration: 0.4
      }
    }),
    exit: { y: 20, opacity: 0 }
  };

  const menuItems = [
    {
      href: "/admin/addProduct",
      icon: assets.add_icon,
      label: "Add Blogs",
      alt: "Add Icon"
    },
    {
      href: "/admin/blogList",
      icon: assets.blog_icon,
      label: "Blog List",
      alt: "Blog Icon"
    },
    {
      href: "/admin/subscriptions",
      icon: assets.email_icon,
      label: "Subscriptions",
      alt: "Email Icon"
    }
  ];

  return (
    <div className="flex flex-col bg-slate-200">
      <div className="px-2 sm:pl-14 py-3 border border-black flex justify-between items-center">
        <Link href="/">
          <Image src={assets.logo} width={120} alt="image" className="w-24 sm:w-32" />
        </Link>
        <button 
          className="sidebar-toggle sm:hidden mr-2 p-2 rounded-md hover:bg-slate-300 transition-colors duration-200" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>
      
      {/* Desktop sidebar (always visible) */}
      <div className="hidden sm:block w-60 md:w-80 h-[calc(100vh-56px)] relative py-12 border border-black overflow-auto">
        <div className="w-[80%] sm:absolute sm:right-0">
          {menuItems.map((item, index) => (
            <motion.div 
              key={item.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={index > 0 ? "mt-5" : ""}
            >
              <Link
                href={item.href}
                className={`flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000] transition-transform duration-200 hover:-translate-y-1 ${
                  pathname === item.href ? "bg-slate-100" : "bg-white"
                }`}
              >
                <Image src={item.icon} alt={item.alt} width={28} />
                <p className="text-sm sm:text-base">{item.label}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Mobile sidebar with animations */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="sidebar-container sm:hidden w-full h-[calc(100vh-56px)] border border-black overflow-auto bg-slate-200 fixed top-[56px] left-0 z-50"
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
          >
            <div className="py-8 px-4">
              {menuItems.map((item, index) => (
                <motion.div 
                  key={item.href}
                  custom={index}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={menuItemVariants}
                  className={index > 0 ? "mt-5" : ""}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000] transition-transform duration-200 active:translate-y-1 active:shadow-[-3px_3px_0px_#000000] ${
                      pathname === item.href ? "bg-slate-100" : "bg-white"
                    }`}
                  >
                    <Image src={item.icon} alt={item.alt} width={28} />
                    <p className="text-base">{item.label}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sidebar;