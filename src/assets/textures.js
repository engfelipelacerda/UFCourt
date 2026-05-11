import * as THREE from "three";
import { loader } from "../loaders/textureLoader.js";

export const textures = {
  gramtexture: loader.load("/textures/gram/GrassPatchyGround.jpg"),
  floortexture: loader.load("/textures/Terrazzo.jpg"),
};

textures.floortexture.wrapS = THREE.RepeatWrapping;
textures.floortexture.wrapT = THREE.RepeatWrapping;
textures.floortexture.repeat.set(40, 40);
textures.floortexture.colorSpace = THREE.SRGBColorSpace;

textures.gramtexture.wrapS = THREE.RepeatWrapping;
textures.gramtexture.wrapT = THREE.RepeatWrapping;
textures.gramtexture.repeat.set(40, 40);
textures.gramtexture.colorSpace = THREE.SRGBColorSpace;
