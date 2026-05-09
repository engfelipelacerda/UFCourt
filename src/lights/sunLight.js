import * as THREE from "three";

export function createSunLight() {
  let sunLight = new THREE.DirectionalLight(0xffffff, 2);

  sunLight.position.set(10, 20, 10);

  sunLight.castShadow = true;

  return sunLight;
}
