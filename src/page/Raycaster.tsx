import React, { useLayoutEffect } from 'react'
import * as THREE from 'three';
// import { Button } from 'antd'
// import TWEEN from '@tweenjs/tween.js';
import useBasic from '../hooks/useBasic';

import directionalLight from './DirectionalLight'

function Raycaster() {
    let { scene, camera, renderer } = useBasic()

    useLayoutEffect(() => {

        // const ray = new THREE.Ray()
        // ray.origin.set(10, 10, 10)
        // ray.direction.set(1, 1, 1).normalize()
        // console.log('ray', ray)

        const raycaster = new THREE.Raycaster();
        raycaster.ray.origin.set(-100, 0, 0);
        raycaster.ray.direction.set(1, 0, 0).normalize();



        const geometry = new THREE.SphereGeometry(25, 50, 50);
        const material = new THREE.MeshLambertMaterial({
            color: 0x009999,
        });
        const mesh1 = new THREE.Mesh(geometry, material);
      
        const mesh2 = mesh1.clone();
        mesh2.position.y = 100;
        const mesh3 = mesh1.clone();
        mesh3.position.x = 100;
        const model = new THREE.Group();
        // 三个网格模型mesh1,mesh2,mesh3用于射线拾取测试
        model.add(mesh1, mesh2, mesh3);
        model.updateMatrixWorld(true);

        scene.add(model);
        directionalLight.intensity =10
        scene.add(directionalLight)
        camera.position.z= 150


      const results =   raycaster.intersectObjects([model])
      console.log('results',results)

      if (results.length > 0) {
        // 选中模型的第一个模型，设置为红色
        let obj:THREE.Mesh = {...results[0].object} as THREE.Mesh
        let material = obj.material as THREE.MeshLambertMaterial
        material.color.set(0xff0000)
        
    }

        renderer?.render(scene, camera)

        document.querySelector('#canvas')?.appendChild(renderer?.domElement)
    }, [scene, camera, renderer ])
    return (
        <div id='canvas'></div>
    )
}

export default Raycaster