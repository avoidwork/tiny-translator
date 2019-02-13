const fetch = require("node-fetch");

module.exports = async obj => {
	if (obj.token.length === 0) {
		const res = await fetch("https://api.cognitive.microsoft.com/sts/v1.0/issueToken", {
			method: "POST",
			headers: {
				"Ocp-Apim-Subscription-Key": obj.key
			}
		});

		if (res.ok) {
			obj.token = await res.text();
		} else {
			throw new Error(res.statusText);
		}
	}
};
