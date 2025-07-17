





import "./globals.css";
import { Outfit } from "next/font/google";
import type { Metadata } from "next";
import "@/src/style/user.css"
import { SidebarProvider } from "@/src/context/sidebar-context";



const outfit = Outfit({
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "MEDI TRACK",
  description: "A web app to assign, track, and manage patient medication efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en">
      <body
        className={`${outfit.className}`}
      >
       
   
      <SidebarProvider >{children}</SidebarProvider>
     
  


      </body>
    </html>
  );
}
