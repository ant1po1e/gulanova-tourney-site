import { useEffect } from "react";
import { HeroSection } from "./../components/HeroSection";

export const Home = () => {
	useEffect(() => {
		document.title = "Gulanova | Home";
	}, []);

	return (
		<div>
			<HeroSection />
		</div>
	);
};
