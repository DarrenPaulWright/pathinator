import { Point, round } from 'type-enforcer-math';
import origin from '../utility/origin.js';
import Command from './Command.js';

export const DATA = Symbol();

export default class Arc extends Command {
	static split(args) {
		return Arc.parseArgs(args);
	}

	static parseArgs(args, isSet = false) {
		if (args[0] instanceof Point) {
			return args;
		}

		const size = 7;
		const output = [];

		args = Arc.clean(args[0], [3, 4], 7);

		for (let index = size; index <= args.length; index += size) {
			output.push([
				new Point(args[index - 7], args[index - 6]),
				parseFloat(args[index - 5]),
				parseInt(args[index - 4], 10),
				parseInt(args[index - 3], 10),
				new Point(args[index - 2], args[index - 1])
			]);
		}

		return isSet ? output[0] : output;
	}

	set(args) {
		this[DATA] = Arc.parseArgs(args, true);
	}

	position(currentPoint) {
		return this.convertPoint(this[DATA][4], currentPoint);
	}

	transform(settings) {
		this[DATA][0] = Arc.transform(this[DATA][0], {
			scale: settings.scale,
			fractionDigits: settings.fractionDigits,
			toAbsolute: true
		});
		this[DATA][4] = Arc.transform(this[DATA][4], settings);
	}

	export(settings) {
		const radius = this[DATA][0];
		const point = this.convertPoint(this[DATA][4], settings.currentPoint);
		let result = '';

		if (!settings.toPolygon) {
			this.isExportedAbsolute = settings.toAbsolute;
			this.setExportShorthand(false, settings);
			const currentPoint = settings.currentPoint;
			settings.currentPoint = origin;

			result = Arc.label('A', 'a', settings) +
				Arc.pointToString(radius, settings) +
				Arc.numberToString(
					round(this[DATA][1], settings.fractionDigits),
					settings,
					false,
					true
				) +
				Arc.numberToString(this[DATA][2], settings, false, settings.compress) +
				Arc.numberToString(this[DATA][3], settings);

			settings.currentPoint = currentPoint;
		}

		const isConsecutive = settings.isConsecutive;
		settings.isConsecutive = false;

		result += Arc.pointToString(point, settings);

		settings.isConsecutive = isConsecutive;
		settings.currentPoint = point;

		return result;
	}
}
