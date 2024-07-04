import React, { useLayoutEffect, useRef, useState } from 'react'
import * as THREE from 'three';

import useBasic from '../hooks/useBasic';

import env from '../env.js';


function ClickDrawLine1() {

    let { scene, renderer } = useBasic()
    const lineGroup :THREE.Group= new THREE.Group()
    useLayoutEffect(() => {
        if (!renderer || !scene) {
            return
        }
        const myCanvas = document.getElementById('canvas') as HTMLCanvasElement
        let camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100)
        camera.position.set(0, 0, 10);//
        camera.lookAt(0, 0, 0);//指向坐标原点

       
      
        
       
       scene.add(lineGroup)
        makeLine()

       const sphere = smallBoll()
        scene.add(sphere)

        myCanvas.addEventListener('click', (e: MouseEvent) => {
            const line = lineGroup.children[lineGroup.children.length - 1] as THREE.Line
          
            const positionAttribute = line.geometry.getAttribute('position') || []

            const [pX,pY] = getPos(e)
           
         
            const points: number[] = [...Array.from(positionAttribute.array)]
            points.push(pX, pY, 0)
        
            const geometry = line.geometry
            geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(points), 3))

        
            positionAttribute.needsUpdate = true
       
            geometry.setDrawRange(0, (points.length)/3)
         
            points.push(pX, pY, 0)
            geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(points), 3))

            const sphere1 = smallBoll()
            sphere1.position.set(pX, pY, 0)
            scene.add(sphere1)
        })


        myCanvas.addEventListener('mousemove', (e) => {
            
            const line = lineGroup.children[lineGroup.children.length - 1] as THREE.Line
          
            const positionAttribute = line.geometry.getAttribute('position') || []

            const [pX,pY] = getPos(e)
           
         
            const points: number[] = [...Array.from(positionAttribute.array)]
            points[points.length - 3] =pX
            points[points.length - 2] =pY
        
            const geometry = line.geometry
            geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(points), 3))

        
            positionAttribute.needsUpdate = true
          
            geometry.setDrawRange(0,  (points.length)/3)
           
            sphere.position.set(pX, pY, 0)
          
        })


        myCanvas.addEventListener('contextmenu', (e) => {
            const line = lineGroup.children[lineGroup.children.length - 1] as THREE.Line
          
            const positionAttribute = line.geometry.getAttribute('position') || []
            const points: number[] = [...Array.from(positionAttribute.array)]
            if(points.length/3>0){
                points.length = points.length -1
            }
            const geometry = line.geometry
            geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(points), 3))

            makeLine()
            e.preventDefault()
        })

        myCanvas.addEventListener('mouseleave', (e) => {
            sphere.position.set(-100, 0, 0)
        })


        function ani() {
            renderer.render(scene, camera)
            requestAnimationFrame(ani)
        }
        ani()


    }, [scene])


    const   getPos=(e:MouseEvent)=>{
        const myCanvas = document.getElementById('canvas') as HTMLCanvasElement
        const { clientX, clientY } = e
        let x = clientX - env.nav_width
        let y = clientY
        let pX = -1 + 2 * x / myCanvas.clientWidth
        let pY = 1 - 2 * y / myCanvas.clientHeight

        return [pX,pY]
    }

    const  makeLine=() =>{
        const positions = new Float32Array(0)
        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

        geometry.setDrawRange(0, 0)

        const line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0xffffff }))
        lineGroup.add(line)
    }

    const smallBoll= ()=>{
        const geometry = new THREE.SphereGeometry(0.01, 32, 32)
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff })
        const sphere = new THREE.Mesh(geometry, material)
        sphere.position.set(-100, 0, 0)
        return sphere
    }


    return <div style={{ position: 'relative' }}>
        <span style={{ position: 'absolute', color: 'white' }}>鼠标点击画线，右键结束当前画线开启新新线</span>
        <canvas id="canvas" style={{ 'display': 'block' }}></canvas>
    </div>
}


export default ClickDrawLine1