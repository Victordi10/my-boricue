'use client'
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Poppins, Dosis } from "next/font/google";
import Aside from "./aside";
import RootLayout from "./rootLayout";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const dosis = Dosis({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-dosis",
});



export default function AppLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${dosis.variable} ${poppins.variable} antialiased`}>
          <RootLayout>
            {children}
          </RootLayout>
      </body>
    </html>
  );
}
