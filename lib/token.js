const fetch = require("node-fetch");

module.exports = async key => {
	const res = await fetch("https://api.cognitive.microsoft.com/sts/v1.0/issueToken", {
		method: "POST",
		headers: {
			"Ocp-Apim-Subscription-Key": key
		}
	});

	if (res.ok === false) {
		throw new Error(res.statusText);
	}

	return await res.text();
};
