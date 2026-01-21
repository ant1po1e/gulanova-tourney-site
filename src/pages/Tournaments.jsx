import { Footer } from "../components/Footer";
import { TournamentSection } from "../components/TournamentListSection";
import { useEffect } from "react";

export const Tournaments = () => {
    useEffect(() => {
            document.title = "Gulanova | Tournaments";
        }, []);

    return (
        <main className="relative z-10 max-w-[1200px] mx-auto px-6 pt-10 pb-6 min-h-[calc(100vh-100px)]">
            <TournamentSection />
            <Footer />
        </main>
    );
};
