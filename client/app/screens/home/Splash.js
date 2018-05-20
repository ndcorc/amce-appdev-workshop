import React, { Component } from "react";
import { ImageBackground, Image, View, StatusBar } from "react-native";
import { Container, Button, H3, Text, Spinner } from "native-base";

import styles from "./styles";

const creditunionLogo = require('../../assets/creditunion.jpg');

class Splash extends Component {
  render() {
    return (
      <Container>
        <StatusBar barStyle="dark-content" />
          <View style={styles.logoContainer}>
            <View style={{flex: 1, justifyContent: 'center', paddingBottom: 0}}>
              <Image source={creditunionLogo} style={styles.logo} />
            </View>
            <View style={{flex: 1, paddingTop: 0}}>
              <Spinner color='#0F2C52' />
            </View>
          </View>
      </Container>
    );
  }
}

export default Splash;
