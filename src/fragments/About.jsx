const About = ({ data }) => {
    if (!data) {
        return <div className="text-white">Loading...</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl md:text-2xl text-center font-bold text-white">
                    {data.title}
                </h2>
                {data.description && (
                    <p className="mt-2 text-gray-300 text-center text-sm md:text-base">
                        {data.description}
                    </p>
                )}
            </div>

            {data.info && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {data.info.map((item, idx) => (
                        <div
                            key={idx}
                            className="
                                bg-white/5 border border-white/10
                                rounded-md px-4 py-3
                                flex flex-col
                            ">
                            <span className="text-xs text-gray-400 uppercase tracking-wide">
                                {item.label}
                            </span>
                            <span className="text-sm md:text-base text-white mt-1 font-medium">
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default About;
