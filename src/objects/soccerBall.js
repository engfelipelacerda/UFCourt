import { loadSoccerBallModel } from "../assets/models.js";

export async function createSoccerBall(x, y, z) {
  const soccerBall = await loadSoccerBallModel();

  soccerBall.scale.set(0.04, 0.04, 0.04);

  soccerBall.position.set(x, y, z);

  soccerBall.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  return soccerBall;
}
