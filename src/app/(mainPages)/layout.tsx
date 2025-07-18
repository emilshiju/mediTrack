"use client";

import AppSidebar from "@/src/components/layout/sidebar/AppSideBar";
import Backdrop from "@/src/components/layout/sidebar/Backdrop";
import AppHeader from "@/src/components/layout/header/AppHeader";
import { Toaster } from "react-hot-toast";
import { useSidebar } from "@/src/context/sidebar-context";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <>
      <div className="min-h-screen xl:flex">
        {/* Sidebar and Backdrop */}
        <AppSidebar />
        <Backdrop />
        {/* Main Content Area */}
        <div
          className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
        >
          {/* Header */}
          <AppHeader />

          {/* Page Content */}

          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                zIndex: 9999, // Ensuring the toast appears above everything
                padding: "12px 20px", // Add custom padding inside the toaster
                marginTop: "80px", // Adjust the margin-top if your header is fixed
              },
            }}
          />

          <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
