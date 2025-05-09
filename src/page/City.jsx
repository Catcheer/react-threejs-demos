import React, { useLayoutEffect } from "react";
import * as THREE from "three";
import * as dat from "dat.gui";
import Stats from "stats.js";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import useBasic from "../hooks/useBasic";
import {CityClass} from "../libs/CityClass.js";

// 加载glb的loader
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function City() {
  const { scene, camera, renderer } = useBasic();
  useLayoutEffect(() => {
    const guiParam = {
      fov: 80,
    };
    if (!renderer || !scene || !camera) {
      return;
    }

    scene.fog = new THREE.Fog(0x000000, 0, 1000);
    camera.position.set(30, 40, 50);
    camera.fov = guiParam.fov; // 角度值，通常在45-75之间
    camera.updateProjectionMatrix(); // 修改fov后必须调用

    const texture = new THREE.TextureLoader().load(
      "/path_007_19.png",
      function (texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.anisotropy = 16;
        texture.colorSpace = THREE.SRGBColorSpace;
      }
    );

    const helper = new THREE.GridHelper(300, 30, 0x114499, 0x114499);
    scene.add(helper);
    const cityInstace = new CityClass({
      areaSize: 30,
      maxHeight: 20,
      roadTexture: texture,
      roadWidth: 2,
      roadOffset: 0.6,
    });
    scene.add(cityInstace.roadsGroup);
	scene.add(cityInstace.buildingsGroup);
  const controls = new OrbitControls(camera, renderer.domElement);
  const clock = new THREE.Clock();
    function ani() {
      // stats.begin();
     
      controls.update();
      cityInstace.run(clock.getDelta());
      renderer.render(scene, camera);
      // stats.end();
      requestAnimationFrame(ani);
    }
    ani();
  }, [renderer, scene, camera]);

  return <canvas id="canvas" style={{ display: "block" }}></canvas>;
}
