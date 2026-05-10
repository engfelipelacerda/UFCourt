import { loadSpotlightModel } from "../assets/models.js";

export async function createSpotlight(x, y, z) {
  const spotlight = await loadSpotlightModel();

  spotlight.scale.set(1, 1, 1);

  spotlight.position.set(x, y, z);

  spotlight.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
    spotlight.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  });

  return spotlight;
}
