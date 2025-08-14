import { useEffect, useRef } from "react";

export const Redirect = ({ videoSrc, redirectUrl }) => {
	const videoRef = useRef(null);

	useEffect(() => {
		const handleEnded = () => {
			window.location.replace(redirectUrl);
		};

		const videoEl = videoRef.current;
		if (videoEl) {
			videoEl.addEventListener("ended", handleEnded);
		}

		return () => {
			if (videoEl) {
				videoEl.removeEventListener("ended", handleEnded);
			}
		};
	}, [redirectUrl]);

	return (
		<>
			<div className="bg-[#313338] fixed inset-0 flex items-center justify-center">
				<video ref={videoRef} autoPlay muted className="max-w-full max-h-full">
					<source src={videoSrc} type="video/mp4" />
				</video>
			</div>
		</>
	);
};
