import React, { Component } from "react";
import { ImageBackground, Image, View, StatusBar, TouchableHighlight, Alert } from "react-native";
import axios from 'axios';
import { 
  Container, Header, Left, Right, Title, Icon, Body, Separator,
  Badge, Button, H3, Text, Spinner, Content, List, CardItem, Card
 } from "native-base";

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loanListActions from '../../actions/loanListActions';
import PropTypes from 'prop-types';

import styles from "./styles";

const penfedLogo = require('../../assets/penfed.png');
const launchscreenBg = require("../../assets/launchscreen-bg.png");
const launchscreenLogo = require("../../assets/logo-kitchen-sink.png");
const notify = require("../../assets/notify.png");

class LoanProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  };

  componentDidMount = () => {
    this.props.loanListActions.fetchLoans();
  };

  notify = () => {
    let index = this.props.navigation.state.params.index;
    let loan = this.props.loans[index];
    let config = this.props.screenProps.config;
    console.log(config)
    loan.messages.push({
      from: loan.contact_name,
      to: "PenFed Loan Processor", 
      subject: "New Response in CUDL",
      message: "A new response has been entered into the CUDL system.",
      time: loan.lastNotification,
      unread: true
    })
    axios.put(config.BASE_URL+'/loans/'+loan.mcsId, loan, config.HEADERS)
      .then(res => {
        this.props.loanListActions.updateLoan(index, loan);
        Alert.alert("New notification message has been sent!");
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert("Error: message not sent!")
      });
  }

  toMessages = () => {
    this.props.navigation.navigate("Messages", {
      index: this.props.navigation.state.params.index
    });
  }

  renderData = () => {
    var loan = this.props.loans[this.props.navigation.state.params.index];
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Notify PenFed</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Card>
            <CardItem bordered>
              <Left>
                <Text>Loan ID</Text>
              </Left>
              <Body>
                <Text>{loan.cudlId}</Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Left>
                <Text>Loanee</Text>
              </Left>
              <Body>
                <Text>{loan.loanee}</Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Left>
                <Text>Last Notified</Text>
              </Left>
              <Body>
                <Text>{loan.lastNotification}</Text>
              </Body>
            </CardItem>
            <CardItem bordered button onPress={() => this.toMessages()}>
              <Left>
                <Text>Messages{'  '}</Text>
                <Badge danger>
                  <Text>{loan.messages.length}</Text>
                </Badge>
              </Left>
              <Right>
                <Icon active name="arrow-forward"/>
              </Right>
            </CardItem>
            <CardItem cardBody
                      style={{alignItems: 'center', justifyContent: 'center'}}>
                <TouchableHighlight onPress={() => this.notify()}>
              <Image style={{
                       resizeMode: 'contain',
                       height: 155,
                       alignSelf: 'stretch'
                     }}
                     source={notify}/>
                </TouchableHighlight>
            </CardItem>
          </Card>
        </Content>
      </Container> 
    );
  }

  render() {
    return (
      <Container className=""> {
        this.props.unreadMsg !== {} ? 
        this.renderData() :
        <Container className="">
        </Container>
      }
      </Container>
    );
  }
}

LoanProfile.propTypes = {
  loanListActions: PropTypes.object,
  loans: PropTypes.array,
  column: PropTypes.string,
  direction: PropTypes.string,
  unreadMsg: PropTypes.object,
  success: PropTypes.bool
};

function mapStateToProps(state) {
  console.log(state);
  return {
    loans: state.loanList.loans,
    column: state.loanList.column,
    direction: state.loanList.direction,
    unreadMsg: state.loanList.unreadMsg,
    success: state.loanList.success
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loanListActions: bindActionCreators(loanListActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoanProfile);