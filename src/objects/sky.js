import * as THREE from "three";
import { Sky } from "three/examples/jsm/objects/Sky.js";
import { createSkyGUI } from "../gui/setupGUI.js";

// CREATE SKY
export function createSky(scene) {
  const sky = new Sky();
  sky.scale.setScalar(450000);

  scene.add(sky);

  const sun = new THREE.Vector3();

  const uniforms = sky.material.uniforms;

  // CONTROLES GUI
  const effectController = {
    turbidity: 0.1,
    rayleigh: 0.411,
  };

  // UPDATE GUI
  function updateGUI() {
    uniforms.turbidity.value = effectController.turbidity;
    uniforms.rayleigh.value = effectController.rayleigh;
  }
  const gui = createSkyGUI(effectController, updateGUI);

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
export function updateSky(sky, sun, sunLight, time) {
  const phi = Math.PI - time;
  const theta = Math.PI / 3;

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
}
