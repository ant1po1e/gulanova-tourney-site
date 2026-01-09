import { Sidebar } from "../components/Sidebar";
import { HeroSection } from "../components/HeroSection";
import { Footer } from "../components/Footer";
import { useEffect } from "react";

export const Home = () => {
    useEffect(() => {
        document.title = "Antipole | Home";
    }, []);

    return (
        <main className="relative z-10 max-w-[1200px] mx-auto px-6 pt-10 pb-6 min-h-[calc(100vh-100px)]">
            <Sidebar />
            <HeroSection />
            <Footer />
        </main>
    );
};
