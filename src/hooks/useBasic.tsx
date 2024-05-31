import React, { useEffect, useLayoutEffect, useState, useRef } from 'react'
import * as THREE from 'three';

import env from '../env.js';


function useBasic(): any {
 
   let [renderer,setRenderer] =useState<THREE.WebGLRenderer>()
    let [scene,setScene] = useState<THREE.Scene>()
    let [camera,setCamera] = useState<THREE.PerspectiveCamera>()
 
  useLayoutEffect(() => {
    const canvasP = document.querySelector('#canvas') as HTMLElement


   let scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.Fog(0x000000, 0, 200);


   let camera = new THREE.PerspectiveCamera(75, (window.innerWidth - env.nav_width) / window.innerHeight, 0.1, 1000);

   let renderer = new THREE.WebGLRenderer({
      canvas: canvasP as HTMLCanvasElement,
      antialias: true
    });




    renderer.setPixelRatio(window.devicePixelRatio);


    renderer.setSize(window.innerWidth - env.nav_width, window.innerHeight);


    camera.position.set(0, 0, 30);

   
    setScene(scene)
    setCamera(camera)
    setRenderer(renderer)

    console.log('-------------------------------------------------------------',renderer)

  },[])







  console.log('scene', scene)

  return {
    scene,
    camera,
    renderer
  }

}

export default useBasic