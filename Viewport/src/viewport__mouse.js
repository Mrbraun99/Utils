export class Viewport__Mouse {
	static toGlobal(align = null) {
		return { x: Viewport.Mouse.toGlobalX(align), y: Viewport.Mouse.toGlobalY(align) };
	}

	static toGlobalX(align = null) {
		return Viewport.Screen.toGlobalX(mouseX, align);
	}

	static toGlobalY(align = null) {
		return Viewport.Screen.toGlobalY(mouseY, align);
	}

	static toGrid() {
		return { x: Viewport.Mouse.toGridX(), y: Viewport.Mouse.toGridY() };
	}

	static toGridX() {
		return Viewport.Screen.toGridX(mouseX);
	}

	static toGridY() {
		return Viewport.Screen.toGridY(mouseY);
	}
}
