const Bracket = ({ link }) => {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center flex-wrap gap-2">
                <h2 className="text-xl md:text-2xl text-center font-bold text-white">
                    Bracket
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
                    <iframe
                        src={`https://challonge.com/${link}/module`}
                        width="100%"
                        height="500"
                        frameborder="0"
                        scrolling="auto"
                        allowtransparency="true"></iframe>
            </div>
        </div>
    );
};

export default Bracket;
