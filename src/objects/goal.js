import { loadSoccerGoal } from "../assets/models";

export async function createSoccerGoal(transform) {
  const soccerGoal = await loadSoccerGoal();

  soccerGoal.scale.set(0.95, 1, 0.95);

  const [pos_x, pos_y, pos_z] = transform.position;
  soccerGoal.position.set(pos_x, pos_y, pos_z);

  const [rot_x, rot_y, rot_z] = transform.rotation;
  soccerGoal.rotation.set(rot_x, rot_y, rot_z);

  soccerGoal.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return soccerGoal;
}

