import React,{useLayoutEffect,useRef} from 'react';
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
// import myJson from 'three/examples/fonts/helvetiker_regular.typeface.json'
import './App.css';

function App() {
  var canvasRef = useRef(0)
  useLayoutEffect(()=>{
    if(canvasRef.current!==1){
      console.log(canvasRef.current)
  //   const canvas = document.querySelector('#canvas')
  //   canvasRef.current = 1
  //   console.log(canvas)
  //   console.log(THREE)

  //   const scene = new THREE.Scene();
  //   scene.background = new THREE.Color('#eee');
    

  //   const camera = new THREE.PerspectiveCamera(50,window.innerWidth/window.innerHeight,0.1,10000)

  //   camera.position.set( 0, - 400, 600 );

  //   const renderer = new THREE.WebGLRenderer({antialias:true})
  //   renderer.setSize(window.innerWidth,window.innerHeight)
  //   renderer.setPixelRatio( window.devicePixelRatio );
   

   

  //   canvas?.appendChild(renderer.domElement)

  //   const consorl = new OrbitControls(camera, renderer.domElement);
  //   consorl.target.set(0,0,0);
  //   consorl.update();

  //   const animate=()=> {
  //     requestAnimationFrame(animate);
  //     renderer.render(scene,camera);
  // }
  // animate();
  
  //   renderer.render(scene,camera)


    
  // const loader = new FontLoader();

  // console.log(myJson)

  // const font = loader.parse(myJson)
  // console.log('font',font)

  // const color = new THREE.Color(0x006699);
  // const matLite = new THREE.MeshBasicMaterial({
  //     color: color,
  //     transparent: true,
  //     opacity: 0.4,
  //     side: THREE.DoubleSide,
  
      
  // });
  // const message = '   Three.js\nSimple text...';
  // const shapes = font.generateShapes(message, 100);
  // const geometry = new THREE.ShapeGeometry(shapes);
  // geometry.computeBoundingBox();
  // if(geometry.boundingBox){
  //   const xMid = - 0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
  //   geometry.translate(xMid, 0, 0);
  // }
  
  
  
  // const text = new THREE.Mesh(geometry, matLite);
  // text.position.z = -150;
  // scene.add(text);
  const canvas = document.querySelector('#canvas')

  const width = canvas?.clientWidth||0
  const height = canvas?.clientHeight||0

  const scene = new THREE.Scene()
  scene.fog = new THREE.Fog(0x000000,0,10000)

  const depth = 1400

 

  new THREE.TextureLoader().load('/earth_bg.png',texture=>{
    const geometry = new THREE.BoxGeometry(width,height,depth)
    const material  = new THREE.MeshBasicMaterial({map:texture,side:THREE.BackSide})
    const mesh = new THREE.Mesh(geometry,material)
    scene.add(mesh)
  
  })



  const ambientLight = new THREE.AmbientLight(0xffffff,1)
  const light_rightBottom = new THREE.PointLight(0x0655fd,5,0)
  light_rightBottom.position.set(0, 100, -200)
 
  // scene.add(light_rightBottom)
  // scene.add(ambientLight)



  const fov = 75
  const distance = width/2/Math.tan(Math.PI/12)
  const zAxisNumber = Math.floor(distance-depth/2)
  const camera = new THREE.PerspectiveCamera(fov,width/height,0,30000)
  camera.position.set(0,0,-1000);
  const cameraTarget = new THREE.Vector3(0,0,0)
  camera.lookAt(cameraTarget)


  const axes = new THREE.AxesHelper(20);
  scene.add(axes);

  const renderer = new THREE.WebGLRenderer({antialias:true,alpha:true})
  renderer.setSize(width,height)
  canvas?.appendChild(renderer.domElement)
  console.log('canvas',canvas)
  renderer.render(scene,camera)


  }
  },[])
  return (
    <div className="App"  id='canvas'>
       
    </div>
  );
}

export default App;
