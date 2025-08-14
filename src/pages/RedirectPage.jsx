import { useParams } from "react-router-dom";
import { Redirect } from "../fragments/Redirect";

const redirectMap = {
	instagram: {
		url: "https://www.instagram.com/gulanova.gg/",
	},
	discord: {
		url: "https://discord.gg/4UPFW7A",
	},
	twitch: {
		url: "http://twitch.tv/gulanova",
	},
	youtube: {
		url: "https://www.youtube.com/@Gulanova",
	},
};

export const RedirectPage = () => {
	const { target } = useParams();
	const data = redirectMap[target];

	if (!data) {
		return (
			<h1 className="text-white text-center mt-10">Halaman tidak ditemukan</h1>
		);
	}

	return (
		<Redirect videoSrc="/vid/gulanovamenyapa.mp4" redirectUrl={data.url} />
	);
};
