import { Footer } from "../components/Footer";
import { KhodamSection } from "../components/KhodamSection";
import { useEffect } from "react";

export const Khodam = () => {
    useEffect(() => {
            document.title = "Gulanova | Khodam";
        }, []);
    return (
        <main className="relative z-10 max-w-[1200px] mx-auto px-6 pt-10 pb-6 min-h-[calc(100vh-100px)]">
            <KhodamSection />
            <Footer />
        </main>
    );
};
