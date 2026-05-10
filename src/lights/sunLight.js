import * as THREE from "three";

export function createSunLight() {
  const sunLight = new THREE.DirectionalLight(0xffffff, 2);

  sunLight.castShadow = true;

  sunLight.shadow.mapSize.width = 2048;
  sunLight.shadow.mapSize.height = 2048;

  sunLight.shadow.camera.near = 0.5;
  sunLight.shadow.camera.far = 500;

  sunLight.shadow.camera.left = -100;
  sunLight.shadow.camera.right = 100;
  sunLight.shadow.camera.top = 100;
  sunLight.shadow.camera.bottom = -100;

  return sunLight;
}
