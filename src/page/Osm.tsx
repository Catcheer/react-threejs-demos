import React, { useLayoutEffect } from "react";

const Cesium = (window as any).Cesium;

export default function ChinaGeoTour() {
  const token = "d47fd7dfa69b2cbee4591ead20b6ffea"; // 天地图 token


  let viewer: any;
       // 获取相机参数
       const getCameraView=()=> {
        const camera = viewer.camera;
        const pos = Cesium.Cartographic.fromCartesian(camera.position);
    
        return {
          destination: {
            lon: Cesium.Math.toDegrees(pos.longitude),
            lat: Cesium.Math.toDegrees(pos.latitude),
            height: pos.height,
          },
          orientation: {
            heading: Cesium.Math.toDegrees(camera.heading),
            pitch: Cesium.Math.toDegrees(camera.pitch),
            roll: Cesium.Math.toDegrees(camera.roll),
          },
        };
      }
    
      // 复制到剪贴板
      const copyCameraView=() =>{
        const view = getCameraView();
        const text = JSON.stringify(view, null, 2);
        console.log("当前相机参数:", view);
    
        navigator.clipboard
          .writeText(text)
          .then(() => alert("相机参数已复制到剪贴板"))
          .catch(() => alert("复制失败"));
      }
    

  useLayoutEffect(() => {
   
    let destroyed = false;



 
    async function init() {
      viewer = new Cesium.Viewer("cesiumContainer", {
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        baseLayerPicker: false,
        navigationHelpButton: false,
        animation: false,
        timeline: false,
        fullscreenButton: false,
        terrain: Cesium.Terrain.fromWorldTerrain({
          requestWaterMask: true,
        }),
        imageryProvider: new Cesium.UrlTemplateImageryProvider({
          // ✅ 使用天地图地形晕渲影像（类似你截图的绿色地形效果）
          url:
            "https://t{s}.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile" +
            "&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w" +
            "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles&tk=" +
            token,
          subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
          tilingScheme: new Cesium.WebMercatorTilingScheme(),
          maximumLevel: 18,
        }),
      });

      // 叠加天地图中文标注
      const labelLayer = new Cesium.UrlTemplateImageryProvider({
        url:
          "https://t{s}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile" +
          "&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w" +
          "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles&tk=" +
          token,
        subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
        tilingScheme: new Cesium.WebMercatorTilingScheme(),
        maximumLevel: 18,
      });
      viewer.imageryLayers.addImageryProvider(labelLayer);

      // —— 优化场景 —— //
      const { scene } = viewer;
      scene.globe.terrainExaggeration = 3.0; // 适度夸张
      scene.globe.enableLighting = true;
      scene.fog.enabled = true;
      scene.fog.density = 0.00015;
      scene.skyAtmosphere.show = true;

      // 航点：使用中文name
      const d2r = Cesium.Math.toRadians;
      const pt = (lon: number, lat: number, h: number) =>
        Cesium.Cartesian3.fromDegrees(lon, lat, h);

      type Stop = {
        name: string;
        lon: number;
        lat: number;
        height: number;
        heading: number;
        pitch: number;
        duration: number;
        linger?: number;
        lonC: number;
        latC: number;
      };

      const route: Stop[] = [
        { name: "s", lonC:105.7, latC:23.6,lon: 105.7, lat: 23.6, height: 2653856, heading: 358, pitch: -71, duration: 3 },
        { name: "青藏高原",lon: 88.5, lat: 29.2, lonC: 87.7, latC: 26.1, height: 161306, heading: 12, pitch: -31, duration: 5, linger: 1 },
        { name: "塔里木盆地",lonC:76.6, latC: 32.4, lon: 82.9, lat: 38.6, height:  477690, heading: 40, pitch: -40.8, duration: 6, linger: 1 },
        // { name: "青海湖",lonC: 100.1, latC: 36.9, lon: 100.1, lat: 36.9, height: 42000, heading: 20, pitch: -28, duration: 7, linger: 1 },
        { name: "四川盆地",lonC: 106.6, latC:23.8, lon: 104.0, lat: 30.6, height: 340610, heading: 0, pitch: -38.9, duration: 5, linger: 1 },
        { name: "云贵高原",lonC: 103.7, latC: 23.0, lon: 103.3, lat: 25.3, height: 128178.9, heading: 356, pitch: -29.8 ,duration: 5, linger: 1 },
        { name: "黄土高原",lonC: 110.2, latC: 32.1, lon: 109.5, lat: 36.6, height: 216339, heading: 356, pitch: -35.2, duration: 6, linger: 1 },
        { name: "华北平原",lonC: 116.1, latC:28.33 ,lon: 117.0, lat: 37.0, height: 338677, heading: 8, pitch: -37, duration: 6, linger: 1 },
        { name: "长江三角洲",lonC: 120.9, latC: 27.2, lon: 121.5, lat: 31.2, height: 161690, heading: -10, pitch: -32, duration: 5, linger: 1 },
        { name: "海南岛",lonC:112.7, latC: 17.23, lon: 109.7, lat: 19.2, height: 1343753, heading: 5.9, pitch: -70, duration: 7, linger: 1 },
        { name: "s", lonC:105.7, latC:23.6,lon: 105.7, lat: 23.6, height: 2653856, heading: 358, pitch: -71, duration: 4 },
      ];

      // 标签（中文）
      const labels = viewer.scene.primitives.add(new Cesium.LabelCollection());
      route.forEach((s) => {
        labels.add({
          position: Cesium.Cartesian3.fromDegrees(s.lon, s.lat, 0),
          text: s.name==='s'?'':s.name,
          font: "bold 28px Microsoft YaHei",
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(0, -12),
          showBackground: true,
          backgroundPadding: new Cesium.Cartesian2(8, 4),
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        });
      });

      // 串行动画
      const flyToStop = (idx: number) => {
        if (destroyed || idx >= route.length) return;
        const s = route[idx];
        viewer.camera.flyTo({
          destination: pt(s.lonC, s.latC, s.height),
          orientation: {
            heading: d2r(s.heading),
            pitch: d2r(s.pitch),
          },
          duration: s.duration,
          // duration: 0,
          easingFunction: Cesium.EasingFunction.SINE_IN_OUT,
          complete: () => {
            setTimeout(() => flyToStop(idx + 1), (s.linger ?? 0) * 1000);
          },
        });
      };

      setTimeout(() => flyToStop(0), 3000);
    }

    init();

    return () => {
      destroyed = true;
      if (viewer && !viewer.isDestroyed()) viewer.destroy();
    };
  }, []);

  return <div id="cesiumContainer" style={{ width: "100%", height: "100vh" }} >

{/* <button
        onClick={copyCameraView}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 999,
          padding: "6px 12px",
          background: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        获取相机参数
      </button> */}
  </div>
  
}
