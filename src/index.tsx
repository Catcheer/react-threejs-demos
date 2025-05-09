import React from 'react';
import ReactDOM from 'react-dom/client';
// import ReactDOM from 'react-dom'

import store from './store';
import { Provider } from 'react-redux';

import { Routes, Route, BrowserRouter, Link, Outlet } from "react-router-dom";

import './index.css';
import App from './App';
import Target from './page/Target';
import TestCanvas from './page/TestCanvas'
import DrawImg from './page/DrawImg'
import LinkTo from './page/linkto'
import Group from './page/Group'
import BufAttribute from './page/BufAttribute'
import reportWebVitals from './reportWebVitals';
import Tween from './page/Tween';
import Css2D from './page/Css2D';
import Raycaster from './page/Raycaster';
import Css3D from './page/Css3D';
import Sprite from './page/Sprite';
import AxisTransform from './page/AxisTransform';
import EffectComposer from './page/EffectComposer';
import TexTureDemo from './page/TexTureDemo';
import Geometries from './page/Geometries';
import LightDemoBasic from './page/LightDemoBasic';
import FontDemo from './page/FontDemo';
import Matilda from './page/Matilda';
import UpdateResource from './page/updateResource';
import ClickDrawLine from './page/clickDrawLine';
import ClickDrawLine1 from './page/clickDrawLine1';
import PointsMaterial from './page/PointsMaterial';
import SimplePlanet from './page/SimplePlanet';
import Wave from './page/Wave';
import FlowPathAni from './page/FlowPathAni';
import City from './page/City';
// import Matrixtransformations from './page/Matrixtransformations';
import LineGemo from './page/LineGemo';




import env from './env.js';

import ToDoList from './page/ToDoList';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode>

    <Provider store={store}>
      <BrowserRouter>
        <MyApp />
      </BrowserRouter>
    </Provider>

  // </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();







function MyApp() {
  return (

    <div className='layout_wrap'>
      <nav className='left_nav' style={{width:env.nav_width+'px',overflow:'auto'}}>
       <Link to="/">地球</Link>
       <Link to="/Sprite">下雪</Link>
        <Link to="/TestCanvas">canvas drawImg</Link>
        <Link to="/Target">canvas作为贴图</Link>
        <Link to="/DrawImg">DrawImg</Link>
        <Link to="/Group">Group</Link>
        <Link to="/BufAttribute">BufAttribute</Link>
        <Link to="/Tween">Tween</Link>
        <Link to="/Css2D">Css2D</Link>
        <Link to="/Raycaster">Raycaster射线</Link>
        <Link to="/Css3D">Css3D标签显隐</Link>
        <Link to="/AxisTransform">Raycaster射线拾取几何体</Link>
        <Link to="/EffectComposer">EffectComposer后期处理</Link>
        <Link to="/LightDemoBasic">LightDemoBasic</Link>
        <Link to="/TexTureDemo">材质</Link>
        <Link to="/Geometries">小火车</Link>
        <Link to="/FontDemo">FontDemo</Link>
        <Link to="/LineGemo">LineGemo</Link>
        <Link to="/Matilda">Matilda</Link>
        <Link to="/UpdateResource">UpdateResource</Link>
        <Link to="/ClickDrawLine">ClickDrawLine</Link>
        <Link to="/ClickDrawLine1">ClickDrawLine1</Link>
        <Link to="/PointsMaterial">PointsMaterial</Link>
        <Link to="/SimplePlanet">SimplePlanet</Link>
        <Link to="/Wave">Wave</Link>
        <Link to="/FlowPathAni">FlowPathAni</Link>
        <Link to="/City">City</Link>
        {/* <Link to="/Matrixtransformations">Matrixtransformations</Link> */}
        <Link to="/ToDoList">ToDoList</Link>
       
      </nav>
        <div className='main_conten'>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/Sprite" element={<Sprite />} />
          <Route path="/TestCanvas" element={<TestCanvas />} />
          <Route path="/DrawImg" element={<DrawImg />} />
          <Route path="/Target" element={<Target />} />
          <Route path="/Group" element={<Group />} />
          <Route path="/BufAttribute" element={<BufAttribute />} />
          <Route path="/Tween" element={<Tween />} />
          <Route path="/Css2D" element={<Css2D />} />
          <Route path="/Raycaster" element={<Raycaster />} />
          <Route path="/Css3D" element={<Css3D />} />
        
          <Route path="/AxisTransform" element={<AxisTransform />} />
          <Route path="/EffectComposer" element={<EffectComposer />} />
          <Route path="/LightDemoBasic" element={<LightDemoBasic />} />
          <Route path="/TexTureDemo" element={<TexTureDemo />} />
          <Route path="/Geometries" element={<Geometries />} />
          <Route path="/FontDemo" element={<FontDemo />} />
          <Route path="/LineGemo" element={<LineGemo />} />
          <Route path="/Matilda" element={<Matilda />} />
          <Route path="/UpdateResource" element={<UpdateResource />} />
          <Route path="/ClickDrawLine" element={<ClickDrawLine />} />
          <Route path="/ClickDrawLine1" element={<ClickDrawLine1 />} />
          <Route path="/PointsMaterial" element={<PointsMaterial />} />
          <Route path="/SimplePlanet" element={<SimplePlanet />} />
          <Route path="/Wave" element={<Wave />} />
          <Route path="/FlowPathAni" element={<FlowPathAni />} />
          <Route path="/City" element={<City />} />
          {/* <Route path="/Matrixtransformations" element={<Matrixtransformations />} /> */}
          <Route path="/ToDoList" element={<ToDoList />} />
      </Routes>
        </div>
    </div>

  );
}


