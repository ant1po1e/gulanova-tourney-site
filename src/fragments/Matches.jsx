import { useState, useRef } from "react";

const parseDateTime = (date, time) => {
    const cleanTime = time.replace(".", ":").replace(" WIB", "");
    return new Date(`${date} ${cleanTime}`);
};

const Matches = ({ data }) => {
    const scrollRef = useRef(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const handleMouseDown = (e) => {
        isDragging.current = true;
        startX.current = e.pageX - scrollRef.current.offsetLeft;
        scrollLeft.current = scrollRef.current.scrollLeft;
    };

    const handleMouseLeave = () => {
        isDragging.current = false;
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    const handleMouseMove = (e) => {
        if (!isDragging.current) return;
        e.preventDefault();

        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX.current) * 1.5; 
        scrollRef.current.scrollLeft = scrollLeft.current - walk;
    };

    const stages = Object.keys(data);
    const [selectedStage, setSelectedStage] = useState(stages[0]);

    if (!data) {
        return <div className="text-white">Loading...</div>;
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center flex-wrap gap-2">
                <h2 className="text-xl md:text-2xl text-center font-bold text-white">
                    Matches
                </h2>

                <div className="relative">
                    <select
                        value={selectedStage}
                        onChange={(e) => setSelectedStage(e.target.value)}
                        className="
                                appearance-none
                                bg-black/40 border border-white/20
                                text-white text-sm
                                px-2 py-1 pr-8
                                rounded-md
                                focus:outline-none
                                w-full
                            ">
                        {stages.map((stage) => (
                            <option
                                className="bg-gray-800"
                                key={stage}
                                value={stage}>
                                {stage.toUpperCase()}
                            </option>
                        ))}
                    </select>

                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-300">
                        ▼
                    </div>
                </div>
            </div>

            <div
                className="
                    grid gap-1
                    max-h-[50vh] overflow-y-auto
                    scrollbar
                    scrollbar-thumb-blue-400
                    scrollbar-track-gray-600
                    pr-1
                ">
                <div
                    className="
                        max-h-[50vh] overflow-y-auto
                        scrollbar scrollbar-thumb-blue-400 scrollbar-track-gray-600
                        pr-1
                    ">
                    <div
                        ref={scrollRef}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                        className="
                            overflow-x-auto scrollbar scrollbar-thumb-blue-400
                            scrollbar-track-gray-600
                            cursor-grab active:cursor-grabbing
                        ">
                        <table className="min-w-full text-sm text-white border border-white/20 rounded-lg overflow-hidden">
                            {/* Header */}
                            <thead className="bg-white/10 text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="px-4 py-2 text-left">
                                        Date
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Time
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Player
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Referee
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Link
                                    </th>
                                </tr>
                            </thead>

                            {/* Body */}
                            <tbody>
                                {[...data[selectedStage]]
                                    .sort((a, b) => {
                                        return (
                                            parseDateTime(a.date, a.time) -
                                            parseDateTime(b.date, b.time)
                                        );
                                    })
                                    .map((match, idx) => (
                                        <tr
                                            key={idx}
                                            className="
                                                border-t border-white/10
                                                hover:bg-white/5
                                                transition
                                            ">
                                            <td className="px-4 py-2 whitespace-nowrap">
                                                {match.date}
                                            </td>

                                            <td className="px-4 py-2 whitespace-nowrap">
                                                {match.time}
                                            </td>

                                            <td className="px-4 py-2 whitespace-nowrap">
                                                <span className="font-semibold">
                                                    {match.player_one}
                                                </span>
                                                {" vs "}
                                                <span className="font-semibold">
                                                    {match.player_two}
                                                </span>
                                            </td>

                                            <td className="px-4 py-2 whitespace-nowrap">
                                                {match.referee}
                                            </td>

                                            <td className="px-4 py-2 whitespace-nowrap">
                                                {match.link ? (
                                                    <a
                                                        href={match.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="
                                                            text-blue-300 hover:text-blue-400
                                                            underline
                                                        ">
                                                        MP Link
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-400">
                                                        -
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Matches;
