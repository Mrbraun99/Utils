export class Viewport__Grid {
	static toGlobal(grid_pos_x, grid_pos_y, align = Viewport.ALIGN.CENTER) {
		return { x: Viewport.Grid.toGlobalX(grid_pos_x, align), y: Viewport.Grid.toGlobalY(grid_pos_y, align) };
	}

	static toGlobalX(grid_pos_x, align = Viewport.ALIGN.CENTER) {
		switch (align) {
			case Viewport.ALIGN.CORNER: {
				return grid_pos_x * Viewport.GRID_SIZE;
			}
			case Viewport.ALIGN.CENTER: {
				return grid_pos_x * Viewport.GRID_SIZE + Viewport.GRID_SIZE / 2;
			}
		}
	}

	static toGlobalY(grid_pos_y, align = Viewport.ALIGN.CENTER) {
		switch (align) {
			case Viewport.ALIGN.CORNER: {
				return grid_pos_y * Viewport.GRID_SIZE;
			}
			case Viewport.ALIGN.CENTER: {
				return grid_pos_y * Viewport.GRID_SIZE + Viewport.GRID_SIZE / 2;
			}
		}
	}
}
