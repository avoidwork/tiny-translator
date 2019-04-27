"use strict";

function chunk (arg = [], size = 2) {
	const result = [],
		nth = Math.ceil(arg.length / size);
	let i = -1;

	while (++i < nth) {
		const start = i * size,
			end = start + size;

		result.push(arg.slice(start, end));
	}

	return result;
}

module.exports = chunk;
