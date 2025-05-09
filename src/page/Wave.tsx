import React, { useLayoutEffect } from "react";
import * as THREE from "three";
import useBasic from "../hooks/useBasic";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function Wave() {
  const { scene, camera, renderer } = useBasic();
  useLayoutEffect(() => {
    if (!renderer || !scene || !camera) {
      return;
    }
    scene.fog = new THREE.Fog(0x000000, 0, 600);
    camera.position.set(20, 60, 150);

    //  let r = 6;
    // for (r < 30; r <= 30; r += 6) {
    //   for (let i = 0; i < 2 * Math.PI; ) {
    //     list.push(Math.cos(i) * r, 0, Math.sin(i) * r);
    //     i += Math.PI / 10;
    //   }
    // }

    const buffer = new THREE.BufferGeometry();
    const list = [];
    const colors = [];

    for (let i = -10; i < 10; i++) {
      for (let j = -10; j < 10; j++) {
        list.push(i * 10, 0, j * 10);
        colors.push(1, 1, 1);
      }
    }

    buffer.setAttribute("position", new THREE.Float32BufferAttribute(list, 3));
    buffer.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 2,
      sizeAttenuation: true,
      transparent: true,
      opacity: 1,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true, // 👈 关键点，启用顶点颜色
      alphaMap: new THREE.TextureLoader().load("/smallplanet.png"),
      map: new THREE.TextureLoader().load("/smallplanet.png"),
    });
    const points = new THREE.Points(buffer, material);
    scene.add(points);

    // gsap.to(points.rotation, {
    //   duration: 20,
    //   y: Math.PI * 1.5,
    //   repeat: -1,
    //   ease: "none",
    // });

    const axes = new THREE.AxesHelper(200);
    scene.add(axes);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;

    const positions= points.geometry.attributes.position
    let count = points.geometry.attributes.position.count;
    console.log(count);
    const colorsAttr = points.geometry.attributes.color;
    function change(t: number) {
      for (let start = 0; start < count; ) {
        let n = start * 3;
        positions.array[n + 1] =
          Math.sin((n + 1) / 10 + t) * 5; // 你可以调节幅度和频率
        // 颜色随高度变化（这里简单用 y 值映射 RGB）
        const y = Math.sin(start / 10 + t) * 5;
        const r = 0.5 + 0.5 * Math.sin(t + start / 10);
        const g = 0.5 + 0.5 * Math.cos(t + start / 15);
       
        const b = 1.0 - Math.abs(y) / 10;
      
        colorsAttr.array[start * 3 + 0] = r;
        colorsAttr.array[start * 3 + 1] = g;
        colorsAttr.array[start * 3 + 2] = b;
        start += 1;
      }
      positions.needsUpdate = true;
      colorsAttr.needsUpdate = true;
    }
    let time = 0;
    function ani() {
      time += 0.05; // 时间推进，控制波动速度
      change(time); // 使用 time 做为角度偏移
      renderer.render(scene, camera);
      requestAnimationFrame(ani);
    }
    ani();
  }, [scene, camera, renderer]);

  return <canvas id="canvas" style={{ display: "block" }}></canvas>;
}
