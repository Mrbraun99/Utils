import { Intersection__Point } from "./intersection__point.js";
import { Intersection__Rect } from "./intersection__rect.js";
import { Intersection__Circle } from "./intersection__circle.js";

export class Intersection {
	static Point = Intersection__Point;
	static Rect = Intersection__Rect;
	static Circle = Intersection__Circle;

	static point(x, y) {
		return Intersection__Point.instance(x, y);
	}

	static rect(pos, size, rotation = 0, anchor = { x: 0.5, y: 0.5 }) {
		return Intersection__Rect.instance(pos, size, rotation, anchor);
	}

	static circle(pos, radius) {
		return Intersection__Circle.instance(pos, radius);
	}
}
