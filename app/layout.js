"use client";
import { Inter } from "next/font/google";
import ReactQueryProvider from "@providers/ReactQueryProvider";
import "@styles/globals.css";
import NavBar from "@components/NavBar/NavBar";
import Footer from "@components/Footer/Footer";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });
// export const metadata = {
//   title: "Arman Ali",
//   description: "FrontEnd Develpoer | Full Stack Develpoer | Mern Stack",
// };
export default function RootLayout({ children }) {
  // const queryClient = new QueryClient();

  // // Example server-side prefetch
  // await queryClient.prefetchQuery(["todos"], async () => {
  //   const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  //   return res.json();
  // });
  // const dehydratedState = dehydrate(queryClient);
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  return (
    <html lang="en">
      <body className={inter.className}>
        {!isAdminRoute && <NavBar />}

        <ReactQueryProvider>{children}</ReactQueryProvider>
        {!isAdminRoute && <Footer />}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
