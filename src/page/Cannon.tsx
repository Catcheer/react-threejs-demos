import React, { useLayoutEffect } from "react";
import * as THREE from "three";
import * as dat from "dat.gui";
import Stats from "stats.js";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import useBasic from "../hooks/useBasic";

// 加载glb的loader
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Cannon() {
  const { scene, camera, renderer } = useBasic();

  useLayoutEffect(() => {
    if (!renderer || !scene || !camera) {
      return;
    }
    renderer.shadowMap.enabled = true;
    scene.fog = new THREE.Fog(0x000000, 0, 600);
    scene.castShadow = true;
    camera.position.set(0, 50, 100);

    camera.lookAt(0, 0, 0);

    const gridHelper = new THREE.GridHelper(2000, 30, 0xffffff, 0xffffff);
    scene.add(gridHelper);

    const boxGeometry = new THREE.BoxGeometry(20, 20, 20);
    const boxMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
    });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.set(0, 10, 0);
    box.castShadow = true;
    scene.add(box);

    const axesHelper = new THREE.AxesHelper(20);
    scene.add(axesHelper);

    // const pointlight = new THREE.PointLight(0xffffff,100);
    // pointlight.position.set(0, 30, -30);
    // scene.add(pointlight);

    // 添加环境光
    // const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    // scene.add(ambientLight);

    const direlight = new THREE.DirectionalLight(0xffffff, 0.2);
    direlight.position.set(50, 50, -10);
    direlight.castShadow = true;

    direlight.shadow.camera.left = -100;
    direlight.shadow.camera.right = 100;
    direlight.shadow.camera.top = 100;
    direlight.shadow.camera.bottom = -100;
    direlight.shadow.camera.near = 1;
    direlight.shadow.camera.far = 500;

    direlight.shadow.mapSize.width = 2048;
direlight.shadow.mapSize.height = 2048;

    scene.add(direlight);

    const direLightHelper = new THREE.DirectionalLightHelper(direlight, 10);
    scene.add(direLightHelper);

    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(2000, 2000),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
      })
    );
    plane.receiveShadow = true;
    plane.rotateX(-Math.PI / 2);
    plane.position.y = 0;
    scene.add(plane);

    const conrols = new OrbitControls(camera, renderer.domElement);

    function ani() {
      // stats.begin();

      renderer.render(scene, camera);
      conrols.update();
      // stats.end();
      requestAnimationFrame(ani);
    }
    ani();
  }, [scene, camera, renderer]);

  return <canvas id="canvas" style={{ display: "block" }}></canvas>;
}
