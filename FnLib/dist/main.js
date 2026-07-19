(() => {
  // src/fn_lib__math.js
  class FnLib__Math {
    static mod(value, modulo) {
      return (value % modulo + modulo) % modulo;
    }
  }

  // src/fn_lib.js
  class FnLib {
    static Math = FnLib__Math;
  }

  // src/main.js
  globalThis.FnLib = FnLib;
})();
