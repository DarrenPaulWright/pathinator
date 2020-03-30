import { isArray } from 'type-enforcer-math';
import Cubic, { DATA } from './Cubic.js';

export default class Quadratic extends Cubic {
	set(args, previous, currentPoint) {
		this[DATA] = Quadratic.parseArgs(args);

		if (!isArray(this[DATA])) {
			this[DATA] = [this.reflectPreviousControlPoint(previous, currentPoint), this[DATA]];
		}
	}

	export(settings) {
		const control = this.convertPoint(this[DATA][0], settings.currentPoint);
		const point = this.convertPoint(this[DATA][1], settings.currentPoint);
		let result = '';

		if (this.isShorthand(settings, control)) {
			result = Quadratic.label('T', 't', settings) +
				Quadratic.pointToString(point, settings);
		}
		else {
			result = Quadratic.label('Q', 'q', settings) +
				Quadratic.pointToString(control, settings) +
				Quadratic.pointToString(point, settings, true);
		}

		settings.currentPoint = point;

		return result;
	}
}