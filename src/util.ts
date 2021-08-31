export default function forEachPoint(func: (input: number[], output: number[], offset: number) => unknown) {
	return function (input: number[], opt_output?: number[], dimension = 2) {
		const len = input.length;
		let output: number[];
		if (opt_output) {
			output = opt_output;
		} else if (dimension !== 2) {
			output = input.slice();
		} else {
			output = new Array<number>(len);
		}
		for (let offset = 0; offset < len; offset += dimension) {
			func(input, output, offset);
		}
		return output;
	};
}
