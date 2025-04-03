"use client"
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LayoutClient({ children }) {
    const pathname = usePathname();
    const isDashboard = pathname.startsWith("/dashboard");

    return (
        <>
            {!isDashboard && <Header />}
            <main className="flex flex-col mb-8 w-full items-center ">
                {children}
            </main>
            {!isDashboard && <Footer />}
        </>
    );
}
