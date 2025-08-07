export const NotFoundSection = () => {
	return (
		<section className="w-full px-4 md:px-24 flex justify-center items-center min-h-[70vh]">
			<div className="w-full md:w-1/2 px-5 py-5 bg-white/50 backdrop-blur-md rounded-lg shadow-lg">
				<div className="w-full px-4">
					<div className="mx-auto text-center space-y-3">
						<h1 className="font-bold text-black mb-6 text-2xl md:text-4xl">
							Oops! Page Not Found
						</h1>
						<p className="text-slate-800 text-sm md:text-base font-medium">
							We couldn't find the page you were looking for. It might have been
							moved, deleted, or you may have mistyped the URL.
						</p>
						<div className="pt-4">
							<a
								href="/"
								className="inline-block px-6 py-2 bg-black text-white font-semibold rounded-lg md:hover:bg-blue-400 md:hover:scale-110 transition duration-300">
								<i className="bi bi-arrow-left" /> Back to Home
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
