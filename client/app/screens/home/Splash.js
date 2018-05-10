import React, { Component } from "react";
import { ImageBackground, Image, View, StatusBar } from "react-native";
import { Container, Button, H3, Text, Spinner } from "native-base";

import styles from "./styles";

const penfedLogo = require('../../assets/penfed.png');
const launchscreenBg = require("../../assets/launchscreen-bg.png");
const launchscreenLogo = require("../../assets/logo-kitchen-sink.png");

class Splash extends Component {
  render() {
    return (
      <Container>
        <StatusBar barStyle="dark-content" />
          <View style={styles.logoContainer}>
            <Image source={penfedLogo} style={styles.logo} />
            <Spinner color='#0F2C52' />
          </View>
      </Container>
    );
  }
}

export default Splash;
