import { getUserCache } from "../utils/userCache";

const UserCard = ({ user }) => {
    const loggedUser = getUserCache();

    const isCurrentUser =
        loggedUser && String(loggedUser.userId) === String(user.userId);

    return (
        <a
            href={`https://osu.ppy.sh/users/${user.userId}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`
                relative
                flex flex-col items-center
                p-2 rounded-2xl
                shadow-lg
                transition-all duration-300
                overflow-hidden
                group

                ${
                    isCurrentUser
                        ? `
                            bg-gradient-to-br
                            from-pink-500/40
                            via-purple-500/30
                            to-blue-500/40
                            border border-pink-300/60
                            shadow-pink-500/30
                        `
                        : `
                            bg-gradient-to-br
                            from-[#4a76b8]
                            to-[#2c4f8a]
                            border border-[#729dd8]/30
                        `
                }
            `}>
            {/* Background Glow */}
            <div
                className={`
                    absolute inset-0 transition duration-500
                    ${
                        isCurrentUser
                            ? "bg-white/10 opacity-100"
                            : "opacity-0 md:group-hover:opacity-100 bg-white/5"
                    }
                `}
            />

            {/* YOU Badge */}
            {isCurrentUser && (
                <div
                    className="
                        absolute top-2 right-2
                        px-2 py-1 rounded-full
                        text-[10px] font-black tracking-wider
                        bg-pink-400 text-black
                        shadow-lg z-20
                    ">
                    YOU
                </div>
            )}

            {/* Avatar */}
            <div className="relative mb-3 mt-2">
                {/* Glow */}
                <div
                    className={`
                        absolute inset-0 rounded-full blur-md -z-10
                        transition-all duration-300

                        ${
                            isCurrentUser
                                ? `
                                    bg-gradient-to-tr
                                    from-pink-400
                                    via-purple-400
                                    to-cyan-400
                                `
                                : `
                                    bg-gradient-to-tr
                                    from-[#9BC4FF]
                                    to-[#517fc1]
                                `
                        }

                        md:group-hover:scale-125
                        md:group-hover:blur-xl
                    `}
                />

                {/* Ring */}
                <div
                    className={`
                        p-[3px] rounded-full
                        transition-all duration-300

                        ${
                            isCurrentUser
                                ? `
                                    bg-gradient-to-tr
                                    from-pink-400
                                    via-purple-400
                                    to-cyan-400
                                `
                                : `
                                    bg-[#9BC4FF]
                                `
                        }

                        md:group-hover:scale-90
                    `}>
                    <img
                        className="
                            w-24 h-24 md:w-28 md:h-28
                            rounded-full object-cover
                            bg-black
                            transition-all duration-300
                            md:group-hover:scale-105
                        "
                        src={`https://a.ppy.sh/${user.userId}`}
                        alt={user.username}
                        loading="lazy"
                    />
                </div>
            </div>

            {/* Username */}
            <div
                className={`
                    backdrop-blur-sm
                    rounded-xl
                    px-3 py-2
                    w-full text-center
                    transition duration-300

                    ${
                        isCurrentUser
                            ? `
                                bg-black/40
                                border border-pink-300/20
                            `
                            : `
                                bg-[#153561]
                                md:group-hover:bg-[#9BC4FF]
                            `
                    }
                `}>
                <p
                    className={`
                        font-medium text-sm truncate
                        transition duration-300

                        ${
                            isCurrentUser
                                ? `
                                    text-pink-100
                                    font-bold
                                `
                                : `
                                    text-white
                                    md:group-hover:text-[#153561]
                                    md:group-hover:font-bold
                                `
                        }
                    `}>
                    {user.username}
                </p>
            </div>
        </a>
    );
};

export default UserCard;
