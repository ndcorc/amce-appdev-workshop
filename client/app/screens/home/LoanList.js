import React, { Component } from "react";
import { Platform, RefreshControl } from "react-native";
import {
  Container, Header, Title, Text, Content, 
  Button, Icon, List, ListItem, Separator,
  Left, Right, Body, Switch, Radio, Badge
} from "native-base";
import FaIcon from 'react-native-vector-icons/FontAwesome';
import MaCoIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from "./styles";

export default class LoanList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    };
  }

  navigate = (i) => {
    this.props.navigate("LoanProfile", {index: i});
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.props.refresh();
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.loans !== this.props.loans) {
      this.setState({refreshing: false});
    }
  }

  renderLoans = () => {
    var loans = [];
    for (let i = 0; i < this.props.loans.length; i++) {
      loans.push(
        <ListItem icon onPress={() => this.navigate(i)}>
          <Left>
            {
              this.props.loans[i].status === "Current" ?
              <FaIcon active name="arrow-circle-up" color={"red"} size={35}/> :
              <FaIcon active name="check-circle" color={"green"} size={35}/>
            }
          </Left>
          <Body>
            <Text>{this.props.loans[i].loanee}</Text>
            <Text note>{this.props.loans[i].status}</Text>
          </Body>
          <Right>
            <Text>
            {
              "$"+this.props.loans[i].value.toLocaleString(
                options={
                  style: "currency",
                  currency: "USD",
                  currencyDisplay: "symbol"
                }
              )
            }
            </Text>
            <Icon active name="arrow-forward" />
          </Right>
        </ListItem>
      )
    }
    return (
      <Content refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh.bind(this)}
        />
      }>
        <Separator style={{height: 3}}/>
        <List>
          {loans}
        </List>
      </Content>
    );
  }

  render() {
    return (
      <Container style={styles.container}>
        {this.renderLoans()}
      </Container>
    );
  }
}