export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const scriptURL = process.env.CONTACT_FORM_SCRIPT;

	try {
		const buffers = [];
		for await (const chunk of req) {
			buffers.push(chunk);
		}
		const bodyBuffer = Buffer.concat(buffers);

		const response = await fetch(scriptURL, {
			method: "POST",
			body: bodyBuffer,
			headers: {
				"Content-Type": req.headers["content-type"],
			},
		});

		const text = await response.text();

		if (response.ok) {
			return res.status(200).json({ message: "Success", text });
		} else {
			console.error("Google Script Error:", text);
			return res.status(500).json({ message: "Google Script Error", text });
		}
	} catch (err) {
		console.error("Handler error:", err);
		return res.status(500).json({ error: "Internal Server Error" });
	}
}
