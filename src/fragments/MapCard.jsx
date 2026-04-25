const MapCard = ({ map }) => {
    const modColor = {
        RC: "bg-[#bfe1f6] text-[#0a53a8]",
        LN: "bg-[#ffe5a0] text-[#943846]",
        HB: "bg-[#d4edbc] text-[#11734b]",
        SV: "bg-[#ffcfc9] text-[#b10202]",
        GM: "bg-[#e6cff2] text-[#633986]",
        TB: "bg-[#3d3d3d] text-white",
    };

    const getModKey = (mod) => {
        if (!mod) return "";
        return mod.match(/[A-Z]+/)?.[0] || mod;
    };

    const modKey = getModKey(map.mod);

    return (
        <a
            href={map.link}
            target="_blank"
            rel="noopener noreferrer"
            className="
                w-full p-2 group
                transition-all duration-300 ease-out
            ">
            <div
                className="
                rounded-xl overflow-hidden
                backdrop-blur-md border border-white/20
                shadow-lg hover:shadow-xl
            ">
                <div className="relative h-40 w-full">
                    <img
                        className="h-full w-full object-cover hover:scale-105"
                        src={map.cover}
                        alt={map.map}
                        loading="lazy"
                    />

                    <div
                        className="
                        absolute inset-0
                        bg-gradient-to-b from-black/60 via-black/40 to-[#3166a7]/80
                        backdrop-blur-sm
                        transition-all duration-300
                        group-hover:backdrop-blur-none
                    ">
                        <div className="flex items-center h-full p-4 gap-3">
                            <span
                                className={`
                                flex-shrink-0 px-3 py-2 text-sm font-bold
                                rounded-lg shadow-md
                                ${modColor[modKey] || "bg-blue-400 text-white"}
                            `}>
                                {map.mod}
                            </span>

                            <div className="text-white text-start flex-1">
                                <div className="flex items-center gap-2">
                                    <p
                                        className="text-base md:text-lg font-bold line-clamp-1"
                                        title={map.map}>
                                        {map.map}
                                    </p>

                                    {map.custom === "TRUE" && (
                                        <span
                                            className="
                                            inline-flex items-center
                                            rounded-md bg-yellow-200
                                            px-2 py-1 text-xs font-medium
                                            text-yellow-800
                                        ">
                                            Custom
                                        </span>
                                    )}
                                </div>

                                <p
                                    className="text-xs md:text-sm my-1 opacity-90 line-clamp-1"
                                    title={map.artist}>
                                    {map.artist}
                                </p>

                                <p
                                    className="text-xs md:text-sm text-[#9BC4FF] line-clamp-1"
                                    title={`Mapped by ${map.mapper}`}>
                                    Mapped by {map.mapper}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div
                        className="
                        absolute inset-x-0 bottom-0 h-1
                        bg-gradient-to-r from-[#517fc1] via-[#9BC4FF] to-[#517fc1]
                        group-hover:opacity-100 opacity-70
                        transition-opacity duration-300
                    "
                    />
                </div>
            </div>
        </a>
    );
};

export default MapCard;
