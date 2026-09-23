(() => {
  // src/viewport__screen.js
  var Viewport__Screen = class {
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
  };

  // src/viewport__global.js
  var Viewport__Global = class {
    static toGrid(global_pos_x, global_pos_y) {
      return { x: Viewport.Global.toGridX(global_pos_x), y: Viewport.Global.toGridY(global_pos_y) };
    }
    static toGridX(global_pos_x) {
      return Math.floor(global_pos_x / Viewport.GRID_SIZE);
    }
    static toGridY(global_pos_y) {
      return Math.floor(global_pos_y / Viewport.GRID_SIZE);
    }
  };

  // src/viewport__mouse.js
  var Viewport__Mouse = class {
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
  };

  // src/viewport__grid.js
  var Viewport__Grid = class {
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
  };

  // src/viewport.js
  var Viewport2 = class _Viewport {
    static Screen = Viewport__Screen;
    static Global = Viewport__Global;
    static Mouse = Viewport__Mouse;
    static Grid = Viewport__Grid;
    static ALIGN = Object.freeze({ CORNER: "CORNER", CENTER: "CENTER" });
    static GRID_SIZE = 10;
    static MIN_ZOOM = 0.5;
    static MAX_ZOOM = 5.5;
    static zoom = 1;
    static panning = false;
    static offset = { x: 0, y: 0 };
    static zoom_offset = { x: 0, y: 0 };
    static pan_start = { x: 0, y: 0 };
    static pan_origin = { x: 0, y: 0 };
    static startPan() {
      _Viewport.pan_start = { x: mouseX, y: mouseY };
      _Viewport.pan_origin = { x: _Viewport.offset.x, y: _Viewport.offset.y };
      _Viewport.panning = true;
    }
    static stopPan() {
      _Viewport.panning = false;
    }
    static applyZoom(scale2) {
      const constrained_zoom = constrain(_Viewport.zoom * scale2, _Viewport.MIN_ZOOM, _Viewport.MAX_ZOOM);
      const ratio = constrained_zoom / _Viewport.zoom;
      _Viewport.zoom = constrained_zoom;
      _Viewport.zoom_offset.x = mouseX - ratio * (mouseX - _Viewport.zoom_offset.x);
      _Viewport.zoom_offset.y = mouseY - ratio * (mouseY - _Viewport.zoom_offset.y);
    }
    static update() {
      if (_Viewport.panning) {
        _Viewport.offset.x = _Viewport.pan_origin.x + (mouseX - _Viewport.pan_start.x) / _Viewport.zoom;
        _Viewport.offset.y = _Viewport.pan_origin.y + (mouseY - _Viewport.pan_start.y) / _Viewport.zoom;
      }
      translate(_Viewport.zoom_offset.x, _Viewport.zoom_offset.y);
      scale(_Viewport.zoom);
      translate(_Viewport.offset.x, _Viewport.offset.y);
    }
    static __align(global, mode) {
      switch (mode) {
        case _Viewport.ALIGN.CORNER: {
          return Math.floor(global / _Viewport.GRID_SIZE) * _Viewport.GRID_SIZE;
        }
        case _Viewport.ALIGN.CENTER: {
          return Math.floor(global / _Viewport.GRID_SIZE) * _Viewport.GRID_SIZE + _Viewport.GRID_SIZE / 2;
        }
      }
      return global;
    }
    static setScreenCenterGlobalPos(global_pos_x, global_pos_y) {
      _Viewport.setScreenCenterGlobalPosX(global_pos_x);
      _Viewport.setScreenCenterGlobalPosY(global_pos_y);
    }
    static setScreenCenterGlobalPosX(global_pos_x) {
      _Viewport.offset.x = (width / 2 - _Viewport.zoom_offset.x) / _Viewport.zoom - global_pos_x;
    }
    static setScreenCenterGlobalPosY(global_pos_y) {
      _Viewport.offset.y = (height / 2 - _Viewport.zoom_offset.y) / _Viewport.zoom - global_pos_y;
    }
    static isMouseInsideCanvas() {
      return mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height;
    }
  };

  // src/main.js
  globalThis.Viewport = Viewport2;
})();
