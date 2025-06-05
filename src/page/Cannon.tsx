import React, { useLayoutEffect } from "react";
import * as THREE from "three";
import * as dat from "dat.gui";
import Stats from "stats.js";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as TWEEN from "@tweenjs/tween.js";
import * as CANNON from "cannon-es";
import useBasic from "../hooks/useBasic";

// 加载glb的loader
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Cannon() {
  const { scene, camera, renderer } = useBasic();

  const gui = new dat.GUI();
  const raycaster = new THREE.Raycaster();
  const world = new CANNON.World();

  useLayoutEffect(() => {
    if (!renderer || !scene || !camera) {
      return;
    }
    
    renderer.shadowMap.enabled = true;
    scene.fog = new THREE.Fog(0x000000, 0, 600);
    scene.castShadow = true;
    camera.position.set(0, 50, 100);

    camera.lookAt(0, 0, 0);
    const conrols = new OrbitControls(camera, renderer.domElement);

    const gridHelper = new THREE.GridHelper(2000, 30, 0xffffff, 0xffffff);
    scene.add(gridHelper);

    const axesHelper = new THREE.AxesHelper(20);
    scene.add(axesHelper);

    const pointlight = new THREE.PointLight(0xffffff, 100);
    pointlight.castShadow = true;
    pointlight.position.set(0, 30, -30);
    scene.add(pointlight);
    const pointlightHelper = new THREE.PointLightHelper(pointlight, 2);
    scene.add(pointlightHelper);

    // 添加环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);

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

    const boxGeometry = new THREE.BoxGeometry(20, 20, 20);
    const boxMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
    });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.set(20, 10, 0);
    box.castShadow = true;
    scene.add(box);

    //第一个刚体 用于box
    const body1 = new CANNON.Body({
      mass: 2,
      position: new CANNON.Vec3(20, 10, 0),
      shape: new CANNON.Box(new CANNON.Vec3(3, 3, 3)),
    });

    world.addBody(body1);

    const boxMaterial2 = boxMaterial.clone();
    boxMaterial2.color.setHex(0x00ff00);
    const box2 = new THREE.Mesh(
      new THREE.BoxGeometry(10, 30, 10),
      boxMaterial2
    );
    box2.position.set(0, 15, 0);

    box2.castShadow = true;
    scene.add(box2);

    // 另一个刚体 用于box2
    const body2 = new CANNON.Body({
      mass: 1,
      shape: new CANNON.Box(new CANNON.Vec3(10, 30, 10)),
      position: new CANNON.Vec3(0, 15, 0),
    });

    body1.addEventListener("collide", (e: any) => {
      console.log("碰撞了");
      box.material.color.setHex(0xff0000);
    });

    world.addBody(body2);

    gui
      .add(body1.position, "x", -20, 20)
      .name("x坐标")
      .onChange(() => {
        box.position.x = body1.position.x;
      });

    // const twn = new TWEEN.Tween(box.position)
    //   .to({ x: -20 }, 4000)
    //   .easing(TWEEN.Easing.Linear.None)
    //   .repeat(Infinity)
    //   .yoyo(true)
    //   .onUpdate(() => {
    //     const nowX = Math.floor(box.position.x);
    //     console.log(box.position.x);
    //     gui.updateDisplay();
    //   })
    //   .start();

    function ani(time: number) {
      // stats.begin();
      /**
       * 方案一
       * 利用射线
       */

      //  box.material.color.setHex(0xffffff);
      // raycaster.set(box.position, new THREE.Vector3(-1, 0, 0).normalize());
      // const intersects = raycaster.intersectObject(box2);
      // if (intersects && intersects.length > 0) {
      //   if (intersects[0].distance < 10) {
      //      box.material.color.setHex(0xff0000);
      //   }
      // }

      // raycaster.set(box.position, new THREE.Vector3(1, 0, 0).normalize());
      // const intersects1 = raycaster.intersectObject(box2);
      // if (intersects1 && intersects1.length > 0) {
      //   if (intersects1[0].distance <10) {
      //     box.material.color.setHex(0xff0000);
      //   }
      // }

      /**
       * 方案二
       * 利用 THREE.Box3 包围盒检测
       */

      // const boundingBox1 = new THREE.Box3().setFromObject(box);
      // const boundingBox2 = new THREE.Box3().setFromObject(box2);
      // if (boundingBox1.intersectsBox(boundingBox2)) {
      //   box.material.color.setHex(0xff0000);
      // }else{
      //   box.material.color.setHex(0xffffff);
      // }
      world.step(1 / 60);

      
      box.position.x = body1.position.x;
      box2.position.x = body2.position.x;



       conrols.update();


      renderer.render(scene, camera);
     

      // TWEEN.update(time);

      // stats.end();
      requestAnimationFrame(ani);
    }
    requestAnimationFrame(ani);

    return () => {
      gui && gui.destroy();
    };
  }, [scene, camera, renderer]);

  return <canvas id="canvas" style={{ display: "block" }}></canvas>;
}
