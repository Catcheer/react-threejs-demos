import React, { useLayoutEffect } from "react";
import * as THREE from "three";
import useBasic from "../hooks/useBasic";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PathGeometry, PathPointList,PathTubeGeometry } from "three.path";
// 加载glb的loader
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function FlowPathAni() {
  const { scene, camera, renderer } = useBasic();
  useLayoutEffect(() => {
    if (!renderer || !scene || !camera) {
      return;
    }
    scene.fog = new THREE.Fog(0x000000, 0, 1000);
    camera.position.set(0, 30, 0);
    const axes = new THREE.AxesHelper(200);
    scene.add(axes);
    const controls = new OrbitControls(camera, renderer.domElement);
    // controls.autoRotate = true;

    const ambientLight = new THREE.AmbientLight("#ffffff", 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight("#ffffff", 0.8);
    directionalLight.position.set(0, 10, 0);
    scene.add(directionalLight);
    const pointLight = new THREE.PointLight("#ffffff", 1);
    pointLight.position.set(0, 10, 0);
    scene.add(pointLight);
    const hLight = new THREE.HemisphereLight("#ffffff", "#ffffff", 1);
    hLight.position.set(0, 10, 0);
    scene.add(hLight);

    const grid = new THREE.GridHelper(1000, 20, 0xffffff, 0xffffff);
    grid.material.opacity = 0.5;
    grid.material.transparent = true;
    scene.add(grid);

    const pointsArr = [
      121.78093686863522, 0, -4.603376409073572, 120.81339509799925, 0,
      -3.0333897782644268, 88.18838269349277, 0, -1.0333897782644268,
      88.18838269349277, 0, 63.55900780432629, 87.16531645200739, 0,
      68.04794277498671, 83.06620769318347, 0, 70.98695971872945,
      -1.130897005741467, 0, 70.34667258938468, -5.231039038271652, 0,
      68.42613876317515, -7.758389327064392, 0, 64.62409029746112,
      -7.758389327064392, 0, 46.44123345882236, -114.62656106119152, 0,
      46.44123345882236, -119.82497669490243, 0, 44.45968445743292,
      -121.94606515130032, 0, 39.4725534305143, -121.94606515130032, 0,
      -42.76532835182727, -120.11831411582477, 0, -48.53850237391983,
      -116.83579669695663, 0, -49.908124030849784, 78.54313968215955, 0,
      -49.908124030849784, 85.10694214192533, 0, -50.16532666595109,
      89.88557886450108, 0, -55.064547179368375, 89.88557886450108, 0,
      -93.93831946321087, 91.96632492268847, 0, -98.37744840781204,
      95.1920071430169, 0, -100.1746448114269, 152.736779207395, 0,
      -100.1746448114269, 157.30932898344975, 0, -96.64823157224308,
      160.4735065923067, 0, -99.846029526487, 302.4743190232127, 0,
      -99.846029526487, 307.28097694970387, 0, -98.29435216740127,
      309.4249527931002, 0, -93.79194193938966, 317.1439029555364, 0,
      -10.678271186410282, 322.7256435681537, 0, 64.82345541146658,
      321.948957384584, 0, 69.41475711676998, 269.58743740380316, 0,
      71.05051147709406, 163.1264743368946, 0, 71.05051147709406,
      159.53952961773413, 0, 68.13337162416227, 159.53952961773413, 0,
      -4.677615417615058, 124.42066238999215, 0, -4.677615417615058,
    ];

    const points = [
      
    ];
    let step = 0;

    const segment = 1000;
    let stepPonints ;


    const material = new THREE.MeshPhongMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: "#ffffff",
      side: THREE.DoubleSide,
     
     
    });

    new THREE.TextureLoader().load("/gold_arrow.png", (texture) => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      
      // material.map = texture;
      // material.alphaMap = texture;
    });



    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      "/mods/pathline.glb",
      (gltf) => {
       const line = gltf.scene.getObjectByName("pathline");

      //  line.scale.set(20,1,20)
        scene.add(line);
       
        const pointsList = [...line.geometry.attributes.position.array]
     
        for (let i = 0; i < pointsList.length; i += 12) {
          points.push(
            new THREE.Vector3(pointsList[i], pointsList[i + 1], pointsList[i + 2])
          );
        }
        const pathCurve = new THREE.CatmullRomCurve3(
          points,
          false,
          "catmullrom",
         0
        );
       
      
        
        const up = new THREE.Vector3(0, 1, 0);

        //threejs.path包
        const pathPoints = new PathPointList();
    
        pathPoints.set(points, 0.1, 1, up, false);
    
        const geometry = new PathTubeGeometry({
          pathPointList: pathPoints,
          options: {
            radius: 50, // default is 0.1
            radialSegments: 8, // default is 8
            progress: 1, // default is 1
            startRad: 0 // default is 0
        },
        usage: THREE.StaticDrawUsage // geometry usage
        },false);
        geometry.update(pathPoints, {
          width: 6,
          arrow: false,
        });
    
        console.log(geometry);
    
        const pathToShow = new THREE.Mesh(geometry, material);
       stepPonints =  pathCurve.getPoints(segment)
        scene.add(pathToShow);
    
       
      
      },
      undefined,
      (error) => {
       console.error(error);
      }
    )

    
    // for (let i = 0; i < pointsArr.length; i += 3) {
    //   points.push(
    //     new THREE.Vector3(pointsArr[i], pointsArr[i + 1], pointsArr[i + 2])
    //   );
    // }

   

   

   


    //   const arrow = await new THREE.TextureLoader().loadAsync("/gold_arrow.png");
    //   arrow.wrapS = THREE.RepeatWrapping;
    //   arrow.anisotropy = renderer.capabilities.getMaxAnisotropy();

   

    const box = new THREE.Mesh(
      new THREE.BoxGeometry(15, 15, 15),
      new THREE.MeshPhongMaterial({ color: "red" })
    );
    scene.add(box);

  


    function ani() {
      renderer.render(scene, camera);
      requestAnimationFrame(ani);
      step+=1

    if(stepPonints && stepPonints.length){
      const npcIndex = step % segment;
      const npxPoint = stepPonints[npcIndex];
      box.position.copy(npxPoint);
    }
    
      if (material.map) {
        material.map.offset.x -= 0.03;
      }
      material.needsUpdate = true;
    }
    ani();
  }, [renderer, scene, camera]);

  return <canvas id="canvas" style={{ display: "block" }}></canvas>;
}
