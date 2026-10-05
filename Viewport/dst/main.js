(() => {
  // src/viewport__screen.js
  class Viewport__Screen {
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

  // src/viewport__global.js
  class Viewport__Global {
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

  // src/viewport__mouse.js
  class Viewport__Mouse {
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

  // src/viewport__grid.js
  class Viewport__Grid {
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

  // src/viewport.js
  class Viewport2 {
    static Screen = Viewport__Screen;
    static Global = Viewport__Global;
    static Mouse = Viewport__Mouse;
    static Grid = Viewport__Grid;
    static ALIGN = Object.freeze({ CORNER: "CORNER", CENTER: "CENTER" });
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
      Viewport2.pan_start = { x: mouseX, y: mouseY };
      Viewport2.pan_origin = { x: Viewport2.offset.x, y: Viewport2.offset.y };
      Viewport2.panning = true;
      Viewport2.has_panned = false;
    }
    static stopPan() {
      Viewport2.panning = false;
      return Viewport2.has_panned;
    }
    static applyZoom(scale2) {
      const constrained_zoom = constrain(Viewport2.zoom * scale2, Viewport2.MIN_ZOOM, Viewport2.MAX_ZOOM);
      const ratio = constrained_zoom / Viewport2.zoom;
      Viewport2.zoom = constrained_zoom;
      Viewport2.zoom_offset.x = mouseX - ratio * (mouseX - Viewport2.zoom_offset.x);
      Viewport2.zoom_offset.y = mouseY - ratio * (mouseY - Viewport2.zoom_offset.y);
    }
    static update() {
      if (Viewport2.panning) {
        Viewport2.offset.x = Viewport2.pan_origin.x + (mouseX - Viewport2.pan_start.x) / Viewport2.zoom;
        Viewport2.offset.y = Viewport2.pan_origin.y + (mouseY - Viewport2.pan_start.y) / Viewport2.zoom;
        if (!Viewport2.has_panned && Math.hypot(mouseX - Viewport2.pan_start.x, mouseY - Viewport2.pan_start.y) > Viewport2.PAN_THRESHOLD) {
          Viewport2.has_panned = true;
        }
      }
      translate(Viewport2.zoom_offset.x, Viewport2.zoom_offset.y);
      scale(Viewport2.zoom);
      translate(Viewport2.offset.x, Viewport2.offset.y);
    }
    static __align(global, mode) {
      switch (mode) {
        case Viewport2.ALIGN.CORNER: {
          return Math.floor(global / Viewport2.GRID_SIZE) * Viewport2.GRID_SIZE;
        }
        case Viewport2.ALIGN.CENTER: {
          return Math.floor(global / Viewport2.GRID_SIZE) * Viewport2.GRID_SIZE + Viewport2.GRID_SIZE / 2;
        }
      }
      return global;
    }
    static setScreenCenterGlobalPos(global_pos_x, global_pos_y) {
      Viewport2.setScreenCenterGlobalPosX(global_pos_x);
      Viewport2.setScreenCenterGlobalPosY(global_pos_y);
    }
    static setScreenCenterGlobalPosX(global_pos_x) {
      Viewport2.offset.x = (width / 2 - Viewport2.zoom_offset.x) / Viewport2.zoom - global_pos_x;
    }
    static setScreenCenterGlobalPosY(global_pos_y) {
      Viewport2.offset.y = (height / 2 - Viewport2.zoom_offset.y) / Viewport2.zoom - global_pos_y;
    }
    static isMouseInsideCanvas() {
      return mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height;
    }
  }

  // src/main.js
  globalThis.Viewport = Viewport2;
})();
