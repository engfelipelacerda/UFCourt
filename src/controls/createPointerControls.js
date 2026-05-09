import { PointerLockControls } from "three/examples/jsm/Addons.js";

export function createPointerControls(camera, renderer) {
  const pControl = new PointerLockControls(camera, renderer);
  return pControl;
}
