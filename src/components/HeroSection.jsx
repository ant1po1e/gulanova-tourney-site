export const HeroSection = () => {
    return (
        <section
            className="w-full px-4 md:px-24"
            aria-label="Hero Section with introduction and social links">
            {/* Title */}
            <div className="mx-auto text-center z-1 lg:hidden">
                <img src="/bg.webp" className="rounded-lg" alt="" />
            </div>

            {/* Mobile social links */}
            <div className="md:hidden justify-center grid grid-cols-2 gap-2 mt-4">
                <a
                    href="https://www.gulanova.top/twitch"
                    aria-label="Twitch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 h-10 rounded-lg fade-out-bg flex flex-row justify-center items-center gap-2 shadow-md focus:ring-2 focus:ring-blue-400 transition duration-300">
                    <i
                        className="bi bi-twitch text-lg text-white"
                        aria-hidden="true"
                    />
                    <span className="text-sm font-medium text-white ">
                        Twitch
                    </span>
                </a>

                <a
                    href="https://www.gulanova.top/youtube"
                    aria-label="YouTube"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 h-10 rounded-lg fade-out-bg flex flex-row-reverse justify-center items-center gap-2 shadow-md  focus:ring-2 focus:ring-blue-400 transition duration-300">
                    <i
                        className="bi bi-youtube text-lg text-white"
                        aria-hidden="true"
                    />
                    <span className="text-sm font-medium text-white ">
                        YouTube
                    </span>
                </a>

                <a
                    href="https://www.gulanova.top/instagram"
                    aria-label="Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 h-10 rounded-lg fade-out-bg flex flex-row justify-center items-center gap-2 shadow-md  focus:ring-2 focus:ring-blue-400 transition duration-300">
                    <i
                        className="bi bi-instagram text-lg text-white"
                        aria-hidden="true"
                    />
                    <span className="text-sm font-medium text-white ">
                        Instagram
                    </span>
                </a>

                <a
                    href="https://www.gulanova.top/discord"
                    aria-label="Discord"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 h-10 rounded-lg fade-out-bg flex flex-row-reverse justify-center items-center gap-2 shadow-md  focus:ring-2 focus:ring-blue-400 transition duration-300">
                    <i
                        className="bi bi-discord text-lg text-white"
                        aria-hidden="true"
                    />
                    <span className="text-sm font-medium text-white ">
                        Discord
                    </span>
                </a>
            </div>

            {/* Background artwork */}
            <div className="relative w-full">
                <video
                    className="object-cover hidden rounded-3xl lg:flex"
                    disablePictureInPicture
                    controlsList="nodownload"
                    autoPlay
                    muted
                    loop>
                    <source src="/vid/vid.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </section>
    );
};
