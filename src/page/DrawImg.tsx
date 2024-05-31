
import { useLayoutEffect, useState } from "react"

import * as THREE from 'three';
import env from '../env.js';
function DrawImg() {
   
    useLayoutEffect(() => {
        const mycanvas: any = document.body.querySelector('#mycanvas') as HTMLCanvasElement
        // const myEl = document.body.querySelector('#myEl')
        if (mycanvas) {



            const cs = document.createElement('canvas')
            cs.width = 400
            cs.height = 400
            const csCtx = cs.getContext('2d');
            if (csCtx) {
                csCtx.fillStyle = '#eee'
                csCtx.font = "48px serif";
                // csCtx.textAlign="center"
            }
            csCtx?.fillText('someSthing', 40, 40)





            const scene = new THREE.Scene();

            const l1 = new THREE.PointLight(0xffffff, 1, 20)
            l1.position.set(0, 0, 2)
            scene.add(l1)
            const light = new THREE.AmbientLight('#fff', 1)
            light.position.set(window.innerWidth / 2, window.innerHeight / 2, 5)
            scene.add(light)

            const l2 = new THREE.DirectionalLight('#fff', 1000)
            l2.position.set(0, 0, 15)
            l2.scale.set(10, 10, 10)
            scene.add(l2)


            const box = new THREE.BoxGeometry(1, 1, 1, 1);
            const textarea = new THREE.CanvasTexture(cs)
            const mater = new THREE.MeshPhongMaterial({ map: textarea, color: 'blue' })
            const cube = new THREE.Mesh(box, mater)
            cube.rotateX(90)
            cube.rotateY(90)
            cube.castShadow = true
            scene.add(cube)

            const camera = new THREE.PerspectiveCamera(45, (window.innerWidth - env.nav_width) / window.innerHeight, 1, 1000)
            camera.position.z = 10;


            const render = new THREE.WebGLRenderer({ canvas: mycanvas, antialias: true })
            render.setSize(window.innerWidth - env.nav_width, window.innerHeight)
            render.render(scene, camera)


            const ctx = mycanvas.getContext('3d')
            console.log(mycanvas)
            console.log(ctx)


        }




    }, [])


    return <div id="myEl">
        <canvas id="mycanvas"></canvas>
    </div>
}

export default DrawImg