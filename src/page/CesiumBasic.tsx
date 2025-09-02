
import React, { useLayoutEffect } from "react";

// import {
//   Ion,
//   Cartesian3,
//   Math as CesiumMath,
//   createOsmBuildingsAsync,
//   Terrain,
//   Viewer,
//   HeadingPitchRange,
// } from "cesium";

// import * as Cesium from "cesium";





const Cesium = (window as any).Cesium;


export default function CesiumBasic(){

  const token  = 'd47fd7dfa69b2cbee4591ead20b6ffea'
 var tdtUrl = 'https://t{s}.tianditu.gov.cn/';

    // 服务负载子域
    const subdomains=['0','1','2','3','4','5','6','7'];


     useLayoutEffect(() => {
    let viewer:any;
    async function init() {
      // viewer = new Cesium.Viewer("cesiumContainer", {
      //   geocoder:false,
      //   homeButton:false,
      //   sceneModePicker:false,
      //   baseLayerPicker:false,
      //   navigationHelpButton:false,
      //   animation:false,
      //   timeline:false,
      //   fullscreenButton:false,
        
      //   terrain: Cesium.Terrain.fromWorldTerrain({
      //     requestWaterMask:true
      //   })
       
      // });

    viewer = new Cesium.Map('cesiumContainer', {
        shouldAnimate: true, //是否允许动画
        selectionIndicator: false,
        baseLayerPicker: false,
        fullscreenButton: false,
        geocoder: false,
        homeButton: false,
        infoBox: false,
        sceneModePicker: false,
        timeline: false,
        navigationHelpButton: false,
        navigationInstructionsInitiallyVisible: false,
        showRenderLoopErrors: false,
        shadows: false,
    });

   

 // 叠加影像服务
    var imgMap = new Cesium.UrlTemplateImageryProvider({
        url: 'https://t{s}.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=' + token,
        subdomains: subdomains,
        tilingScheme : new Cesium.WebMercatorTilingScheme(),
        maximumLevel : 18
    });
    viewer.imageryLayers.addImageryProvider(imgMap); 

   // 叠加国界服务
    var iboMap = new Cesium.UrlTemplateImageryProvider({
        url:  'https://t{s}.tianditu.gov.cn/DataServer?T=ibo_w&x={x}&y={y}&l={z}&tk=' + token,
        subdomains: subdomains,
        tilingScheme : new Cesium.WebMercatorTilingScheme(),
        maximumLevel : 10
    });
    viewer.imageryLayers.addImageryProvider(iboMap);
    


  //  // 叠加地形服务
  //   var terrainUrls = new Array();

  //   for (var i = 0; i < subdomains.length; i++){
  //       var url = tdtUrl.replace('{s}', subdomains[i]) + 'mapservice/swdx?T=elv_c&tk=' + token;
  //       terrainUrls.push(url);
  //   }

  //   var provider = new Cesium.GeoTerrainProvider({
  //       urls: terrainUrls
  //   });

  //   viewer.terrainProvider = provider;


     // 叠加三维地名服务
    var wtfs = new Cesium.GeoWTFS({
        viewer,
        //三维地名服务，使用wtfs服务
        subdomains:subdomains,
        metadata:{
            boundBox: {
                minX: -180,
                minY: -90,
                maxX: 180,
                maxY: 90
            },
            minLevel: 1,
            maxLevel: 20
        },
        depthTestOptimization: true,
        dTOElevation: 15000,
        dTOPitch: Cesium.Math.toRadians(-70),
        aotuCollide: true, //是否开启避让
        collisionPadding: [5, 10, 8, 5], //开启避让时，标注碰撞增加内边距，上、右、下、左
        serverFirstStyle: true, //服务端样式优先
        labelGraphics: {
            font:"28px sans-serif",
            fontSize: 28,
            fillColor:Cesium.Color.WHITE,
            scale: 0.5,
            outlineColor:Cesium.Color.BLACK,
            outlineWidth: 2,
            style:Cesium.LabelStyle.FILL_AND_OUTLINE,
            showBackground:false,
            backgroundColor:Cesium.Color.RED,
            backgroundPadding:new Cesium.Cartesian2(10, 10),
            horizontalOrigin:Cesium.HorizontalOrigin.LEFT,
            verticalOrigin:Cesium.VerticalOrigin.TOP,
            eyeOffset:Cesium.Cartesian3.ZERO,
            pixelOffset: new Cesium.Cartesian2(5, 5),
            disableDepthTestDistance:undefined
        },
        billboardGraphics: {
            horizontalOrigin:Cesium.HorizontalOrigin.CENTER,
            verticalOrigin:Cesium.VerticalOrigin.CENTER,
            eyeOffset:Cesium.Cartesian3.ZERO,
            pixelOffset:Cesium.Cartesian2.ZERO,
            alignedAxis:Cesium.Cartesian3.ZERO,
            color:Cesium.Color.WHITE,
            rotation:0,
            scale:1,
            width:18,
            height:18,
            disableDepthTestDistance:undefined
        }
    });

    //三维地名服务，使用wtfs服务
    wtfs.getTileUrl = function(){
        return 'https://t{s}.tianditu.gov.cn/' + 'mapservice/GetTiles?lxys={z},{x},{y}&VERSION=1.0.0&tk='+ token; 
    }

    // 三维图标服务
    wtfs.getIcoUrl = function(){
        return 'https://t{s}.tianditu.gov.cn/' + 'mapservice/GetIcon?id={id}&tk='+ token;
    }

    wtfs.initTDT([{"x":6,"y":1,"level":2,"boundBox":{"minX":90,"minY":0,"maxX":135,"maxY":45}},{"x":7,"y":1,"level":2,"boundBox":{"minX":135,"minY":0,"maxX":180,"maxY":45}},{"x":6,"y":0,"level":2,"boundBox":{"minX":90,"minY":45,"maxX":135,"maxY":90}},{"x":7,"y":0,"level":2,"boundBox":{"minX":135,"minY":45,"maxX":180,"maxY":90}},{"x":5,"y":1,"level":2,"boundBox":{"minX":45,"minY":0,"maxX":90,"maxY":45}},{"x":4,"y":1,"level":2,"boundBox":{"minX":0,"minY":0,"maxX":45,"maxY":45}},{"x":5,"y":0,"level":2,"boundBox":{"minX":45,"minY":45,"maxX":90,"maxY":90}},{"x":4,"y":0,"level":2,"boundBox":{"minX":0,"minY":45,"maxX":45,"maxY":90}},{"x":6,"y":2,"level":2,"boundBox":{"minX":90,"minY":-45,"maxX":135,"maxY":0}},{"x":6,"y":3,"level":2,"boundBox":{"minX":90,"minY":-90,"maxX":135,"maxY":-45}},{"x":7,"y":2,"level":2,"boundBox":{"minX":135,"minY":-45,"maxX":180,"maxY":0}},{"x":5,"y":2,"level":2,"boundBox":{"minX":45,"minY":-45,"maxX":90,"maxY":0}},{"x":4,"y":2,"level":2,"boundBox":{"minX":0,"minY":-45,"maxX":45,"maxY":0}},{"x":3,"y":1,"level":2,"boundBox":{"minX":-45,"minY":0,"maxX":0,"maxY":45}},{"x":3,"y":0,"level":2,"boundBox":{"minX":-45,"minY":45,"maxX":0,"maxY":90}},{"x":2,"y":0,"level":2,"boundBox":{"minX":-90,"minY":45,"maxX":-45,"maxY":90}},{"x":0,"y":1,"level":2,"boundBox":{"minX":-180,"minY":0,"maxX":-135,"maxY":45}},{"x":1,"y":0,"level":2,"boundBox":{"minX":-135,"minY":45,"maxX":-90,"maxY":90}},{"x":0,"y":0,"level":2,"boundBox":{"minX":-180,"minY":45,"maxX":-135,"maxY":90}}]);

    

      let osmBuildingsTileset = await Cesium.createOsmBuildingsAsync();
      viewer.scene.primitives.add(osmBuildingsTileset);
      // let pointCloudTileset = await Cesium.createPointCloudTilesetAsync({
      //   url: "https://assets.agi.com/stk-terrain/v1/tilesets/world/tiles",
      // });

      // console.log(pointCloudTileset);
        osmBuildingsTileset.style = new Cesium.Cesium3DTileStyle({
          color: {
            conditions: [
              ["${name} === '上海中心大厦'", "color('red')"],
              ["true", "color('white')"],
            ],
          },
        });

      // 东方明珠坐标
      const longitude = 121.4998;
      const latitude = 31.2197;
      const height = 1000; // 高度越高越远离地面

      osmBuildingsTileset.style = new Cesium.Cesium3DTileStyle({
        defines: {
          distanceFromComplex:
            "distance(vec2(${feature['cesium#longitude']}, ${feature['cesium#latitude']}), vec2(121.4998, 31.2197))",
        },
        color: {
          conditions: [
            ["${distanceFromComplex} > 0.10", "color('#d65c5c')"],
            ["${distanceFromComplex} > 0.06", "color('#f58971')"],
            ["${distanceFromComplex} > 0.02", "color('#f5af71')"],
            ["${distanceFromComplex} > 0.001", "color('#f5ec71')"],
            ["true", "color('#ffffff')"],
          ],
        },
      });

      // const wyoming = viewer.entities.add({
      //   name: "wyoming",
      //   polygon: {
      //     hierarchy: Cesium.Cartesian3.fromDegreesArray([
      //       -109.0, 40.0, -95.0, 40.0, -95.0, 50.0, -109.0, 50.0,
      //     ]),
      //     material: Cesium.Color.RED.withAlpha(0.5),
      //   },
      // });

      // viewer.zoomTo(wyoming);

      viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
        orientation: {
          heading: Cesium.Math.toRadians(0), // 摄像头朝向：0°表示正北，可以调成 90 看东方等
          pitch: Cesium.Math.toRadians(-25), // 向下看 30 度（负值）
          roll: 0, // 没有滚动
        },
      });
    }

    init();

    return () => {
      viewer.destroy();
    };
  }, []);


    return <div id="cesiumContainer" style={{ width: "100%", height: "100vh" }}></div>
}