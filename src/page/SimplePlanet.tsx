import React, { useLayoutEffect } from "react";
import * as THREE from 'three';
import useBasic from '../hooks/useBasic';
import gsap from "gsap";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
function SimplePlanet(props: any) {
  let { scene, camera, renderer } = useBasic()

  useLayoutEffect(() => {
    if (!renderer || !scene || !camera) {
      return
    }
    scene.fog = new THREE.Fog(0x000000, 0, 600);
    camera.position.set(0, 0, 300);

    //小行星
    let list = []
    const geometry = new THREE.BufferGeometry()
    for (let i = 0; i < 200; i++) {
      const v3 = new THREE.Vector3(Math.random() * 800 - 400, Math.random() * 800 - 400, Math.random() * 800 - 400)
      list.push(v3.x, v3.y, v3.z)

    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(list, 3))
    const material = new THREE.PointsMaterial({
      size: 2,
      sizeAttenuation: true,
      transparent: true,
      side: THREE.BackSide,
      alphaMap: new THREE.TextureLoader().load('/smallplanet.png'),
      map: new THREE.TextureLoader().load('/smallplanet.png')
    })
    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // 添加发光柱体
    const lightRectMat = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load('/tiao.png'),
      color: 0xffffff,
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide
    })

    const shuanghuanMat = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load('/shuanghuan.png'),
      color: 0xffffff,
      transparent: true,
      opacity: 1,
      alphaMap: new THREE.TextureLoader().load('/shuanghuan.png')
      // side: THREE.DoubleSide
    })




    //经纬度转3d坐标
    function latLon2xyz(lat: number, lon: number, radius: number) {
      const phi = (90 - lat) * Math.PI / 180
      const theta = (180 - lon) * Math.PI / 180
      return new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      )
    }


    let sp = new THREE.SphereGeometry(80, 32, 32)
    const mat1 = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load('/earth_bg.png'),
      transparent: true,
      opacity: 1
    })

    const mesh1 = new THREE.Mesh(sp, mat1)
    scene.add(mesh1)

console.log(gsap)

    function createShuanghuanMesh() {
      const shuanghuanGemo = new THREE.PlaneGeometry(16, 16)
      const shuanghuanMesh = new THREE.Mesh(shuanghuanGemo, shuanghuanMat)

    

      gsap.to(shuanghuanMesh.scale, {
        x: 1.3,
        y: 1.3,
        z: 1,
        runBackwards: true,
        delay:Math.random(),
        duration: 3,
        repeat: -1,
        ease: 'none',
        startAt: { x:1,y: 1,z:1 },
        yoyoEase: true
      })
     
      return shuanghuanMesh
    }

    function createLightMesh() {
      const lightGemo = new THREE.PlaneGeometry(10, 85)
      const lightMesh = new THREE.Mesh(lightGemo, lightRectMat)
      lightMesh.add(lightMesh.clone().rotateY(Math.PI / 2))
     const shuanghuanMesh = createShuanghuanMesh()
     shuanghuanMesh.rotateX(-Math.PI / 2)
    //  shuanghuanMesh.position.set(0,0,0);
     lightMesh.add(shuanghuanMesh)
      return lightMesh
    }
    for (let i = 0; i < 20; i++) {
      const lat = Math.random() * 180 - 90
      const lon = Math.random() * 360 - 180
      const radius = 80
      const v3 = latLon2xyz(lat, lon, radius)
      let lightClone = createLightMesh()
      lightClone.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), v3.clone().normalize())
      lightClone.translateOnAxis(mesh1.up, 80)
      scene.add(lightClone)
    }



    console.log(scene)

    gsap.to(points.rotation, {
      y: 2 * Math.PI,
      duration: 100,
      repeat: -1,
      ease: 'none'
    })

    const axes = new THREE.AxesHelper(200);
    scene.add(axes);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    function ani() {
      renderer.render(scene, camera)
      requestAnimationFrame(ani)
    }
    ani()
  }, [scene, camera, renderer])







  return (
    <canvas id="canvas" style={{ 'display': 'block' }}></canvas>
  );
}


export default SimplePlanet;