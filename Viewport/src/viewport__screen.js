export class Viewport__Screen {
	static toGlobal(screen_pos_x, screen_pos_y, align = null) {
		return { x: Viewport.Screen.toGlobalX(screen_pos_x, align), y: Viewport.Screen.toGlobalY(screen_pos_y, align) };
	}

	static toGlobalX(screen_pos_x, align = null) {
		let x = (screen_pos_x - Viewport.zoom_offset.x) / Viewport.zoom - Viewport.offset.x;
		return Viewport.__align(x, align);
	}

	static toGlobalY(screen_pos_y, align = null) {
		let y = (screen_pos_y - Viewport.zoom_offset.y) / Viewport.zoom - Viewport.offset.y;
		return Viewport.__align(y, align);
	}

	static toGrid(screen_pos_x, screen_pos_y) {
		return { x: Viewport.Screen.toGridX(screen_pos_x), y: Viewport.Screen.toGridY(screen_pos_y) };
	}

	static toGridX(screen_pos_x) {
		const global_x = Viewport.Screen.toGlobalX(screen_pos_x);
		return Viewport.Global.toGridX(global_x);
	}

	static toGridY(screen_pos_y) {
		const global_y = Viewport.Screen.toGlobalY(screen_pos_y);
		return Viewport.Global.toGridY(global_y);
	}
}
