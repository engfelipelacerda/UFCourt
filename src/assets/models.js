import { gltfLoader } from "../loaders/gltfLoader.js";
import { objLoader } from "../loaders/objLoader.js";

export function loadSpotlightModel() {
  return new Promise((resolve, reject) => {
    gltfLoader.load(
      "/models/street-light-low-poly.glb",

      (gltf) => {
        resolve(gltf.scene);
      },

      undefined,

      (error) => {
        reject(error);
      },
    );
  });
}

export function loadSoccerGoal(){
  return new Promise((resolve,reject)=>{
    objLoader.load(
      "/models/goalpost.obj",
      (obj) =>{
        resolve(obj);
      },
      undefined,
      (error)=>{
        reject(error);
      },
    );
  });
}

export function loadBasketHoop(){
  return new Promise((resolve,reject)=>{
    gltfLoader.load(
      "/models/Basketballk.glb",
      (glt)=>{
        resolve(glt.scene);
      },
      undefined,
      (error)=>{
        reject(error);
      }
    )
  })
}

export function loadVolleyballNet(){
  return new Promise((resolve,reject)=>{
    gltfLoader.load(
      "/models/VolleyNet.glb",
      (glt)=>{
        resolve(glt.scene);
      },
      undefined,
      (error)=>{
        reject(error);
      }
    )
  })
}
