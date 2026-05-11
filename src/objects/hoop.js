import { loadBasketHoop } from "../assets/models";

export async function createBasketHoop(transform){
    const basketballHoop = await loadBasketHoop();

    basketballHoop.scale.set(0.9,0.93,0.9);
    

    const [pos_x,pos_y,pos_z] = transform.position;
    basketballHoop.position.set(pos_x,pos_y,pos_z);

    const [rot_x,rot_y,rot_z] = transform.rotation;
    basketballHoop.rotation.set(rot_x,rot_y,rot_z);

    basketballHoop.castShadow = true;
    basketballHoop.receiveShadow = true;

    return basketballHoop;
}