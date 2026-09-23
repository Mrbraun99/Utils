export class Viewport__Global {
	static toGrid(global_pos_x, global_pos_y) {
		return { x: Viewport.Global.toGridX(global_pos_x), y: Viewport.Global.toGridY(global_pos_y) };
	}

	static toGridX(global_pos_x) {
		return Math.floor(global_pos_x / Viewport.GRID_SIZE);
	}

	static toGridY(global_pos_y) {
		return Math.floor(global_pos_y / Viewport.GRID_SIZE);
	}
}
