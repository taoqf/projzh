import forEachPoint from '../util';

const RADIUS = 6378137;
const MAX_LATITUDE = 85.0511287798;
const RAD_PER_DEG = Math.PI / 180;

export const forward = forEachPoint((input, output, offset) => {
	const lat = Math.max(Math.min(MAX_LATITUDE, input[offset + 1]), -MAX_LATITUDE);
	const sin = Math.sin(lat * RAD_PER_DEG);

	output[offset] = RADIUS * input[offset] * RAD_PER_DEG;
	output[offset + 1] = RADIUS * Math.log((1 + sin) / (1 - sin)) / 2;
});

export const inverse = forEachPoint((input, output, offset) => {
	output[offset] = input[offset] / RADIUS / RAD_PER_DEG;
	output[offset + 1] = (2 * Math.atan(Math.exp(input[offset + 1] / RADIUS)) - (Math.PI / 2)) / RAD_PER_DEG;
});
