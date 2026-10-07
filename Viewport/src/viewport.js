import { Viewport__Screen } from "./viewport__screen.js";
import { Viewport__Global } from "./viewport__global.js";
import { Viewport__Mouse } from "./viewport__mouse.js";
import { Viewport__Grid } from "./viewport__grid.js";

export class Viewport {
	static Screen = Viewport__Screen;
	static Global = Viewport__Global;
	static Mouse = Viewport__Mouse;
	static Grid = Viewport__Grid;

	static Align = Object.freeze({ CORNER: "CORNER", CENTER: "CENTER" });

	static GRID_SIZE = 10;
	static MIN_ZOOM = 0.5;
	static MAX_ZOOM = 5.5;
	static PAN_THRESHOLD = 0;

	static zoom = 1;
	static panning = false;
	static has_panned = false;
	static offset = { x: 0, y: 0 };
	static zoom_offset = { x: 0, y: 0 };
	static pan_start = { x: 0, y: 0 };
	static pan_origin = { x: 0, y: 0 };

	static startPan() {
		Viewport.pan_start = { x: mouseX, y: mouseY };
		Viewport.pan_origin = { x: Viewport.offset.x, y: Viewport.offset.y };
		Viewport.panning = true;
		Viewport.has_panned = false;
	}

	static stopPan() {
		Viewport.panning = false;
		return Viewport.has_panned;
	}

	static applyZoom(scale) {
		const constrained_zoom = constrain(Viewport.zoom * scale, Viewport.MIN_ZOOM, Viewport.MAX_ZOOM);
		const ratio = constrained_zoom / Viewport.zoom;

		Viewport.zoom = constrained_zoom;
		Viewport.zoom_offset.x = mouseX - ratio * (mouseX - Viewport.zoom_offset.x);
		Viewport.zoom_offset.y = mouseY - ratio * (mouseY - Viewport.zoom_offset.y);
	}

	static update() {
		if (Viewport.panning) {
			Viewport.offset.x = Viewport.pan_origin.x + (mouseX - Viewport.pan_start.x) / Viewport.zoom;
			Viewport.offset.y = Viewport.pan_origin.y + (mouseY - Viewport.pan_start.y) / Viewport.zoom;

			if (!Viewport.has_panned && Math.hypot(mouseX - Viewport.pan_start.x, mouseY - Viewport.pan_start.y) > Viewport.PAN_THRESHOLD) {
				Viewport.has_panned = true;
			}
		}

		translate(Viewport.zoom_offset.x, Viewport.zoom_offset.y);
		scale(Viewport.zoom);
		translate(Viewport.offset.x, Viewport.offset.y);
	}

	static __align(global, mode) {
		switch (mode) {
			case Viewport.Align.CORNER: {
				return Math.floor(global / Viewport.GRID_SIZE) * Viewport.GRID_SIZE;
			}
			case Viewport.Align.CENTER: {
				return Math.floor(global / Viewport.GRID_SIZE) * Viewport.GRID_SIZE + Viewport.GRID_SIZE / 2;
			}
		}

		return global;
	}

	static setScreenCenterGlobalPos(global_pos_x, global_pos_y) {
		Viewport.setScreenCenterGlobalPosX(global_pos_x);
		Viewport.setScreenCenterGlobalPosY(global_pos_y);
	}

	static setScreenCenterGlobalPosX(global_pos_x) {
		Viewport.offset.x = (width / 2 - Viewport.zoom_offset.x) / Viewport.zoom - global_pos_x;
	}

	static setScreenCenterGlobalPosY(global_pos_y) {
		Viewport.offset.y = (height / 2 - Viewport.zoom_offset.y) / Viewport.zoom - global_pos_y;
	}

	static isMouseInsideCanvas() {
		return mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height;
	}
}
