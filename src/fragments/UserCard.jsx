const UserCard = ({ user }) => {
    return (
        <a
            href={`https://osu.ppy.sh/users/${user.userId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
                flex flex-col items-center
                bg-gradient-to-br from-[#4a76b8] to-[#2c4f8a]
                p-2 rounded-lg group
                shadow-lg transform
                transition duration-300
                border border-[#729dd8]/30
            ">
            <div className="relative mb-3">
                <div
                    className="
                    absolute inset-0
                    bg-gradient-to-tr from-[#9BC4FF] to-[#517fc1]
                    rounded-full blur-sm -z-10
                "
                />
                <img
                    className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-2 border-[#9BC4FF]"
                    src={`https://a.ppy.sh/${user.userId}`}
                    alt={user.username}
                    loading="lazy"
                />
            </div>

            <div
                className="
                bg-[#153561] group-hover:bg-[#9BC4FF] 
                transtion duration-300 backdrop-blur-sm
                rounded-lg px-3 py-2 w-full text-center
            ">
                <p className="text-white font-medium text-sm truncate group-hover:scale-110 group-hover:text-[#153561] group-hover:font-bold transition duration-300">
                    {user.username}
                </p>
            </div>
        </a>
    );
};

export default UserCard;
