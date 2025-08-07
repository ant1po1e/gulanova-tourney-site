export const Footer = () => {
	return (
		<>
			<div className="text-center mb-8">
				<h2 className="text-white text-3xl md:text-4xl font-bold">GULANOVA</h2>
			</div>

			<div className="flex justify-center items-center mb-8">
				<div className="bg-black/50 text-white font-bold py-4 md:py-8 px-4 md:px-12 lg:px-20 rounded-md text-lg md:text-xl">
					<div className="flex flex-wrap justify-center gap-2 md:gap-4 lg:gap-8">
						<a
							href="/twitch/"
							class="flex items-center text-white hover:scale-110 hover:text-[#517fc1] hover:bg-white p-2 rounded-lg transition duration-300">
							<i className="bi bi-twitch text-2xl"></i>
							<span className="ml-2 hidden md:block">TWITCH</span>
						</a>
						<a
							href="/youtube/"
							class="flex items-center text-white hover:scale-110 hover:text-[#517fc1] hover:bg-white p-2 rounded-lg transition duration-300">
							<i className="bi bi-youtube text-2xl"></i>
							<span className="ml-2 hidden md:block">YOUTUBE</span>
						</a>
						<a
							href="/instagram/"
							class="flex items-center text-white hover:scale-110 hover:text-[#517fc1] hover:bg-white p-2 rounded-lg transition duration-300">
							<i className="bi bi-instagram text-2xl"></i>
							<span className="ml-2 hidden md:block">INSTAGRAM</span>
						</a>
						<a
							href="https://osu.ppy.sh/teams/653"
							class="flex items-center text-white hover:scale-110 hover:text-[#517fc1] hover:bg-white p-2 rounded-lg transition duration-300">
							<i className="bi bi-diagram-3 text-2xl"></i>
							<span className="ml-2 hidden md:block">OSU! TEAM</span>
						</a>
					</div>
				</div>
			</div>

			<footer className="text-white text-base md:text-lg text-center mb-8">
				<p>
					© Gulanova 2024, developed by{" "}
					<a href="https://github.com/ant1po1e" className="underline">
						Antipole
					</a>{" "}
					and{" "}
					<a href="https://github.com/ZuTuu" className="underline">
						danar
					</a>
					.
				</p>
			</footer>
		</>
	);
};
