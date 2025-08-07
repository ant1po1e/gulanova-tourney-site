export default async function handler(req, res) {
	if (req.method !== "GET") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const scriptURL = process.env.BEATMAP_FEED_URL; 

	try {
		const response = await fetch(scriptURL);
		const data = await response.json();

		if (response.ok) {
			return res.status(200).json(data);
		} else {
			console.error("Google Script Error:", data);
			return res.status(500).json({ message: "Google Script Error", data });
		}
	} catch (err) {
		console.error("Handler error:", err);
		return res.status(500).json({ error: "Internal Server Error" });
	}
}
