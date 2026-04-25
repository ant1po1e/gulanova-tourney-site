import { useState } from "react";
import MapCard from "./MapCard";

const Mappools = ({ data }) => {
    const stages = Object.keys(data);
    const [selectedStage, setSelectedStage] = useState(stages[0]);

    if (!data) {
        return <div className="text-white">Loading...</div>;
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center flex-wrap gap-2">
                <h2 className="text-xl md:text-2xl text-center font-bold text-white">
                    Mappools
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
                            <option className="bg-gray-800" key={stage} value={stage}>
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
                {data[selectedStage].map((map, idx) => (
                    <MapCard key={idx} map={map} />
                ))}
            </div>
        </div>
    );
};

export default Mappools;
