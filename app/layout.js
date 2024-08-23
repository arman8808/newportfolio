import { Inter } from "next/font/google";
import "@styles/globals.css";
import NavBar from "@components/NavBar/NavBar";
import Footer from "@components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Arman Ali",
  description: "FrontEnd Develpoer | Full Stack Develpoer | Mern Stack",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
