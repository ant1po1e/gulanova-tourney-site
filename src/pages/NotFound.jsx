import { Footer } from "../components/Footer";
import { NotFoundSection } from "../components/NotFoundSection";

export const NotFound = () => {
    return (
        <main className="relative z-10 max-w-[1200px] mx-auto px-6 pt-10 pb-6 min-h-[calc(100vh-72px)]">
            <NotFoundSection />
            <Footer />
        </main>
    );
};
