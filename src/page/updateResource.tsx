import React, { useLayoutEffect, useRef, useState } from 'react'
import * as THREE from 'three';

import useBasic from '../hooks/useBasic';

function UpdateResource() {
    let { scene, camera, renderer } = useBasic()

    useLayoutEffect(() => {
        if (!renderer || !scene || !camera) {
            return
        }

        const MAX_POINTS = 500;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(MAX_POINTS * 3)
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

        let drawCount = 2

        geometry.setDrawRange(0, drawCount)

        const material = new THREE.LineBasicMaterial({ color: 0xff0000 })

        const line = new THREE.Line(geometry, material)
        scene.add(line)

        let x = 0, y = 0, z = 0;
        const positionAttribute = line.geometry.getAttribute('position')

        console.log(positionAttribute)

        for (let i = 0; i < positionAttribute.count; i++) {
            positionAttribute.setXYZ(i, x, y, z);

            x += (Math.random() - 0.5) * 5;
            y += (Math.random() - 0.5) * 5;
            z += (Math.random() - 0.5) * 10;
        }


        // function ani(){
        //     renderer.render(scene, camera)
        //         requestAnimationFrame(ani)
        //        if(drawCount < MAX_POINTS){
        //             drawCount++
        //         }
        //         line.geometry.setDrawRange( 0, drawCount );
        // }
        // ani()

        const timer = setInterval(() => {
            renderer.render(scene, camera)
            if (drawCount < MAX_POINTS) {
                drawCount++
                line.geometry.setDrawRange(0, drawCount);
            }else{
                clearInterval(timer)
            }
            
        }, 1000)

        return () => {
            if(timer){
                clearInterval(timer)
            }
        }

    }, [scene])

    return <canvas id="canvas" style={{ 'display': 'block' }}>

    </canvas>
}

export default UpdateResource;