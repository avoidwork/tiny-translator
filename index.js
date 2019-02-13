const path = require("path"),
	Translator = require(path.join(__dirname, "lib", "translator.js"));

module.exports = (key = "", region = "westus") => {
	if (typeof key !== "string" || key.length === 0) {
		throw new TypeError("Invalid key");
	}

	if (typeof region !== "string" || region.length === 0) {
		throw new TypeError("Invalid region");
	}

	return new Translator(key, region);
};
