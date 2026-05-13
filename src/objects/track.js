import * as THREE from "three";

export function createAthleticTrack() {
  const group = new THREE.Group();

  // 1. Materiais PBR
  const trackMaterial = new THREE.MeshStandardMaterial({
    color: 0x8b4513, // Marrom terracota
    roughness: 0.9,
    side: THREE.DoubleSide,
  });

  const lineMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    depthTest: true,
    polygonOffset: true,
    polygonOffsetFactor: -1, // Garante que a linha fique na frente da pista
    polygonOffsetUnits: -1,
  });

  // Dimensões para envolver a quadra
  const w = 24;
  const h = 15;
  const laneWidth = 1.2;
  const numLanes = 4;

  // Função para gerar o formato oficial (curvas + retas)
  const createTrackShape = (radius) => {
    const shape = new THREE.Shape();
    shape.absarc(w, 0, radius, -Math.PI / 2, Math.PI / 2, false);
    shape.absarc(-w, 0, radius, Math.PI / 2, -Math.PI / 2, false);
    return shape;
  };

  // Criar a base da pista
  const trackOuterRadius = h + numLanes * laneWidth;
  const mainShape = createTrackShape(trackOuterRadius);

  const holePath = new THREE.Path();
  holePath.absarc(w, 0, h, -Math.PI / 2, Math.PI / 2, false);
  holePath.absarc(-w, 0, h, Math.PI / 2, -Math.PI / 2, false);
  mainShape.holes.push(holePath);

  const trackGeo = new THREE.ShapeGeometry(mainShape);
  const trackMesh = new THREE.Mesh(trackGeo, trackMaterial);
  trackMesh.rotation.x = -Math.PI / 2;
  trackMesh.position.y = 0.01; // Altura base
  trackMesh.receiveShadow = true;
  group.add(trackMesh);

  // 2. Adicionar as Listras (Raias)
  for (let i = 0; i <= numLanes; i++) {
    const radius = h + i * laneWidth;
    const lineShape = createTrackShape(radius);
    const points = lineShape.getPoints(128); // Mais pontos para a curva ficar lisa
    const lineGeo = new THREE.BufferGeometry().setFromPoints(points);

    const line = new THREE.LineLoop(lineGeo, lineMaterial);
    line.rotation.x = -Math.PI / 2;
    line.position.y = 0.03; // Levemente acima da base marrom
    line.receiveShadow = true;
    group.add(line);
  }

  return group;
}

