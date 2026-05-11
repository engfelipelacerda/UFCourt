import GUI from "lil-gui";

export function createSkyGUI(effectController, onUpdate) {
  const gui = new GUI();

  const folder = gui.addFolder("Sky Controls");

  folder.add(effectController, "turbidity", 0, 20, 0.1).onChange(onUpdate);

  folder.add(effectController, "rayleigh", 0, 4, 0.001).onChange(onUpdate);

  folder.open();

  return gui;
}
