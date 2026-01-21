import { Link } from "react-router-dom";
import tournaments from "../data/tournaments.json";

const TournamentItem = ({ title, redirect, date, game, links }) => {
    return (
        <div className="py-4">
            {/* Mobile date */}
            <span className="md:hidden text-xs tracking-widest uppercase text-gray-400">
                {date} • {game}
            </span>

            {/* Title + Date */}
            <div className="flex items-baseline gap-3 flex-wrap">
                <Link
                    to={redirect}
                    className="
                    mt-1 text-lg md:text-2xl font-bold text-white
                    rounded-lg transition-all duration-300
                    md:hover:text-blue-400
                    md:hover:bg-white
                    md:hover:px-5
                    md:hover:shadow-md
                ">
                    {title}
                </Link>

                <span className="hidden md:block text-xs md:text-sm tracking-widest uppercase text-gray-300">
                    {date} • {game}
                </span>
            </div>

            {/* Links */}
            <div className="mt-3 flex flex-wrap gap-2">
                {links.map((link, idx) => (
                    <a
                        key={idx}
                        href={link.url}
                        rel="noopener noreferrer"
                        className="
                            text-xs md:text-sm
                            px-3 py-1
                            rounded-md
                            border border-blue-400/40
                            text-blue-300
                            hover:text-white
                            hover:bg-blue-600/40
                            hover:border-blue-400
                            transition-all duration-300
                        ">
                        {link.label}
                    </a>
                ))}
            </div>
        </div>
    );
};

export const TournamentSection = () => {
    return (
        <section className="w-full px-4 md:px-24 flex justify-center items-center">
            <div
                className="
                w-full md:w-7/8
                px-5 py-5
                bg-black/50 backdrop-blur-md
                rounded-lg shadow-lg
                border border-white/20
            ">
                {/* Header */}
                <div className="text-center">
                    <h1 className="font-bold text-white text-xl md:text-3xl">
                        Tournaments
                    </h1>
                    <p className="mt-2 text-sm md:text-base text-gray-300">
                        Official tournaments hosted by Gulanova
                    </p>
                </div>

                {/* List */}
                <div
                    className="
                    mt-6 px-2 md:px-4 py-2
                    border-t border-white/20
                    max-h-[50vh] overflow-y-auto
                    scrollbar-thin
                    scrollbar-thumb-gray-400
                    scrollbar-track-gray-200
                ">
                    <div className="divide-y divide-white/20">
                        {tournaments.map((item, idx) => (
                            <TournamentItem
                                key={idx}
                                title={item.title}
                                redirect={item.redirect}
                                date={item.date}
                                game={item.game}
                                links={item.links}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
