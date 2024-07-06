
import React, { useLayoutEffect, useRef, useState } from 'react'
import * as THREE from 'three';

import useBasic from '../hooks/useBasic';

import env from '../env.js';
function Matrixtransformations(){

    let { scene, renderer ,camera} = useBasic()

    useLayoutEffect(() => {
        if (!renderer || !scene) {
            return
        }

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshNormalMaterial();
        const mesh = new THREE.Mesh(geometry,material)
        
        // mesh.matrixAutoUpdate = false
        // mesh.position.set(10,0,0)
        // mesh.updateMatrix()

        // const v3 = new THREE.Vector3(0,0,0)
        // v3.add(new THREE.Vector3(10,0,0))
        // console.log(v3)

        // let mat4 = new THREE.Matrix4()

        // mat4 =    mesh.matrix.copy(mesh.matrix)
       
        // mat4.multiplyMatrices(mesh.matrix,mat4)
        // console.log(mat4)

        mesh.matrix.setPosition(new THREE.Vector3(10,0,0))
        mesh.matrixAutoUpdate = false

        scene.add(mesh)

        function ani(){
            renderer.render(scene, camera)
            requestAnimationFrame(ani)
        }
        ani()

        
    },[scene])


    return <canvas id="canvas" style={{ 'display': 'block' }}></canvas>
}


export default Matrixtransformations;