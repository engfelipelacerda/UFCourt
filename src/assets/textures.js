import * as THREE from "three";
import { loader } from "../loaders/textureLoader.js";

export const textures = {
  floortexture: loader.load(
    "/textures/gram/Poliigon_GrassPatchyGround_4585_BaseColor.jpg",
  ),
};

textures.floortexture.wrapS = THREE.RepeatWrapping;
textures.floortexture.wrapT = THREE.RepeatWrapping;
textures.floortexture.repeat.set(40, 40);
textures.floortexture.colorSpace = THREE.SRGBColorSpace;
