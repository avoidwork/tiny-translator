const {URL} = require("url"),
	path = require("path"),
	fetch = require("node-fetch"),
	chunk = require(path.join(__dirname, "chunk.js")),
	token = require(path.join(__dirname, "token.js"));

class Translator {
	constructor (key) {
		this.key = key;
		this.token = "";
	}

	async fetch (uri, arg) {
		let result;

		const res = await fetch(uri, {
			method: "POST",
			headers: {
				authorization: `Bearer ${this.token}`,
				"content-type": "application/json"
			},
			body: JSON.stringify(arg)
		});

		if (res.ok) {
			const data = await res.json();

			if (data instanceof Array && data.length > 0) {
				result = data.map(i => {
					const t = i.translations[0];

					delete i.translations;

					return Object.assign({}, i, t);
				});
			} else {
				result = [];
				result.fill({text: null}, arg.length);
			}
		} else {
			if (res.status >= 400 && res.status < 500) {
				this.reset();
			}

			throw new Error(res.statusText);
		}

		return result;
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
			text = arg.text,
			arr = text instanceof Array,
			queue = arr ? chunk(text, 100) : [[{Text: text}]];
		let result = [];

		delete arg.text;
		Object.keys(arg).forEach(i => url.searchParams.append(i, arg[i]));

		for (const q of queue) {
			const t = await this.fetch(url.href, typeof q[0] === "string" ? q.map(x => {
				return {
					Text: x
				};
			}) : q);

			result = [...result, ...t];
		}

		return arr ? result : result[0];
	}
}

module.exports = Translator;
