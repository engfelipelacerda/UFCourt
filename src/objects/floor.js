import * as THREE from "three";
import { textures } from "../assets/textures.js";

export function createFloor() {
  const geometry = new THREE.PlaneGeometry(80, 64);

  const material = new THREE.MeshStandardMaterial({
    map: textures.floortexture,
    roughness: 1,
    metalness: 0,
  });

  const floor = new THREE.Mesh(geometry, material);

  // Plano no eixo XZ
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0.001;
  floor.receiveShadow = true;

  return floor;
}
