import { useLayoutEffect } from "react";
import * as THREE from 'three';
import useBasic from '../hooks/useBasic';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function Sprite() {
    let { scene, camera, renderer } = useBasic()
    console.log(scene, camera, renderer)

    useLayoutEffect(() => {
        if(!renderer || !scene || !camera ){
            return 
        }
        function loadMap(path:string) {
            return new Promise((resolve, reject) => {
                new THREE.TextureLoader().load(path, texture => {
                    resolve(texture)
                })
            })
        }

        const group = new THREE.Group();
        let planeMeshSky :THREE.Mesh | undefined
        async function mapObj() {
            const texture: any = await loadMap('/xuehua.png')
            const spriteMaterial = new THREE.SpriteMaterial({
                // color: 0xff0000,
                map: texture,


            })
            // const sprite = new THREE.Sprite(spriteMaterial)
            createSprites(spriteMaterial)
            scene?.add(group)
            camera.position.z = 30
            changePos()
            await  land()
            await sky()
           renderer?.render(scene, camera)
            // const canvasP = document.querySelector('#canvas') as HTMLElement
            // canvasP?.appendChild(renderer?.domElement)

        }

        function createSprites(spriteMaterial: any) {
            for (let i = 0; i < 16000; i++) {
                // 精灵模型共享材质
                const sprite = new THREE.Sprite(spriteMaterial);
                group.add(sprite);
                sprite.scale.set(1, 1, 1);
                // 设置精灵模型位置，在长方体空间上上随机分布
                const x = 1000 * (Math.random() - 0.5);
                const y = 600 * Math.random();
                const z = 100 * (Math.random() - 0.5);
                sprite.position.set(x, y, z)
            }
        }

        function changePos() {
            const clock = new THREE.Clock();
            function loop() {
                // loop()两次执行时间间隔
                const t = clock.getDelta();
             
                group.children.forEach(sprite => {
                    // 雨滴的y坐标每次减t*60
                    sprite.position.y -= t * 30;
                    if (sprite.position.y < -30) {
                        sprite.position.y = 600 * Math.random();
                    }
                });
                renderer?.render(scene, camera)
                requestAnimationFrame(loop);
            }
            loop();
        }


        mapObj()


       async function land(){
            const plane = new THREE.PlaneGeometry(1000, 1000, 100, 100);

            const mat:any = await loadMap('/xuedi1.png')

            const planeMaterial = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: mat,
            })
            const planeMesh = new THREE.Mesh(plane, planeMaterial)
            scene?.add(planeMesh)
            planeMesh.rotation.x = -Math.PI / 2
            planeMesh.position.y = -30
            
        }

        async function sky(){
           let  plane = new THREE.PlaneGeometry(600, 200, 100, 100);

            const mat:any = await loadMap('/sky2.png')

            const planeMaterial = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: mat,
            })
             planeMeshSky = new THREE.Mesh(plane, planeMaterial)
            scene?.add(planeMeshSky)
            // planeMesh.rotation.x = -Math.PI / 2
            planeMeshSky.position.y = 60
            planeMeshSky.position.z = -100
            
        }
        const controls = new OrbitControls( camera, renderer.domElement );
        console.log(controls)
        
    }, [camera,renderer,scene]
    )
    return (
        <canvas id="canvas" style={{'display':'block'}}>

        </canvas>
    )
}


export default Sprite;