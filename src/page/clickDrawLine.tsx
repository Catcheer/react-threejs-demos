import React, { useLayoutEffect, useRef, useState } from 'react'
import * as THREE from 'three';

import useBasic from '../hooks/useBasic';

import env from '../env.js';


function ClickDrawLine() {

    let { scene, renderer } = useBasic()

    useLayoutEffect(() => {
        if (!renderer || !scene) {
            return
        }
        const myCanvas = document.getElementById('canvas') as HTMLCanvasElement
        let camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100)
        camera.position.set(0, 0, 10);//
        camera.lookAt(0, 0, 0);//指向坐标原点

        // const points: number[] = []
        // const MAX_POINTS = 0
        let i = 0;

        function makeLine() {
            const positions = new Float32Array(0)
            const geometry = new THREE.BufferGeometry()
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

            geometry.setDrawRange(0, 0)

            const line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0xffffff }))
            scene.add(line)
        }
        makeLine()

        myCanvas.addEventListener('click', (e) => {
            const line: THREE.Line = scene.children[scene.children.length - 1]
            console.log(scene.children)
            console.log(line)
            const positionAttribute = line.geometry.getAttribute('position') || []

            const { clientX, clientY } = e
            let x = clientX - env.nav_width
            let y = clientY
            let pX = -1 + 2 * x / myCanvas.clientWidth
            let pY = 1 - 2 * y / myCanvas.clientHeight
            console.log(Array.from(positionAttribute.array))
            const points: number[] = [...Array.from(positionAttribute.array)]
            points.push(pX, pY, 0)
            // console.log(points)
            const geometry = line.geometry
            geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(points), 3))

            // // positionAttribute.setXYZ(i, pX, pY, 0)
            positionAttribute.needsUpdate = true
            i++
            geometry.setDrawRange(0, i)


        })


        myCanvas.addEventListener('contextmenu', (e) => {
            i = 0;
            makeLine()
            e.preventDefault()
        })



        function ani() {
            renderer.render(scene, camera)
            requestAnimationFrame(ani)
        }
        ani()


    }, [scene])

    return <div style={{ position: 'relative' }}>
        <span style={{ position: 'absolute', color: 'white' }}>鼠标点击画线，右键结束当前画线开启新新线</span>
        <canvas id="canvas" style={{ 'display': 'block' }}></canvas>
    </div>
}


export default ClickDrawLine