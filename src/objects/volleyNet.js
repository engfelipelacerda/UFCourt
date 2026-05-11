import { loadVolleyballNet } from "../assets/models";
import * as THREE from "three";

export async function createVolleyballNet(transform) {
    const volleyNet = await loadVolleyballNet();

    volleyNet.scale.set(1,1,1);
    
    const [pos_x,pos_y,pos_z] = transform.position;
    volleyNet.position.set(pos_x,pos_y,pos_z);

    const [rot_x,rot_y,rot_z] = transform.rotation;
    volleyNet.rotation.set(rot_x,rot_y,rot_z);

    volleyNet.castShadow = true;
    volleyNet.receiveShadow = true;

    volleyNet.traverse((child) => {

    if (child.isMesh) {

        child.material.transparent = true;

        child.material.alphaTest = 0.35;

        child.material.side = THREE.DoubleSide;

        child.material.needsUpdate = true;
    }
});

    return volleyNet;
}