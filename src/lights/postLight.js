import * as THREE from "three";

export function createPostLight() {
  const light = new THREE.SpotLight(0xffe4b5, 18);

  light.position.set(5, 15, 0);

  light.angle = Math.PI / 3;

  light.penumbra = 0.9;

  light.decay = 0.85;

  light.distance = 65;

  light.castShadow = true;

  light.shadow.mapSize.width = 2048;
  light.shadow.mapSize.height = 2048;
  light.shadow.camera.near = 1;
  light.shadow.camera.far = 80;
  light.shadow.camera.fov = 60;
  light.shadow.bias = -0.0001;

  const target = new THREE.Object3D();

  target.position.set(20, -10, 0);

  light.target = target;

  return {
    light,
    target,
  };
}
