import * as THREE from "three";

export function createScene() {
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xcfcfcf, 50, 100);
  scene.background = new THREE.Color(0xd3d3d3);
  return scene;
}
