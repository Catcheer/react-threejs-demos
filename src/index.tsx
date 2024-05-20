import React from 'react';
import ReactDOM from 'react-dom/client';

import store from './store';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import Target from './Target';
import TestCanvas from './page/TestCanvas'
import DrawImg from './page/DrawImg'
import LinkTo from './page/linkto'
import Group from './page/Group'
import BufAttribute from './page/BufAttribute'
import reportWebVitals from './reportWebVitals';
import Tween from './page/Tween';


import ToDoList from './page/ToDoList';




import VConsole from 'vconsole';

// const vConsole = new VConsole();
// or init with options
const vConsole = new VConsole({ theme: 'dark' });

// console.log(window.bridge)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  // <Provider store={store}>
  //   <ToDoList />
  // </Provider>
  // </React.StrictMode>
  <Tween />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
