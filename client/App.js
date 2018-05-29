import React, { Component } from 'react';
import { Root } from "native-base";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { Provider } from 'react-redux';
import PushCtrl from './components/PushCtrl';

import axios from 'axios';

import Home from "./screens/home/Home";
import Splash from "./screens/home/Splash"
import LoanProfile from "./screens/loan/LoanProfile";
import Messages from "./screens/loan/Messages";
import SideBar from "./screens/sidebar";

import { config } from '../config';
import configureStore from './store/configureStore';

const store = configureStore();

const Drawer = DrawerNavigator(
  {
    Home: { screen: Home },
  },
  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

const AppNavigator = StackNavigator(
  {
    Drawer: { screen: Drawer },
    LoanProfile: { screen: LoanProfile },
    Messages: { screen: Messages }
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  };

  componentDidMount = () => {
    axios.get(config.BASE_URL+'/loans', config.HEADERS)
      .then(res => {
        const data = res.data;
        console.log(data);
        this.setState({ loans: data });
      });
  };
  
  render() {
    return (
      <Provider store={store}>
        <Root>
          {
            this.state.loans ?
            <AppNavigator screenProps={{config: config}} /> :
            <Splash />
          }
          <PushCtrl />
        </Root>
      </Provider>
    );
  }
}