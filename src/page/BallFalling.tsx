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
export default function BallFalling() {
  const { scene, camera, renderer } = useBasic();

  const Y_DOWN = 0;
  const RADIUS = 1;

  useLayoutEffect(() => {
    if (!renderer || !scene || !camera) {
      return;
    }

    const skyTexture = new THREE.TextureLoader().load("/sky1.jpg",function(texture){
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT  = THREE.RepeatWrapping;
      // texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      // texture.offset.x =50 
    });
    
    renderer.shadowMap.enabled = true;
    scene.background = skyTexture;
    console.log('scene',scene.background)
    scene.fog = new THREE.Fog('rgb(169, 191, 207)', 0, 1000);
    scene.castShadow = true;
    camera.position.set(0, 10, 50);
    camera.lookAt(0,0, 0);
   

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const pLight = new THREE.PointLight(0xffffff, 30);
    pLight.castShadow = true;
    pLight.position.set(0, 0, 35);
    scene.add(pLight);
    const pLightHelper = new THREE.PointLightHelper(pLight);
    scene.add(pLightHelper);

    const direLight = new THREE.DirectionalLight(0xffffff, 1);
    direLight.position.set(10, 30, 0);

    direLight.castShadow = true;
    direLight.shadow.mapSize.width = 1024;
    direLight.shadow.mapSize.height = 1024;
    direLight.shadow.camera.top = 50;
    direLight.shadow.camera.bottom = -50;
    direLight.shadow.camera.left = -50;
    direLight.shadow.camera.right = 50;
    scene.add(direLight);

    const floorTexture = new THREE.TextureLoader().load("/floor/1.png",(texture)=>{
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    });
    floorTexture.repeat.set(100, 100);
    const planeGeo = new THREE.PlaneGeometry(2000, 2000);
    const planeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      bumpScale: 0.05,
      map: floorTexture,
      aoMap: new THREE.TextureLoader().load("/floor/2.png"),
    });
    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = Y_DOWN;
    plane.receiveShadow = true;
    scene.add(plane);

    const spGeo = new THREE.SphereGeometry(RADIUS, 32, 32);
    const spMat = new THREE.MeshStandardMaterial({
      color: "#ff9b00",
    });
    const sphere = new THREE.Mesh(spGeo, spMat);
    sphere.position.set(0, 10, 30);
    sphere.castShadow = true;
    scene.add(sphere);

    let  ball:THREE.Object3D |null =null;
    const glLoader = new GLTFLoader();
    glLoader.load(
      "/pingpangqiu2.glb",
      (gltf) => {
         ball = gltf.scene.children[0];
     
        ball.position.set(sphere.position.x, sphere.position.y, sphere.position.z);
        ball.castShadow = true;
        scene.add(ball);
      },
      undefined,
    )



    pLight.position.y = sphere.position.y + 5;

    const controls = new OrbitControls(camera, renderer.domElement);

    const world = new CANNON.World();
    world.gravity.set(0, -9.82, 0);
    const ballMaterial = new CANNON.Material("ballMaterial");
    const floorMaterial = new CANNON.Material("floorMaterial");

    const contactMaterial = new CANNON.ContactMaterial(
      ballMaterial,
      floorMaterial,
      {
        friction: 0.01,
        restitution: 0.9, // 高弹性
      }
    );
    world.addContactMaterial(contactMaterial);

    const body = new CANNON.Body({
      mass: 0.0027, // 真实质量
      material: ballMaterial,
      position: new CANNON.Vec3(
        sphere.position.x,
        sphere.position.y,
        sphere.position.z
      ),
      shape: new CANNON.Sphere(RADIUS),
    });

    world.addBody(body);

    // 刚体地板
    const floorBody = new CANNON.Body({
      mass: 0,
      material: floorMaterial,
      shape: new CANNON.Plane(),
    });
    floorBody.quaternion.setFromAxisAngle(
      new CANNON.Vec3(1, 0, 0),
      -Math.PI / 2
    );
    floorBody.position.y = Y_DOWN;
    world.addBody(floorBody);

    function ani(time: number) {
      // stats.begin();

      world.step(1 / 60);
      sphere.position.x = body.position.x;
      sphere.position.y = body.position.y;
      sphere.position.z = body.position.z;

    if(ball){
        ball.position.x = body.position.x;
      ball.position.y = body.position.y;
      ball.position.z = body.position.z;
    }

      pLight.position.y = sphere.position.y + 5;
      renderer.render(scene, camera);

      // TWEEN.update(time);
      controls.update();
      // stats.end();
      requestAnimationFrame(ani);
    }
    requestAnimationFrame(ani);
  }, [scene, camera, renderer]);

  return <canvas id="canvas" style={{ display: "block" }}></canvas>;
}
