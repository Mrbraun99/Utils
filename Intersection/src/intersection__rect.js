import { Intersection__Point } from "./intersection__point.js";

export class Intersection__Rect {
	static _instance = {
		pos: null,
		size: null,
		rotation: 0,
		anchor: null,

		point(x, y) {
			return Intersection__Point.rect(x, y, this.pos, this.size, this.rotation, this.anchor);
		},
	};

	static instance(pos, size, rotation = 0, anchor = { x: 0.5, y: 0.5 }) {
		this._instance.pos = pos;
		this._instance.size = size;
		this._instance.rotation = rotation;
		this._instance.anchor = anchor;
		return this._instance;
	}

	static point(pos, size, rotation = 0, anchor = { x: 0.5, y: 0.5 }, x, y) {
		return Intersection__Point.rect(x, y, pos, size, rotation, anchor);
	}
}
