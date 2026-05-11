import * as THREE from 'three';

export function createBleachers(color = 0xffffff) {
    const group = new THREE.Group();
    
    const steps = 15;           // Mais degraus (MAIOR)
    const width = 50;           // Mais larga (MAIOR)
    const stepHeight = 0.5;     
    const stepDepth = 0.8;      

    const material = new THREE.MeshStandardMaterial({ 
        color: color, 
        roughness: 0.4,
        metalness: 0.3 // Um pouco de reflexo para parecer material de arena
    });

    // Criando os degraus
    for (let i = 0; i < steps; i++) {
        const geometry = new THREE.BoxGeometry(width, stepHeight * (i + 1), stepDepth);
        const step = new THREE.Mesh(geometry, material);

        step.position.y = (stepHeight * (i + 1)) / 2;
        step.position.z = -i * stepDepth;

        step.castShadow = true;
        step.receiveShadow = true;

        group.add(step);
    }

    // ADICIONANDO O PISO (BASE) da arquibancada
    const floorHeight = 0.2;
    const floorGeometry = new THREE.BoxGeometry(width + 2, floorHeight, steps * stepDepth);
    const floorMesh = new THREE.Mesh(floorGeometry, material);
    
    // Posiciona a base embaixo de tudo
    floorMesh.position.y = floorHeight / 2;
    floorMesh.position.z = -((steps * stepDepth) / 2) + stepDepth/2;
    floorMesh.receiveShadow = true;
    group.add(floorMesh);

    return group;
}