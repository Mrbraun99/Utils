export class Intersection__Point {
	static _instance = {
		x: 0,
		y: 0,

		rect(pos, size, rotation = 0, anchor = { x: 0.5, y: 0.5 }) {
			return Intersection__Point.rect(this.x, this.y, pos, size, rotation, anchor);
		},
	};

	static instance(x, y) {
		this._instance.x = x;
		this._instance.y = y;
		return this._instance;
	}

	static rect(x, y, pos, size, rotation = 0, anchor = { x: 0.5, y: 0.5 }) {
		const dx = x - pos.x;
		const dy = y - pos.y;

		let local_x = dx;
		let local_y = dy;

		if (rotation != 0) {
			local_x = dx * Math.cos(rotation) + dy * Math.sin(rotation);
			local_y = -dx * Math.sin(rotation) + dy * Math.cos(rotation);
		}

		if (anchor.x == 0.5 && anchor.y == 0.5) {
			return Math.abs(local_x) <= size.x / 2 && Math.abs(local_y) <= size.y / 2;
		}

		return local_x >= -anchor.x * size.x && local_x <= (1 - anchor.x) * size.x && local_y >= -anchor.y * size.y && local_y <= (1 - anchor.y) * size.y;
	}
}
