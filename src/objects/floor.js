import * as THREE from "three";

export function createFloor() {
  const geometry = new THREE.PlaneGeometry(200, 200);

  const material = new THREE.MeshStandardMaterial({
    color: 0x4A4A4A,
    roughness: 0.9
  });

  const floor = new THREE.Mesh(geometry, material);

  // the plane lies on the XZ axis
  floor.rotation.x = -Math.PI / 2;

  floor.receiveShadow = true;

  return floor;
}
