"use client";
import { Inter } from "next/font/google";
import "@styles/globals.css";
import NavBar from "@components/NavBar/NavBar";
import Footer from "@components/Footer/Footer";
import { usePathname } from "@node_modules/next/navigation";

const inter = Inter({ subsets: ["latin"] });
// export const metadata = {
//   title: "Arman Ali",
//   description: "FrontEnd Develpoer | Full Stack Develpoer | Mern Stack",
// };
export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  return (
    <html lang="en">
      <body className={inter.className}>
        {!isAdminRoute && <NavBar />}

        {children}
        {!isAdminRoute && <Footer />}
      </body>
    </html>
  );
}
