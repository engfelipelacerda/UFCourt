import * as THREE from "three";

export function createSun(scene) {
  // Luz do sol
  const sunLight = new THREE.DirectionalLight(0xffffff, 2);
  sunLight.castShadow = true;

  // Objeto visual do sol
  const sunGeometry = new THREE.SphereGeometry(3, 32, 32);
  const sunMaterial = new THREE.MeshBasicMaterial({
    color: 0xffdd66,
  });

  const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);

  scene.add(sunLight);
  scene.add(sunMesh);

  return { sunLight, sunMesh };
}

export function updateSun(sunLight, sunMesh, time) {
  const radius = 100; // Distância do sol da cena

  // Movimento circular
  const x = Math.cos(time) * radius;
  const y = Math.sin(time) * radius;

  sunLight.position.set(x, y, 0);
  sunMesh.position.set(x, y, 0);

  // Sol abaixo do horizonte = noite
  if (y < 0) {
    sunLight.intensity = 0;
    sunMesh.visible = false;
  } else {
    sunLight.intensity = 2;
    sunMesh.visible = true;
  }
}
