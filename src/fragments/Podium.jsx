const podiumConfig = {
    1: {
        height: "h-32 md:h-44",
        avatar: "w-24 h-24 md:w-32 md:h-32",
        glow: "from-yellow-300 via-yellow-500 to-yellow-700",
        border: "border-yellow-400",
        badge: "bg-yellow-400 text-black",
        text: "Champion",
    },
    2: {
        height: "h-24 md:h-36",
        avatar: "w-20 h-20 md:w-24 md:h-24",
        glow: "from-gray-200 via-gray-400 to-gray-500",
        border: "border-gray-300",
        badge: "bg-gray-300 text-black",
        text: "Runner-Up",
    },
    3: {
        height: "h-20 md:h-28",
        avatar: "w-18 h-18 md:w-22 md:h-22",
        glow: "from-orange-300 via-orange-500 to-orange-700",
        border: "border-orange-400",
        badge: "bg-orange-400 text-black",
        text: "3rd Place",
    },
};

const PodiumCard = ({ user, position }) => {
    const config = podiumConfig[position];

    return (
        <a
            href={`https://osu.ppy.sh/users/${user.userId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
                group relative
                flex flex-col items-center
                transition-all duration-300
                hover:-translate-y-2
            ">
            {/* Avatar */}
            <div className="relative z-10">
                {/* Glow */}
                <div
                    className={`
                        absolute inset-0 rounded-full blur-2xl opacity-70
                        bg-gradient-to-tr ${config.glow}
                        scale-110
                    `}
                />

                {/* Rank Badge */}
                <div
                    className={`
                        absolute -top-2 -right-2 z-20
                        w-8 h-8 rounded-full
                        flex items-center justify-center
                        font-black text-sm shadow-lg
                        ${config.badge}
                    `}>
                    #{position}
                </div>

                {/* Avatar */}
                <img
                    src={`https://a.ppy.sh/${user.userId}`}
                    alt={user.username}
                    className={`
                        ${config.avatar}
                        rounded-full object-cover
                        border-4 ${config.border}
                        relative
                        shadow-2xl
                        transition-all duration-300
                        group-hover:scale-105
                    `}
                />
            </div>

            {/* Podium Base */}
            <div
                className={`
                    relative mt-4
                    w-24 md:w-32
                    ${config.height}
                    rounded-t-2xl
                    border border-white/10
                    bg-gradient-to-b from-white/20 to-white/5
                    backdrop-blur-md
                    shadow-xl
                    flex flex-col justify-between items-center
                    overflow-hidden
                `}>
                {/* Shine */}
                <div
                    className="
                        absolute inset-0
                        bg-gradient-to-br from-white/20 via-transparent to-transparent
                        opacity-40
                    "
                />

                {/* Username */}
                <div className="mt-4 px-2 z-10 text-center">
                    <p
                        className="
                            text-white font-bold
                            text-xs md:text-sm
                            truncate max-w-[90px] md:max-w-[120px]
                        "
                        title={user.username}>
                        {user.username}
                    </p>

                    <p className="text-[10px] md:text-xs text-gray-300 mt-1 uppercase tracking-wider">
                        {config.text}
                    </p>
                </div>

                {/* Position Number */}
                <div
                    className="
                        text-4xl md:text-6xl
                        font-black
                        text-white/10
                        leading-none
                        select-none
                    ">
                    {position}
                </div>
            </div>
        </a>
    );
};

const Podium = ({ data }) => {
    if (!data) {
        return <div className="text-white text-center">Loading...</div>;
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-xl md:text-2xl font-bold text-white">
                    Podium
                </h2>
            </div>

            {/* Mobile Layout */}
            <div
                className="
                    flex md:hidden
                    flex-col items-center
                ">
                <PodiumCard user={data.first} position={1} />
                <div className="flex gap-4 items-end">
                    <PodiumCard user={data.second} position={2} />
                    <PodiumCard user={data.third} position={3} />
                </div>
            </div>

            {/* Desktop Layout */}
            <div
                className="
                    hidden md:flex
                    justify-center items-end
                    gap-8
                    pt-8
                ">
                <PodiumCard user={data.second} position={2} />
                <PodiumCard user={data.first} position={1} />
                <PodiumCard user={data.third} position={3} />
            </div>
        </div>
    );
};

export default Podium;
