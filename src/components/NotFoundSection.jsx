import { Link } from "react-router-dom";

export const NotFoundSection = () => {
    return (
        <section
            className="w-full px-4 md:px-24 flex justify-center items-center min-h-[70vh]"
            aria-labelledby="not-found-title"
        >
            <div className="w-full md:w-1/2 px-5 py-5 bg-white/50 backdrop-blur-md rounded-lg shadow-lg">
                <div className="w-full px-4">
                    <div className="mx-auto text-center space-y-3">
                        <h1
                            id="not-found-title"
                            className="font-bold text-black mb-6 text-2xl md:text-4xl"
                        >
                            Oops! Page Not Found
                        </h1>
                        <p className="text-slate-800 text-sm md:text-base font-medium">
                            We couldn't find the page you were looking for. It
                            might have been moved, deleted, or you may have
                            mistyped the URL.
                        </p>
                        <div className="pt-4">
                            <Link
                                to="/"
                                aria-label="Go back to homepage"
                                className="inline-block px-6 py-2 bg-black text-white font-semibold rounded-lg shadow-md md:hover:bg-blue-400 md:hover:scale-110 focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300"
                            >
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
