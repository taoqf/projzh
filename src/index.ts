import * as baiduMercator from './projection/baidu-mercator';
import * as sphericalMercator from './projection/spherical-mercator';
import * as bd09 from './datum/bd-09';
import * as gcj02 from './datum/gcj-02';

export function smerc2bmerc(input: number[], opt_output?: number[], opt_dimension?: number) {
	let output = sphericalMercator.inverse(input, opt_output, opt_dimension);
	output = bd09.fromWGS84(output, output, opt_dimension);
	return baiduMercator.forward(output, output, opt_dimension);
}

export function bmerc2smerc(input: number[], opt_output?: number[], opt_dimension?: number) {
	let output = baiduMercator.inverse(input, opt_output, opt_dimension);
	output = bd09.toWGS84(output, output, opt_dimension);
	return sphericalMercator.forward(output, output, opt_dimension);
}

export function bmerc2ll(input: number[], opt_output?: number[], opt_dimension?: number) {
	const output = baiduMercator.inverse(input, opt_output, opt_dimension);
	return bd09.toWGS84(output, output, opt_dimension);
}

export function ll2bmerc(input: number[], opt_output?: number[], opt_dimension?: number) {
	const output = bd09.fromWGS84(input, opt_output, opt_dimension);
	return baiduMercator.forward(output, output, opt_dimension);
}

export const ll2smerc = sphericalMercator.forward;
export const smerc2ll = sphericalMercator.inverse;
export const projection = {
	baiduMercator,
	sphericalMercator
};
export const datum = {
	bd09,
	gcj02
};
