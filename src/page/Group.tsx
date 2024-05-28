import { useLayoutEffect,useState } from "react"

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import env from '../env.js';
function Group(){

    useLayoutEffect(()=>{
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth-env.nav_width,window.innerHeight)
        const camera = new THREE.PerspectiveCamera(75,(window.innerWidth-env.nav_width)/window.innerHeight,0.1,1000)
        camera.position.set(0,0,100)
        const scene = new THREE.Scene()
        // scene.background('#aaaaaa')
      
        const material = new THREE.MeshBasicMaterial({color:'#dddddd'})

        const group = new THREE.Group()

        let n = 10;
        let R = 50;
        const space = 2*Math.PI/n;

        for(let i =0; i < n;i++){
            const spher = new THREE.SphereGeometry(3,32,32)
            const mesh = new THREE.Mesh(spher,material)
            const ang = space*i;
            const x = Math.cos(ang)*R;
            const y = Math.sin(ang)*R;
            mesh.position.x=x;
            mesh.position.y=y;

            group.add(mesh)
        }

       
        scene.add(group)

     
      
        const controls = new OrbitControls( camera, renderer.domElement );


        function init(){
            let n = Math.ceil(Math.random()*255)
            // console.log(n)
            material.color =new THREE.Color(255,0,0 )
            renderer.render(scene,camera)
            requestAnimationFrame(init)
        }
        init()

        


        document.querySelector('#group')?.appendChild(renderer.domElement)

    },[])


    return <div id="group"></div>
}

export default Group