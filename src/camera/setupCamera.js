import * as THREE from "three";

export function createCamera() {
  let camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.set(10, 5, 10);

  camera.lookAt(0, 0, 0);
  return camera;
}
