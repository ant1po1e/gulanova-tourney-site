import { Footer } from "../components/Footer";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { TournamentDetail } from "../components/TournamentDetail";
import tournaments from "../data/tournaments.json";

export const TournamentPage = () => {
    useEffect(() => {
        document.title = "Gulanova | Tournaments";
    }, []);

    const { tournamentId } = useParams();
    const tournamentData = tournaments.find((t) => t.id === tournamentId);

    if (!tournamentData) {
        return <div className="text-white">Tournament not found</div>;
    }

    return (
        <main className="relative z-10 max-w-[1200px] mx-auto px-6 pt-10 pb-6 min-h-[calc(100vh-100px)]">
            <TournamentDetail
                tournament={tournamentData.id}
                bracket={tournamentData.bracket}
            />
            <Footer />
        </main>
    );
};
