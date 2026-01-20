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
        return () => {
            if (animRef.current) cancelAnimationFrame(animRef.current);
        };
    }, []);

    return (
        <section className="w-full flex justify-center">
            <div
                className="
                    w-full md:w-1/2
                    px-5 py-6
                    bg-black/50 backdrop-blur-md
                    rounded-lg shadow-lg
                    border border-white/20
                ">
                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="font-bold text-white text-2xl md:text-3xl">
                        Khodam Checker
                    </h1>
                    <p className="text-gray-300 text-sm md:text-base">
                        Spin the wheel and reveal your hidden guardian
                    </p>
                </div>

                {/* Divider */}
                <div className="mt-5 border-t border-white/20" />

                {/* Spinner */}
                <div className="mt-6 flex flex-col items-center gap-6">
                    <div className="relative overflow-hidden w-[450px] max-w-full border border-blue-400/40 rounded-xl">
                        <div
                            className="flex"
                            style={{
                                transform: `translateX(${position}px)`,
                                transition: isSpinning
                                    ? "none"
                                    : "transform 0.3s ease-out",
                            }}>
                            {[...images, ...images].map((img, idx) => (
                                <div
                                    key={idx}
                                    className="w-[150px] h-[150px] flex-shrink-0 bg-center bg-cover"
                                    style={{
                                        backgroundImage: `url(${img})`,
                                    }}
                                />
                            ))}
                        </div>

                        {/* Center indicator */}
                        <div className="absolute top-0 bottom-0 left-1/2 w-[3px] bg-blue-400 -translate-x-1/2" />
                    </div>

                    {/* Button */}
                    <button
                        onClick={spinKhodam}
                        disabled={isSpinning}
                        className="
                            px-8 py-2
                            bg-blue-800 text-white font-semibold
                            rounded-lg shadow-md
                            hover:bg-blue-800/70
                            hover:scale-105
                            transition duration-300
                            disabled:opacity-50
                        ">
                        {isSpinning ? "Spinning..." : "Check Khodam"}
                    </button>
                </div>

                {/* Result Modal */}
                {selectedKhodam && (
                    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center rounded-lg">
                        <div
                            className="
                            fade-out-bg backdrop-blur-md
                            border border-white/20
                            p-6 rounded-2xl
                            shadow-2xl
                            text-center
                            animate-pop
                        ">
                            <img
                                src={selectedKhodam}
                                alt="Khodam"
                                className="
                                    w-[220px] h-[220px]
                                    object-cover rounded-xl
                                    border border-blue-400/40
                                "
                            />
                            <button
                                onClick={() => setSelectedKhodam(null)}
                                className="
                                    mt-6 px-6 py-2
                                    bg-red-600 text-white
                                    rounded-lg
                                    hover:bg-red-700
                                    transition font-bold
                                ">
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
