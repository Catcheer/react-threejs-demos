import React from 'react'
import { useEffect, useLayoutEffect } from 'react'
import * as THREE from 'three';
// 引入轨道控制器扩展库OrbitControls.js
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
function BufAttribute() {

    useLayoutEffect(() => {
        const canvas = document.getElementById('BufCanvas') as HTMLCanvasElement;
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.set(0, 0, 2)
        camera.lookAt(0, 0, 0);

        // const arr = new Float32Array([
        //     -0.5, -0.5, 0, //顶点1坐标
        //     0.5, -0.5, 0, //顶点2坐标
        //     0.5, 0.5, 0, //顶点3坐标
        //     0.5, 0.5, 0, //顶点3坐标
        //     -0.5, 0.5, 0, //顶点4坐标
        //     -0.5, -0.5, 0, //顶点1坐标

        //     -0.5, -0.5, 0, //顶点1坐标
        //     0.5, -0.5, 0,
        //     0.5, -0.5, -1,
        //     0.5, -0.5, -1,
        //     -0.5, -0.5, -1,
        //     -0.5, -0.5, 0

        // ])


        const arr1 = new Float32Array([
            -0.5, -0.5, 0, //顶点1坐标
            0.5, -0.5, 0, //顶点2坐标
            0.5, 0.5, 0, //顶点3坐标
            -0.5, 0.5, 0
        ])

        const index = new Uint16Array([
            0, 1, 2,
            2, 3, 0

        ])


        const attrs = new THREE.BufferAttribute(arr1, 3);
        console.log(attrs);

        const geometry = new THREE.BufferGeometry();
        geometry.index = new THREE.BufferAttribute(index, 1);
        geometry.attributes.position = attrs;

        const material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            side: THREE.DoubleSide
            // wireframe:true
        });

        const mesh = new THREE.Mesh(geometry, material);
        const mesh1 = mesh.clone()
        mesh1.rotateY(-Math.PI /2)
        
        const material1 = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            side: THREE.DoubleSide
            // wireframe:true
        });
        mesh1.material = material1;
        scene.add(mesh);
        scene.add(mesh1);

        // // 点渲染模式
        // const material = new THREE.PointsMaterial({
        //     color: 0xff0000,
        //     size: 0.02 //点对象像素尺寸
        // }); 
        //         const points = new THREE.Points(geometry,material)

        //         console.log(points);
        //         scene.add(points);


        // // 线材质对象
        // const material = new THREE.LineBasicMaterial({
        //     color: 0xff0000 //线条颜色
        // });
        // // 创建线模型对象
        // const line = new THREE.LineLoop(geometry, material);
        // scene.add(line);

        function render() {
            renderer.render(scene, camera);
        }
        
        const controls = new OrbitControls(camera, renderer.domElement);


        controls.addEventListener('change', (res) => {
            console.log(res)
            renderer.render(scene, camera)

        })

        // let i =0;
        let cancelFlag:number = 0
        let isAniing:boolean = true
        function ani(){
            mesh.rotation.y +=  Math.PI/60;
            mesh1.rotation.y +=  Math.PI/60;
            render()
            cancelFlag=  requestAnimationFrame(ani)
        }
        ani()



        document.body.addEventListener('click',function(){
            if(isAniing){
                cancelAnimationFrame(cancelFlag)
                isAniing=false
            }else{
                ani()
                isAniing=true
            }
           
        })

    }, [])



    return (
        <div>
            <canvas id='BufCanvas' width={600} height={600}></canvas>
        </div>
    )
}

export default BufAttribute