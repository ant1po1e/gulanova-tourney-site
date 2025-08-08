import { twMerge } from "flowbite-react/helpers/tailwind-merge";

export const HeroSection = () => {
	return (
		<>
			<div
				id="main-content"
				className="rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-gray-900 to-blue-900 mb-8 mt-2">
				<div className="relative w-full overflow-hidden aspect-[16/9] lg:aspect-[21/9]">
					<img
						src="/bg-masthead.webp"
						alt="Guramee"
						className="w-full h-full object-cover lg:hidden"
					/>

					<video
						className="absolute top-0 left-0 w-full h-full object-cover hidden lg:flex"
						disablePictureInPicture
						controlsList="nodownload"
						autoPlay
						muted
						loop>
						<source src="/vid/vid.mp4" type="video/mp4" />
						Your browser does not support the video tag.
					</video>
				</div>
			</div>

			<div className="flex justify-center mb-52 md:mb-28">
				<a
					href="/discord/"
					className={twMerge(
						"z-0 relative flex h-[50px] w-40 items-center rounded-lg justify-center overflow-hidden bg-gradient-to-r",
						"from-[#729dd8] to-[#3166a7] text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0",
						"before:rounded-full before:bg-[#9BC4FF] before:duration-500 before:ease-out hover:shadow-[#9BC4FF]",
						"hover:before:h-56 hover:before:w-56"
					)}>
					<span className="relative">DISCORD</span>
				</a>
			</div>
		</>
	);
};
