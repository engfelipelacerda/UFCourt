import { gltfLoader } from "../loaders/gltfLoader.js";

export function loadSpotlightModel() {
  return new Promise((resolve, reject) => {
    gltfLoader.load(
      "/models/street-light-low-poly.glb",

      (gltf) => {
        resolve(gltf.scene);
      },

      undefined,

      (error) => {
        reject(error);
      },
    );
  });
}
