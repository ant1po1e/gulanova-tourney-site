const PodiumCard = ({ user, position }) => {
    const styles = {
        1: "scale-110 z-10",
        2: "translate-y-4",
        3: "translate-y-4",
    };

    const medalStyles = {
        1: {
            ring: "ring-4 ring-yellow-400",
            glow: "from-yellow-300 via-yellow-500 to-yellow-700",
            badge: "bg-yellow-400 text-black",
        },
        2: {
            ring: "ring-4 ring-gray-300",
            glow: "from-gray-200 via-gray-400 to-gray-500",
            badge: "bg-gray-300 text-black",
        },
        3: {
            ring: "ring-4 ring-orange-400",
            glow: "from-orange-300 via-orange-500 to-orange-700",
            badge: "bg-orange-400 text-black",
        },
    };

    const medal = medalStyles[position];

    return (
        <a
            href={`https://osu.ppy.sh/users/${user.userId}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`
                flex flex-col items-center
                transition-all duration-300
                hover:scale-[115%]
                group
                ${styles[position]}
            `}>
            <div className="relative mb-3">
                <div
                    className={`
                        absolute inset-0 rounded-full blur-md opacity-70
                        bg-gradient-to-tr ${medal.glow}
                    `}
                />

                <img
                    src={`https://a.ppy.sh/${user.userId}`}
                    alt={user.username}
                    className={`
                        w-20 h-20 md:w-24 md:h-24
                        rounded-full object-cover border-2 border-white
                        relative ${medal.ring}
                    `}
                />
            </div>

            <div className="bg-[#153561] group-hover:bg-[#9BC4FF] transition duration-300 backdrop-blur-md px-3 py-2 rounded-lg text-center">
                <p
                    className="text-white group-hover:font-bold group-hover:text-[#153561] text-sm font-semibold truncate max-w-[100px]"
                    title={user.username}>
                    {user.username}
                </p>
            </div>

            <div
                className={`
                    mt-2 px-3 py-1 rounded-full text-xs font-bold
                    shadow-md ${medal.badge}
                `}>
                #{position}
            </div>
        </a>
    );
};

const Podium = ({ data }) => {
    if (!data) {
        return <div className="text-white">Loading...</div>;
    }

    return (
        <div className="space-y-4 h-full flex flex-col justify-center">
            <div className="flex justify-between items-center flex-wrap gap-2">
                <h2 className="text-xl md:text-2xl text-center font-bold text-white">
                    Podium
                </h2>
            </div>

            <div className="flex justify-center pt-10 md:pt-20 items-center gap-6">
                <PodiumCard user={data.second} position={2} />
                <PodiumCard user={data.first} position={1} />
                <PodiumCard user={data.third} position={3} />
            </div>
        </div>
    );
};

export default Podium;
