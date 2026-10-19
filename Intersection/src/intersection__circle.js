import { Intersection__Point } from "./intersection__point.js";

export class Intersection__Circle {
	static _instance = {
		pos: null,
		radius: 0,

		point(x, y) {
			return Intersection__Point.circle(x, y, this.pos, this.radius);
		},
	};

	static instance(pos, radius) {
		this._instance.pos = pos;
		this._instance.radius = radius;
		return this._instance;
	}

	static point(pos, radius, x, y) {
		return Intersection__Point.circle(x, y, pos, radius);
	}
}
