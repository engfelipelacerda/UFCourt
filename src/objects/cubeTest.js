import * as THREE from "three";

export function createCube() {
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const material = new THREE.MeshStandardMaterial({ color: 0x808080 });
  const cube = new THREE.Mesh(geometry, material);
  cube.castShadow = true;
  cube.receiveShadow = true;
  cube.position.y = 1;
  return cube;
}
