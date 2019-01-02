/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import Routeur from "./Routeur";
import { Provider } from 'mobx-react/native';
import { todoStore } from './stores';


export default class App extends Component {
  render() {
    return <Provider todoStore={todoStore} ><Routeur /></Provider>;
  }
}
