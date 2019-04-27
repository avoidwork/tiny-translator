"use strict";

function chunk (arg = [], size = 100, char = 5000) {
	const result = [],
		nth = arg.length;
	let g = 0;

	while (g < nth) {
		const start = g;
		let chars = 0,
			n = size,
			end, r;

		do {
			end = start + n--;
			r = arg.slice(start, end);
			chars = JSON.stringify(r).length;
		} while (chars > char);

		result.push(r);
		g += r.length;
	}

	return result;
}

module.exports = chunk;
