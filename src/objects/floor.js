import * as THREE from "three";
import { textures } from "../assets/textures.js";

export function createFloor() {
  const geometry = new THREE.PlaneGeometry(200, 200);

  const material = new THREE.MeshStandardMaterial({
    map: textures.floortexture,
    roughness: 1,
    metalness: 0,
  });

  const floor = new THREE.Mesh(geometry, material);

  // the plane lies on the XZ axis
  floor.rotation.x = -Math.PI / 2;

  floor.receiveShadow = true;

  return floor;
}
