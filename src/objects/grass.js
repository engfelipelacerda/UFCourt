import * as THREE from "three";
import { textures } from "../assets/textures.js";

export function createGrass() {
  const geometry = new THREE.PlaneGeometry(200, 200);

  const material = new THREE.MeshStandardMaterial({
    map: textures.gramtexture,
    roughness: 1,
    metalness: 0,
  });

  const grass = new THREE.Mesh(geometry, material);

  grass.rotation.x = -Math.PI / 2;

  grass.receiveShadow = true;

  return grass;
}
