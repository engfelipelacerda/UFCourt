import * as THREE from "three";
import { Sky } from "three/examples/jsm/objects/Sky.js";
import GUI from "lil-gui";

// =========================================
// CREATE SKY
// =========================================
export function createSky(scene, renderer) {
  const sky = new Sky();
  sky.scale.setScalar(450000);

  scene.add(sky);

  const sun = new THREE.Vector3();

  const uniforms = sky.material.uniforms;

  // =========================================
  // CONTROLES GUI
  // =========================================
  const effectController = {
    turbidity: 0.5,
    rayleigh: 0.411,
  };

  // =========================================
  // UPDATE GUI
  // =========================================
  function updateGUI() {
    uniforms["turbidity"].value = effectController.turbidity;

    uniforms["rayleigh"].value = effectController.rayleigh;
  }

  // =========================================
  // GUI
  // =========================================
  const gui = new GUI();

  const folder = gui.addFolder("Controls");

  folder.add(effectController, "turbidity", 0, 20, 0.1).onChange(updateGUI);

  folder.add(effectController, "rayleigh", 0, 4, 0.001).onChange(updateGUI);

  folder.open();

  // Inicializa GUI
  updateGUI();

  return {
    sky,
    sun,
    gui,
    effectController,
  };
}

// =========================================
// MOVIMENTO AUTOMÁTICO DO SOL
// =========================================
export function updateSky(sky, sun, sunLight, time, renderer) {
  const phi = Math.PI - time;
  const theta = Math.PI / 2;

  sun.setFromSphericalCoords(1, phi, theta);

  // Atualiza shader
  sky.material.uniforms["sunPosition"].value.copy(sun);

  // Atualiza luz real
  sunLight.position.copy(sun).multiplyScalar(100);

  // Dia / noite
  if (sun.y > 0) {
    sunLight.intensity = 1.1;

    if (sun.y < 0.15) {
      sunLight.color.set(0xff9966);
    } else {
      sunLight.color.set(0xffffff);
    }
  } else {
    sunLight.intensity = 0;
  }

  // Exposure dinâmica opcional
  if (renderer) {
    renderer.toneMappingExposure = sun.y > 0 ? 0.55 : 0.2;
  }
}
