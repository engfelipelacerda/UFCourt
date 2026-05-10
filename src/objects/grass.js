import * as THREE from "three"
import { color } from "three/tsl";

export function createGrass(){
    const geometry = new THREE.PlaneGeometry(200,200);

    const material = new THREE.MeshStandardMaterial({
        color:0x008000
    })

    const grass = new THREE.Mesh(geometry,material);

    grass.rotation.x = -Math.PI / 2;
    
    grass.receiveShadow = true;

    return grass;
}