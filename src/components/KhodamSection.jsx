import { useState, useRef, useEffect } from "react";

export const KhodamSection = () => {
	const images = [
		"/khodam-img/1.webp",
		"/khodam-img/2.webp",
		"/khodam-img/3.webp",
		"/khodam-img/4.webp",
		"/khodam-img/5.webp",
		"/khodam-img/6.webp",
		"/khodam-img/7.webp",
		"/khodam-img/8.webp",
		"/khodam-img/9.webp",
		"/khodam-img/10.webp",
		"/khodam-img/11.webp",
	];

	const [isSpinning, setIsSpinning] = useState(false);
	const [position, setPosition] = useState(0);
	const [selectedKhodam, setSelectedKhodam] = useState(null);
	const speedRef = useRef(0);
	const animRef = useRef(null);
	const finalPositionRef = useRef(0);

	const itemWidth = 150;
	const containerWidth = 450;
	const centerPosition = containerWidth / 2; // 225px dari kiri

	const animate = () => {
		setPosition((prev) => {
			let newPos = prev - speedRef.current;
			// Reset posisi ketika sudah melewati satu set gambar
			if (newPos <= -(images.length * itemWidth)) {
				newPos = newPos + images.length * itemWidth;
			}
			finalPositionRef.current = newPos;
			return newPos;
		});
		animRef.current = requestAnimationFrame(animate);
	};

	const spinKhodam = () => {
		if (isSpinning) return;
		setSelectedKhodam(null);
		setIsSpinning(true);
		speedRef.current = 20;

		animRef.current = requestAnimationFrame(animate);

		let slowdown = setInterval(() => {
			speedRef.current *= 0.95;
			if (speedRef.current < 0.5) {
				clearInterval(slowdown);
				cancelAnimationFrame(animRef.current);
				setIsSpinning(false);

				// Perhitungan yang lebih akurat
				const currentPosition = Math.abs(finalPositionRef.current);
				const normalizedPosition =
					currentPosition % (images.length * itemWidth);

				// Posisi tengah container adalah 225px
				// Kita perlu mencari gambar mana yang berada di posisi tengah
				const imageAtCenter =
					Math.floor((normalizedPosition + centerPosition) / itemWidth) %
					images.length;

				setSelectedKhodam(images[imageAtCenter]);
			}
		}, 100);
	};

	useEffect(() => {
		return () => {
			if (animRef.current) {
				cancelAnimationFrame(animRef.current);
			}
		};
	}, []);

	return (
		<div className="rounded-t-xl md:rounded-t-[5rem] lg:rounded-t-[10rem] fade-out-bg mb-28 pt-2">
			<div className="w-full h-auto md:h-[30rem]">
				<div className="text-center text-white font-bold mt-20">
					<h2 className="text-4xl">KHODAM</h2>
					<div className="flex justify-center gap-8 mt-3">
						<div className="w-3 h-3 bg-white rounded-full"></div>
						<div className="w-3 h-3 bg-white rounded-full"></div>
						<div className="w-3 h-3 bg-white rounded-full"></div>
					</div>
				</div>

				<div className="px-5 md:px-24 py-10 md:py-12 text-white text-center md:text-justify text-base md:text-lg font-medium">
					<div className="relative overflow-x-hidden w-[450px] mx-auto border-4 border-yellow-400 rounded-xl">
						<div
							className="flex"
							style={{
								transform: `translateX(${position}px)`,
								transition: isSpinning ? "none" : "transform 0.3s ease-out",
							}}>
							{[...images, ...images].map((img, idx) => (
								<div
									key={idx}
									className="w-[150px] h-[150px] flex-shrink-0 bg-center bg-cover"
									style={{ backgroundImage: `url(${img})` }}></div>
							))}
						</div>
						<div className="absolute top-0 bottom-0 left-1/2 w-[4px] bg-yellow-400 transform -translate-x-1/2"></div>
					</div>

					<div className="flex justify-center">
						<button
							onClick={spinKhodam}
							className="mt-6 px-6 py-2 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition duration-300 disabled:opacity-50"
							disabled={isSpinning}>
							{isSpinning ? "Spinning..." : "Check Khodam"}
						</button>
					</div>
				</div>

				{selectedKhodam && (
					<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
						<div className="bg-gradient-to-b from-yellow-200 to-yellow-400 p-6 rounded-2xl shadow-2xl text-center animate-pop">
							<img
								src={selectedKhodam}
								alt="Khodam"
								className="w-[220px] h-[220px] object-cover rounded-xl border-4 border-yellow-500 shadow-lg"
							/>
							<button
								onClick={() => setSelectedKhodam(null)}
								className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-bold">
								Close
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
