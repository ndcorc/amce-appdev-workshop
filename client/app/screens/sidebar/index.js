import React, { Component } from "react";
import { Image } from "react-native";
import {
  Content, Text, List, ListItem, Icon,
  Container, Left, Right, Badge
} from "native-base";
import styles from "./style";

const penfedCover = require("../../assets/penfedCover.jpg");
const datas = [
  {
    name: "Home",
    route: "Home",
    icon: "home",
    bg: "#9F897C",
    types: "5"
  }
];

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };
  }

  render() {
    return (
      <Container>
        <Content bounces={false} style={{ flex: 1, backgroundColor: "#fff", top: -1 }}>
          <Image style={styles.drawerCover} source={penfedCover} />
          <List dataArray={datas} renderRow={ data =>
            <ListItem button noBorder onPress={() => this.props.navigation.navigate(data.route)}>
              <Left>
                <Icon active name={data.icon} style={{ color: "#777", fontSize: 26, width: 30 }} />
                <Text style={styles.text}>{data.name}</Text>
              </Left>
            </ListItem>
            }/>
        </Content>
      </Container>
    );
  }
}

export default SideBar;
