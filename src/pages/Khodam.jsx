import { useEffect } from "react";
import { KhodamSection } from "../components/KhodamSection";

export const Khodam = () => {
	useEffect(() => {
		document.title = "Gulanova | Khodam";
	}, []);

	return (
		<div>
			<KhodamSection />
		</div>
	);
};
