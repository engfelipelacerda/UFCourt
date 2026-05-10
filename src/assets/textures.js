import * as THREE from "three";
import { loader } from "../loaders/textureLoader.js";

export const textures = {
  floortexture: loader.load("/textures/PavingStones083_1K-PNG_Color.png"),
};

textures.floortexture.wrapS = THREE.RepeatWrapping;
textures.floortexture.wrapT = THREE.RepeatWrapping;
textures.floortexture.repeat.set(160, 160);
textures.floortexture.colorSpace = THREE.SRGBColorSpace;
