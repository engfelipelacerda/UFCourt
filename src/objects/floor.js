import * as THREE from "three";
import { textures } from "../assets/textures.js";

export function createFloor() {
  const geometry = new THREE.PlaneGeometry(80, 64);

  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load('../../public/textures/Terrazzo005_1K-JPG_Color.jpg');
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(32, 20);

  const material = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 1,
    metalness: 0,
  });

  const floor = new THREE.Mesh(geometry, material);

  // the plane lies on the XZ axis
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0.001;
  floor.receiveShadow = true;

  return floor;
}
