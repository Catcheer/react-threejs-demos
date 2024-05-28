


import React, { useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
// import myJson from 'three/examples/fonts/helvetiker_regular.typeface.json'
import '../App.css';

import env from '../env.js';

function Target() {
  var canvasRef = useRef(0)
  useLayoutEffect(() => {
    if (canvasRef.current !== 1) {
      console.log(canvasRef.current)
      canvasRef.current = 1
      // const canvas = document.querySelector('#canvas')

      const RT_SIZE = 300;
      const RenderTarget = new THREE.WebGLRenderTarget(RT_SIZE, RT_SIZE)


      const Camera = new THREE.PerspectiveCamera(45, (window.innerWidth - env.nav_width) / window.innerHeight, 1, 1000);
      Camera.position.x = 2
      Camera.position.y = 2
      Camera.position.z = 2
      Camera.lookAt(0, 0, 0)


      const RTScene = new THREE.Scene()
      const RTLight = new THREE.DirectionalLight(0xffffff, 1.5)
      RTLight.position.set(0, 1, 1).normalize();
      RTScene.add(RTLight)

      const geometryTorus = new THREE.TorusGeometry(10, 3, 16, 100);
      const materialTorus = new THREE.LineBasicMaterial({ color: 0xff0000 })

      const Torus = new THREE.Mesh(geometryTorus, materialTorus)
      // const box1 = new THREE.BoxGeometry(1,1,1,1);

      // const l1 = new THREE.LineBasicMaterial({color:0x00ff00})
      // const m1 = new THREE.Mesh(box1,l1)
      // m1.position.set(1,2,2)
      // m1.scale.set(0.5,0.5,1)
      // RTScene.add(m1)

      Torus.scale.set(0.05, 0.05, 0.05)
      RTScene.add(Torus);



      const Scene = new THREE.Scene();

      const AmbientLight = new THREE.AmbientLight(0xffffff, 1.5);
      Scene.add(AmbientLight);

      const Light = new THREE.DirectionalLight(0xffffff, 1.5);
      Light.position.set(0, 1, 1).normalize();
      Scene.add(Light);

      // 向场景添加立方体
      const geometryBox = new THREE.BoxGeometry(1, 1, 1);
      const materialBox = new THREE.MeshStandardMaterial({
        color: 0xff9300, // 橙色
        map: RenderTarget.texture // 使用 RTScene 作为贴图，也就是会贴一张环面图
      });
      const Box = new THREE.Mesh(geometryBox, materialBox);
      Scene.add(Box);


      // const clock = new THREE.Clock();

      const Renderer = new THREE.WebGLRenderer({
        antialias: true // 开启消除锯齿
      });
      Renderer.setClearColor(0xffffff, 1.0); // 设置画布背景色
      Renderer.setPixelRatio(window.devicePixelRatio); // 设置屏幕像素比
      Renderer.setSize(window.innerWidth - env.nav_width, window.innerHeight);
      //   document.body.querySelector('#App').appendChild( Renderer.domElement ); // 把 canvas 元素放到 body 内
      document.querySelector('.App')?.appendChild(Renderer.domElement)

      //   Renderer.render(RTScene, Camera, RenderTarget); // 离屏渲染并存放到 RenderTarget 里
      // Renderer.render(Scene, Camera); // 渲染显示到屏幕上的场景

      Renderer.setRenderTarget(RenderTarget);
      Renderer.render(RTScene, Camera);
      Renderer.setRenderTarget(null); // change back to the canvas
      Renderer.render(Scene, Camera);

      // var preview:HTMLCanvasElement 

      const preview = document.getElementById('preview') as HTMLCanvasElement;

      //    const preview:HTMLCanvasElement = el!;

      const ctx = preview.getContext('2d');

      const buffer = new Uint8Array(RT_SIZE * RT_SIZE * 4);
      const clamped = new Uint8ClampedArray(buffer.buffer);

      Renderer.readRenderTargetPixels(RenderTarget, 0, 0, RT_SIZE, RT_SIZE, buffer); // 读取像素到 buffer
      const imageData = new ImageData(clamped, RT_SIZE, RT_SIZE); // 创建可供 canvas 使用的图像数据类型
      ctx?.putImageData(imageData, 0, 0); // 绘制到 canvas 中

      // const animation=() =>{
      //   Renderer.clear();

      //   Box.rotation.y += 0.01; // 让立方体沿着 y 轴不停的旋转

      //   Renderer.setRenderTarget(RenderTarget);
      //   Renderer.render(RTScene, Camera);
      //   Renderer.setRenderTarget(null); // change back to the canvas
      //   Renderer.render(Scene, Camera);
      //   requestAnimationFrame(animation); // 循环
      // }
      // animation()    
    }
  }, [])
  return (
    <div className="App"  >
      <canvas width={300} height={300} id="preview"></canvas>
    </div>
  );
}

export default Target