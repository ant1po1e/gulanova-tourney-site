import { useEffect } from "react";
import { AboutSection } from "../components/AboutSection";

export const About = () => {
	useEffect(() => {
		document.title = "Gulanova | About";
	}, []);

	return (
		<div>
			<AboutSection />
		</div>
	);
};
