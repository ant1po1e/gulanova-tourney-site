import { createPortal } from "react-dom";
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

	return createPortal(
		<div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#313338]">
			<video ref={videoRef} autoPlay muted className="max-w-full max-h-full">
				<source src={videoSrc} type="video/mp4" />
			</video>
		</div>,
		document.body
	);
};
