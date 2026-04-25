import { useState, useEffect } from "react";

import About from "../fragments/About";
import Mappools from "../fragments/Mappools";
import Matches from "../fragments/Matches";
import Bracket from "../fragments/Bracket";
import Staff from "../fragments/Staff";
import Players from "../fragments/Players";
import Podium from "../fragments/Podium";

const aboutFiles = import.meta.glob("../data/*/about.json");
const mappoolFiles = import.meta.glob("../data/*/mappools.json");
const staffFiles = import.meta.glob("../data/*/staff.json");
const playerFiles = import.meta.glob("../data/*/players.json");
const matchFiles = import.meta.glob("../data/*/matches.json");
const podiumFiles = import.meta.glob("../data/*/podium.json")

export const TournamentDetail = ({tournament, bracket}) => {
    const [data, setData] = useState({
        about: null,
        mappools: null,
        staff: null,
        players: null,
        matches: null,
    });

    useEffect(() => {
        const loadData = async () => {
            const about =
                await aboutFiles[`../data/${tournament}/about.json`]();
            const mappools =
                await mappoolFiles[`../data/${tournament}/mappools.json`]();
            const staff =
                await staffFiles[`../data/${tournament}/staff.json`]();
            const players =
                await playerFiles[`../data/${tournament}/players.json`]();
            const matches =
                await matchFiles[`../data/${tournament}/matches.json`]();
            const podium =
                await podiumFiles[`../data/${tournament}/podium.json`]();

            setData({
                about: about.default,
                mappools: mappools.default,
                staff: staff.default,
                players: players.default,
                matches: matches.default,
                podium: podium.default,
            });
        };

        loadData();
    }, [tournament]);

    const [activeTab, setActiveTab] = useState("about");

    const tabs = [
        { key: "about", label: "About" },
        { key: "staff", label: "Staff" },
        { key: "players", label: "Players" },
        { key: "mappools", label: "Mappools" },
        { key: "matches", label: "Matches" },
        { key: "bracket", label: "Bracket" },
        { key: "podium", label: "Podium" },
    ];

    const components = {
        about: <About data={data.about} />,
        staff: <Staff data={data.staff} />,
        players: <Players data={data.players} />,
        mappools: <Mappools data={data.mappools} />,
        matches: <Matches data={data.matches} />,
        bracket: <Bracket link={bracket} />,
        podium: <Podium data={data.podium}/>,
    };

    return (
        <section className="w-full px-4 md:px-24 flex justify-center items-center">
            <div
                className="
                    w-full md:w-7/8 h-[65vh] min-h-[65vh]
                    bg-black/50 backdrop-blur-md
                    rounded-lg shadow-lg
                    border border-white/20
                    flex flex-col md:flex-row
                    overflow-hidden
                ">
                <div
                    className="
                        md:w-1/4
                        border-b md:border-b-0 md:border-r border-white/20
                        p-3 md:p-4
                        flex md:flex-col gap-2
                        overflow-x-auto md:overflow-visible
                    ">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`
                                relative
                                whitespace-nowrap text-left
                                px-4 py-2 rounded-md text-sm
                                transition-all duration-300
                                
                                ${
                                    activeTab === tab.key
                                        ? "text-white bg-white/10"
                                        : "text-gray-300 hover:text-white hover:bg-white/5"
                                }
                            `}>
                            {tab.label}

                            {activeTab === tab.key && (
                                <span className="absolute left-0 top-0 h-full w-1 bg-blue-400 rounded-l-md" />
                            )}
                        </button>
                    ))}
                </div>

                <div
                    className="
                        md:w-3/4
                        p-5 md:p-6
                        max-h-[65vh]
                    ">
                    <div className="animate-fadeIn">
                        {components[activeTab]}
                    </div>
                </div>
            </div>
        </section>
    );
};
