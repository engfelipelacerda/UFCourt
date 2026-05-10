import * as THREE from "three";

export function createRenderer() {
  // Creates the main WebGL renderer
  // antialias: true smooths jagged edges on objects
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });

  // Sets the renderer size to match the browser window
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Adds the renderer canvas (<canvas>) to the HTML document
  document.body.appendChild(renderer.domElement);

  // Adjusts rendering resolution based on the screen pixel density
  // Improves image sharpness on high-resolution displays
  renderer.setPixelRatio(window.devicePixelRatio);

  // Enables shadow rendering in the scene
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  return renderer;
}
