import React, { useLayoutEffect } from 'react';
import './index.css';

const Cesium = (window as any).Cesium;

export default function ZhangQian() {
    const token = "d47fd7dfa69b2cbee4591ead20b6ffea";

    useLayoutEffect(() => {
        let viewer: any;
        let destroyed = false;
        let currentAnimFrame: number;

        async function init() {
            viewer = new Cesium.Viewer("cesiumZhangQianContainer", {
                geocoder: false,
                homeButton: false,
                sceneModePicker: false,
                baseLayerPicker: false,
                navigationHelpButton: false,
                animation: false,
                timeline: false,
                fullscreenButton: false,
                terrain: Cesium.Terrain.fromWorldTerrain(),
                imageryProvider: new Cesium.UrlTemplateImageryProvider({
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

            const d2r = Cesium.Math.toRadians;
            const pt = (lon: number, lat: number, h = 50) =>
                Cesium.Cartesian3.fromDegrees(lon, lat, h);

            // ✅ 名称升级（带现代国家）
            const points = [
                { name: "长安（中国·西安）", lon: 108.94, lat: 34.34 },
                { name: "河西走廊（中国·甘肃）", lon: 100.45, lat: 38.93 },
                { name: "匈奴（蒙古高原）", lon: 103.5, lat: 41.5 },
                { name: "大宛（乌兹别克斯坦）", lon: 71.0, lat: 40.5 },
                { name: "康居（哈萨克斯坦）", lon: 68.0, lat: 42.5 },
                { name: "大月氏（阿富汗）", lon: 66.0, lat: 37.0 },
                { name: "大夏（阿富汗）", lon: 65.0, lat: 36.5 },
            ];

            // ======================
            // 路径
            // ======================
            let pathPositions: any[] = [];

            const lineEntity = viewer.entities.add({
                polyline: {
                    positions: new Cesium.CallbackProperty(() => pathPositions, false),
                    width: 20,
                    material: new Cesium.PolylineGlowMaterialProperty({
                        glowPower: 1,
                        taperPower: 1,
                        color: Cesium.Color.ORANGE,
                    }),
                    clampToGround: true,
                }
            });

            // ======================
            // head（始终存在）
            // ======================
            let currentTravelerPos = pt(points[0].lon, points[0].lat);
            const traveler = viewer.entities.add({
                position: new Cesium.CallbackProperty(() => currentTravelerPos, false),
                ellipsoid: {
                    radii: new Cesium.Cartesian3(10000, 10000, 10000),
                    material: Cesium.Color.RED,
                }
            });

            // ======================
            // 标注
            // ======================
            const labels = viewer.scene.primitives.add(new Cesium.LabelCollection());

            const showPoint = (p: any) => {
                labels.add({
                    position: pt(p.lon, p.lat),
                    text: p.name,
                    font: "bold 18px Microsoft YaHei",
                    showBackground: true,
                });
            };

            // ======================
            // 动画
            // ======================
            const fly = (i: number) => {
                if (destroyed || i >= points.length) {
                    // ✅ 动画结束 → 平滑飞行到全路径视角
                    const allPositions = points.map(p => pt(p.lon, p.lat));
                    const boundingSphere = Cesium.BoundingSphere.fromPoints(allPositions);
                    // 扩大一些，留出边距
                    boundingSphere.radius *= 1.6;
                    viewer.camera.flyToBoundingSphere(boundingSphere, {
                        duration: 3.0,
                        offset: new Cesium.HeadingPitchRange(0, d2r(-50), 0),
                        easingFunction: Cesium.EasingFunction.CUBIC_IN_OUT,
                    });
                    return;
                }

                const cur = points[i];
                const prev = i === 0 ? cur : points[i - 1];

                if (i === 0) {
                    showPoint(cur);
                    pathPositions = [pt(cur.lon, cur.lat)];
                    setTimeout(() => fly(1), 1500);
                    return;
                }

                const duration = 6000; // 慢一点
                const start = Date.now();
                const base = [...pathPositions];

                const animate = () => {
                    if (destroyed) return;

                    let t = (Date.now() - start) / duration;
                    if (t > 1) t = 1;

                    const eased = -(Math.cos(Math.PI * t) - 1) / 2;

                    const lon = prev.lon + (cur.lon - prev.lon) * eased;
                    const lat = prev.lat + (cur.lat - prev.lat) * eased;

                    const pos = pt(lon, lat);

                    // ✅ 路径延伸
                    pathPositions = [...base, pos];

                    // ✅ 小球始终在最前端（引领）
                    currentTravelerPos = pos;

                    // 朝向
                    const heading = Math.atan2(
                        cur.lon - prev.lon,
                        cur.lat - prev.lat
                    );

                    // traveler.orientation =
                    //     Cesium.Transforms.headingPitchRollQuaternion(
                    //         pos,
                    //         new Cesium.HeadingPitchRoll(heading, 0, 0)
                    //     );

                    // 相机跟随
                    viewer.camera.lookAt(
                        pos,
                        new Cesium.HeadingPitchRange(0, d2r(-45), 1500000)
                    );

                    if (t < 1) {
                        currentAnimFrame = requestAnimationFrame(animate);
                    } else {
                        showPoint(cur);
                        setTimeout(() => fly(i + 1), 1500);
                    }
                };

                animate();
            };

            // 初始视角
            viewer.camera.flyTo({
                destination: pt(85, 38, 6000000),
            });

            setTimeout(() => {
                if (!destroyed) fly(0);
            }, 2000);
        }

        init();

        return () => {
            destroyed = true;
            if (currentAnimFrame) cancelAnimationFrame(currentAnimFrame);
            if (viewer && !viewer.isDestroyed()) viewer.destroy();
        };
    }, []);

    return (
        <div className="zhang-qian-container">
            <div id="cesiumZhangQianContainer" className="zhang-qian-viewer"></div>
            <div className="zhang-qian-title">
                <h1>张骞出使西域</h1>
                <p>丝绸之路的开拓之旅</p>
            </div>
        </div>
    );
}