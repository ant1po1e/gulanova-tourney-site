import UserCard from "./UserCard";

const roleOrder = [
    "host",
    "organizer",
    "gfx",
    "sheeter",
    "mappooler",
    "mapper",
    "playtester",
    "referee",
    "streamer",
    "commentator",
    "programmer",
];

const groupByRole = (data) => {
    const grouped = {};

    if (!data) {
        return <div className="text-white">Loading...</div>;
    }

    data.forEach((user) => {
        const roles = user.role
            .toLowerCase()
            .split(/[,，\s]+/)
            .map((r) => r.trim())
            .filter(Boolean);

        roles.forEach((role) => {
            if (!grouped[role]) {
                grouped[role] = [];
            }
            grouped[role].push(user);
        });
    });

    return grouped;
};
    
const Staff = ({data}) => {
    const grouped = groupByRole(data);

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center flex-wrap gap-2">
                <h2 className="text-xl md:text-2xl text-center font-bold text-white">
                    Staff
                </h2>
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
                {Object.entries(grouped)
                    .sort(([a], [b]) => {
                        const indexA = roleOrder.indexOf(a);
                        const indexB = roleOrder.indexOf(b);

                        if (indexA === -1) return 1;
                        if (indexB === -1) return -1;

                        return indexA - indexB;
                    })
                    .map(([role, users]) => (
                        <div key={role} className="mb-10">
                            <h3 className="text-lg font-bold text-center text-white mb-3 capitalize">
                                {role}
                            </h3>

                            <div
                                className="
                                    grid grid-cols-2 md:grid-cols-4 gap-3
                                ">
                                {users.map((user, idx) => (
                                    <UserCard key={idx} user={user} />
                                ))}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Staff;
