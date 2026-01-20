import { Typewriter } from "react-simple-typewriter";

export const HeroSection = () => {
    return (
        <section
            className="w-full px-4 md:px-24"
            aria-label="Hero Section with introduction and social links"
        >
            {/* Title */}
            <div className="mx-auto text-center z-1 lg:hidden">
                <img src="/bg.webp" className="rounded-lg" alt="" />
            </div>

            {/* Typewriter */}
            {/* <div className="flex flex-wrap justify-center mx-auto mt-1 md:mt-3 text-xl md:text-3xl neon">
                <div className="font-mono font-bold" aria-label="Roles I do">
                    <Typewriter
                        words={[
                            "Game Developer",
                            "Desktop Developer",
                            "Photographer",
                            "Rhythm Gamer",
                        ]}
                        cursor
                        delaySpeed={2000}
                        loop
                    />
                </div>
            </div> */}

            {/* Mobile social links */}
            <div className="flex flex-wrap md:hidden justify-center gap-2 mt-4">
                {/* GitHub dengan teks di kiri dalam kotak */}
                <a
                    href="https://github.com/ant1po1e"
                    aria-label="GitHub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 h-10 rounded-lg bg-white flex flex-row items-center gap-2 shadow-md md:hover:bg-blue-400 focus:ring-2 focus:ring-blue-400 transition duration-300 group"
                >
                    <span className="text-sm font-medium text-black md:group-hover:text-white transition-colors duration-300">
                        GitHub
                    </span>
                    <i
                        className="bi bi-github text-lg md:group-hover:text-2xl md:group-hover:text-white transition-all duration-300"
                        aria-hidden="true"
                    />
                </a>

                {/* YouTube dengan teks di kanan dalam kotak */}
                <a
                    href="https://www.youtube.com/@ant1po1e"
                    aria-label="YouTube"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 h-10 rounded-lg bg-white flex flex-row-reverse items-center gap-2 shadow-md md:hover:bg-blue-400 focus:ring-2 focus:ring-blue-400 transition duration-300 group"
                >
                    <span className="text-sm font-medium text-black md:group-hover:text-white transition-colors duration-300">
                        YouTube
                    </span>
                    <i
                        className="bi bi-youtube text-lg md:group-hover:text-2xl md:group-hover:text-white transition-all duration-300"
                        aria-hidden="true"
                    />
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
                    loop
                >
                    <source src="/vid/vid.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </section>
    );
};
