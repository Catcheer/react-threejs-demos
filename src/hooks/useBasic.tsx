import React, { useEffect, useLayoutEffect, useState ,useRef} from 'react'
import * as THREE from 'three';


function useBasic():any {

  
   
    
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);
        scene.fog = new THREE.Fog(0x000000, 0, 200);


        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        const renderer = new THREE.WebGLRenderer({
            // canvas: canvas as HTMLCanvasElement,
            antialias: true
        });

        


        renderer.setPixelRatio(window.devicePixelRatio);


        renderer.setSize(window.innerWidth, window.innerHeight);


        camera.position.set(0,0,30);

       

       
        
   


    console.log('scene',scene)
   
    return {
      scene,
      camera,
      renderer
    }

}

export default useBasic