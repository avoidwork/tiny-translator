const {URL} = require("url"),
	path = require("path"),
	fetch = require("node-fetch"),
	token = require(path.join(__dirname, "token.js"));

class Translator {
	constructor (key) {
		this.key = key;
		this.token = "";
	}

	async languages (scope = "translation,transliteration,dictionary") {
		const url = new URL("https://api.cognitive.microsofttranslator.com/languages?api-version=3.0");
		let result;

		url.searchParams.append("scope", scope);

		const res = await fetch(url.href);

		if (res.ok) {
			result = await res.json();
		}

		return result;
	}

	reset () {
		this.token = "";
	}

	async translate (arg) {
		if (this.token.length === 0) {
			this.token = await token(this.key);
		}

		const url = new URL("https://api.cognitive.microsofttranslator.com/translate?api-version=3.0"),
			text = arg.text;
		let result;

		delete arg.text;
		Object.keys(arg).forEach(i => url.searchParams.append(i, arg[i]));

		const res = await fetch(url.href, {
			method: "POST",
			headers: {
				authorization: `Bearer ${this.token}`,
				"content-type": "application/json"
			},
			body: JSON.stringify([{Text: text}])
		});

		if (res.ok) {
			const data = await res.json();

			if (data instanceof Array && data.length > 0) {
				const item = data[0],
					translation = item.translations[0];

				delete item.translations;

				result = Object.assign({}, item, translation);
			} else {
				result = {text: null};
			}
		} else {
			throw new Error(res.statusText);
		}

		return result;
	}
}

module.exports = Translator;
