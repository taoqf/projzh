import * as gcj02 from './gcj-02';
import forEachPoint from '../util';

const PI = Math.PI;
const X_PI = PI * 3000 / 180;

export const toGCJ02 = forEachPoint((input, output, offset) => {
	const x = input[offset] - 0.0065;
	const y = input[offset + 1] - 0.006;
	const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
	const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
	output[offset] = z * Math.cos(theta);
	output[offset + 1] = z * Math.sin(theta);
	return output;
});

export const fromGCJ02 = forEachPoint((input, output, offset) => {
	const x = input[offset];
	const y = input[offset + 1];
	const z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
	const theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
	output[offset] = z * Math.cos(theta) + 0.0065;
	output[offset + 1] = z * Math.sin(theta) + 0.006;
	return output;
});

export const toWGS84 = function (input: number[], opt_output?: number[], opt_dimension?: number) {
	const output = toGCJ02(input, opt_output, opt_dimension);
	return gcj02.toWGS84(output, output, opt_dimension);
};

export const fromWGS84 = function (input: number[], opt_output?: number[], opt_dimension?: number) {
	const output = gcj02.fromWGS84(input, opt_output, opt_dimension);
	return fromGCJ02(output, output, opt_dimension);
};
