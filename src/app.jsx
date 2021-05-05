/**
 * app.jsx
 *
 * This is the entry file for the application.
 *
 */

import 'babel-polyfill'

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import route from './route2';
import store from "./store";
import './common_style/common_style.scss';

// Mount on app node which is defined in ../index.html
ReactDOM.render(
  <Provider store={store}>{route}</Provider>,
  document.getElementById("app")
);
