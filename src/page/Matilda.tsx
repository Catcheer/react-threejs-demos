


import React, { useLayoutEffect, useRef } from 'react';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import useBasic from '../hooks/useBasic';
import ambientLight from './lights/AmbientLight'
// import PlaneLand from './land/PlaneLand'
function Matilda(){


    const { scene, camera, renderer } = useBasic();

    useLayoutEffect(() => {
        if (!renderer || !scene || !camera) {
            return
        }

        scene.fog = new THREE.Fog(0x000000, 0, 1000);
        camera.position.set(0, 0, 180)
        ambientLight.intensity =0.1
     
        scene.add(ambientLight)
        const glfLoader = new GLTFLoader();
        glfLoader.load('mods/matilda.glb',(glf)=>{
            const mesh = glf.scene.children[0]
            mesh.position.set(0,-100,0)
            encircleBox(mesh)
            scene.add(glf.scene)
            camera.lookAt(0,0,0)
            // renderer.render(scene, camera)
           
          })

       
        const controls = new OrbitControls(camera, renderer.domElement) 
        controls.addEventListener('change', () => {})

        function encircleBox(mesh:any){
            const box3 = new THREE.Box3().setFromObject(mesh)
            const v3 = new THREE.Vector3()
            box3.getSize(v3)
         
            const box = new THREE.BoxGeometry(v3.x,v3.y,v3.z)
            const material = new THREE.MeshBasicMaterial({
                color:0xffffff,
                wireframe:true
            })
            const mesh2 = new THREE.Mesh(box,material)
            // mesh2.position.copy(mesh.position)
            scene.add(mesh2)
        }

        const axesHelper = new THREE.AxesHelper(200)

        scene.add(axesHelper)


        // const loader = new THREE.TextureLoader()
        // loader.load('/1120.jpg',(texture)=>{
        //     console.log(texture)
        //     scene.background = texture
        // })

        scene.background = new THREE.CubeTextureLoader()
	.setPath( './cubeMaps/' )
	.load( [
				'posx.jpg',
				'negx.jpg',
				'posy.jpg',
				'negy.jpg',
				'posz.jpg',
				'negz.jpg'
			] );


        function ani(){
            renderer.render(scene, camera)
            requestAnimationFrame(ani)
        }

        ani()

    }, [scene])

    

    return <canvas id="canvas" style={{ 'display': 'block' }}>

    </canvas>
}


export default Matilda