import { useLocation } from "react-router-dom";
import { Redirect } from "../fragments/Redirect";

const redirectMap = {
	"/instagram": { url: "https://www.instagram.com/gulanova.gg/" },
	"/discord": { url: "https://discord.gg/4UPFW7A" },
	"/twitch": { url: "http://twitch.tv/gulanova" },
	"/youtube": { url: "https://www.youtube.com/@Gulanova" },
	"/tournaments/gulanocup-empat/bracket": {
		url: "https://docs.google.com/spreadsheets/d/1BSg5RLLt603AZZ0oWYxenJUuhoIGzTlJPkWl5Xd_rwE/edit?usp=sharing",
	},
	"/tournaments/gulanocup-empat/forum": {
		url: "https://osu.ppy.sh/community/forums/topics/1861503",
	},
	"/tournaments/gulanocup-empat/sheet": {
		url: "https://docs.google.com/spreadsheets/d/1qvtaZQdPL5ogGFI9AcDqYGXIjZkROWTU-RLKlDD_aBY/edit?gid=0#gid=0",
	},
	"/tournaments/gulanocup-lima/bracket": {
		url: "https://challonge.com/id/gulanocup5",
	},
	"/tournaments/gulanocup-lima/forum": {
		url: "https://osu.ppy.sh/community/forums/topics/2017653",
	},
	"/tournaments/gulanocup-lima/peraturan": {
		url: "https://docs.google.com/document/d/1dCHLV0qcDxMzglhj5l5uXlPlPEGskkP9/edit?usp=sharing&ouid=105646114480862530768&rtpof=true&sd=true",
	},
	"/tournaments/gulanocup-lima/registerplayer": {
		url: "https://docs.google.com/forms/d/e/1FAIpQLSc_enl06H-WXur235Y4Tl5EE13CB2E1cLOkUn-G_2-pasDltg/viewform",
	},
	"/tournaments/gulanocup-lima/registerstaff": {
		url: "https://discord.com/users/387180288033423363",
	},
	"/tournaments/gulanocup-lima/sheet": {
		url: "https://docs.google.com/spreadsheets/d/1BSg5RLLt603AZZ0oWYxenJUuhoIGzTlJPkWl5Xd_rwE/edit?usp=sharing",
	},
	"/tournaments/gulanocup-lima/wiki": {
		url: "https://osu.ppy.sh/wiki/en/Tournaments/GNV/5",
	},
};

export const RedirectPage = () => {
	const location = useLocation();
	const data = redirectMap[location.pathname];

	if (!data) {
		return (
			<h1 className="text-white text-center mt-10">Halaman tidak ditemukan</h1>
		);
	}

	return (
		<Redirect videoSrc="/vid/gulanovamenyapa.mp4" redirectUrl={data.url} />
	);
};
