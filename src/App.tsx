import React,{useLayoutEffect,useRef} from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module'
import * as dat from 'dat.gui';

import directionalLight from './DirectionalLight'
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
// import myJson from 'three/examples/fonts/helvetiker_regular.typeface.json'
import './App.css';

function App() {
 
  useLayoutEffect(()=>{
   
  const canvas = document.querySelector('#canvas')

  const stats = new Stats();
  stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild( stats.dom );

  const gui = new dat.GUI();

  const width = canvas?.clientWidth||0
  const height = canvas?.clientHeight||0

  const scene = new THREE.Scene()
  // scene.background=new THREE.Color('#aaaaaa');
  // scene.fog = new THREE.Fog(0x000000,0,10000)

  const depth = 1400
  const fov = 75
  const distance = width/2/Math.tan(Math.PI/12)
  const zAxisNumber = Math.floor(distance-depth/2)
  const camera = new THREE.PerspectiveCamera(fov,width/height,0.1,30000)
  camera.position.set(0,0,100);
  const cameraTarget = new THREE.Vector3(0,0,0)
  camera.lookAt(cameraTarget)


  // const plane = new THREE.PlaneGeometry(10000,10000);
  // const planeMaterial = new THREE.MeshBasicMaterial({color:'#aaaaaa',side:THREE.DoubleSide});
  // const planeMesh = new THREE.Mesh(plane,planeMaterial)
  // planeMesh.rotateX(Math.PI/4);
  // planeMesh.rotateY(Math.PI/4);
  // planeMesh.rotateZ(Math.PI/4);
  // planeMesh.position.z=-300;
  // scene.add(planeMesh)

  const axes = new THREE.AxesHelper(200);
  scene.add(axes);

  const renderer = new THREE.WebGLRenderer({antialias:true,alpha:true})
  renderer.setSize(width,height)

  renderer.render(scene,camera)

 
  if(canvas){
     if(canvas.childNodes[0]){
      canvas.replaceChild(renderer.domElement,canvas.childNodes[0])
     }else{
      canvas.appendChild(renderer.domElement)
     }
  }
    
   
  
  let  geometry: THREE.SphereGeometry | undefined;

  new THREE.TextureLoader().load('/earth_bg.png',texture=>{
    console.log('texture',texture)
    // texture.wrapS = THREE.RepeatWrapping; 
    // texture.wrapT = THREE.RepeatWrapping;
    
    // texture.repeat.set(2,2);
    // texture.offset.set(0,0.5);
     geometry = new THREE.SphereGeometry(260,30,30)
    const material  = new THREE.MeshLambertMaterial({map:texture,side:THREE.DoubleSide})
    const mesh = new THREE.Mesh(geometry,material)
    scene.add(mesh)
    renderer.render(scene,camera)
  

    
  })

  
  gui.add(directionalLight, 'intensity', 0, 5.0).onChange(()=>{
    renderer.render(scene,camera)
  })

  const ambientLight = new THREE.AmbientLight(0xffffff,1)
  const light_rightBottom = new THREE.PointLight('#ff0000',500,300)
  light_rightBottom.position.set(0, 100, 20)
  
 const pointHelper = new THREE.PointLightHelper(light_rightBottom,20)
  scene.add(light_rightBottom)
  scene.add(ambientLight)
  scene.add(pointHelper)

  scene.add(directionalLight)
 


  const controls = new OrbitControls( camera, renderer.domElement );


  controls.addEventListener('change',(res)=>{
    // console.log(res)
    stats.begin();
    renderer.render(scene,camera)
    stats.end();
  })


  function rotateAnimate(){
    if(geometry){
      stats.begin()
      geometry.rotateX(Math.PI/360);
      geometry.rotateY(Math.PI/360);
      geometry.rotateZ(Math.PI/180);
      
      renderer.render(scene,camera)
      stats.end()
    }
    window.requestAnimationFrame(rotateAnimate)
   
  }
  // rotateAnimate();

  // window.requestAnimationFrame(rotateAnimate)

  
  },[])
  return (
    <div className="App"  id='canvas'>
       
    </div>
  );
}

export default App;
