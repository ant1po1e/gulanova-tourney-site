import { useState, useRef, useEffect } from "react";

export const KhodamSection = () => {
    const images = [
        "/khodam-img/1.png",
        "/khodam-img/2.png",
        "/khodam-img/3.png",
        "/khodam-img/4.png",
        "/khodam-img/5.png",
        "/khodam-img/6.png",
        "/khodam-img/7.png",
        "/khodam-img/8.png",
        "/khodam-img/9.png",
    ];

    const [isSpinning, setIsSpinning] = useState(false);
    const [position, setPosition] = useState(0);
    const [selectedKhodam, setSelectedKhodam] = useState(null);

    const speedRef = useRef(0);
    const animRef = useRef(null);
    const finalPositionRef = useRef(0);

    const itemWidth = 150;
    const containerWidth = 450;
    const centerPosition = containerWidth / 2;

    const animate = () => {
        setPosition((prev) => {
            let next = prev - speedRef.current;
            if (next <= -(images.length * itemWidth)) {
                next += images.length * itemWidth;
            }
            finalPositionRef.current = next;
            return next;
        });
        animRef.current = requestAnimationFrame(animate);
    };

    const spinKhodam = () => {
        if (isSpinning) return;

        setSelectedKhodam(null);
        setIsSpinning(true);
        speedRef.current = 20;

        animRef.current = requestAnimationFrame(animate);

        const slowdown = setInterval(() => {
            speedRef.current *= 0.95;
            if (speedRef.current < 0.5) {
                clearInterval(slowdown);
                cancelAnimationFrame(animRef.current);
                setIsSpinning(false);

                const current = Math.abs(finalPositionRef.current);
                const normalized = current % (images.length * itemWidth);
                const index =
                    Math.floor((normalized + centerPosition) / itemWidth) %
                    images.length;

                setSelectedKhodam(images[index]);
            }
        }, 100);
    };

    useEffect(() => {
        return () => animRef.current && cancelAnimationFrame(animRef.current);
    }, []);

    return (
        <section className="w-full px-4 md:px-24 flex justify-center items-center min-h-[70vh]">
            <div className="w-full md:w-1/2 px-6 py-8 bg-black/50 backdrop-blur-md rounded-lg shadow-lg text-center">
                {/* Title */}
                <h1 className="font-bold text-white text-2xl md:text-4xl mb-3">
                    Khodam Checker
                </h1>
                <p className="text-gray-300 text-sm md:text-base mb-8">
                    Spin the wheel and reveal your hidden guardian.
                </p>

                {/* SLOT + BUTTON */}
                <div className="flex flex-col items-center">
                    <div className="relative overflow-hidden w-[450px] max-w-full border border-white/20 rounded-lg">
                        <div
                            className="flex"
                            style={{
                                transform: `translateX(${position}px)`,
                                transition: isSpinning
                                    ? "none"
                                    : "transform 0.3s ease-out",
                            }}
                        >
                            {[...images, ...images].map((img, i) => (
                                <div
                                    key={i}
                                    className="w-[150px] h-[150px] flex-shrink-0 bg-center bg-cover"
                                    style={{ backgroundImage: `url(${img})` }}
                                />
                            ))}
                        </div>

                        {/* Center Indicator */}
                        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-blue-400 -translate-x-1/2" />
                    </div>

                    {/* Button */}
                    <button
                        onClick={spinKhodam}
                        disabled={isSpinning}
                        className="
      mt-6
      px-6 py-2
      bg-blue-800 text-white font-semibold
      rounded-lg shadow-md
      md:hover:bg-blue-800/60
      md:hover:scale-105
      transition duration-300
      disabled:opacity-50
    "
                    >
                        {isSpinning ? "Spinning..." : "Check Khodam"}
                    </button>
                </div>
            </div>

            {/* RESULT MODAL */}
            {selectedKhodam && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-black/80 backdrop-blur-md p-6 rounded-xl shadow-2xl text-center animate-pop">
                        <img
                            src={selectedKhodam}
                            alt="Khodam"
                            className="w-56 h-56 object-cover rounded-lg border border-white/20 shadow-lg"
                        />
                        <button
                            onClick={() => setSelectedKhodam(null)}
                            className="
                mt-6 px-6 py-2
                bg-blue-800 text-white font-semibold
                rounded-lg
                md:hover:bg-blue-800/60
                transition
              "
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};
