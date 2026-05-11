import { loadSpotlightModel } from "../assets/models.js";
import { createPostLight } from "../lights/postLight.js";

export async function createSpotlight(x, y, z) {
  const spotlight = await loadSpotlightModel();

  spotlight.scale.set(0.7, 0.7, 0.7);

  spotlight.position.set(x, y, z);

  spotlight.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  const { light, target } = createPostLight();

  spotlight.add(target);
  spotlight.add(light);

  return spotlight;
}
