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

class Notifications extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  };

  componentDidMount = () => {
    this.props.loanListActions.fetchLoans();
    this.props.loanListActions.fetchDealer();
  };

  getNotifications = () => {
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
            <Title>Notifications</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Card>
            {/*this.getNotifications*/}
            <CardItem bordered>
              <Left>
                <Text>Loan ID</Text>
              </Left>
              <Body>
                <Text>{234}</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container> 
    );
  }

  render() {
    return (
      <Container className=""> {
        this.props.loans !== [] ? 
        this.renderData() :
        <Container className="">
        </Container>
      }
      </Container>
    );
  }
}

Notifications.propTypes = {
  loanListActions: PropTypes.object,
  loans: PropTypes.array,
  column: PropTypes.string,
  direction: PropTypes.string,
  notifications: PropTypes.array,
  token: PropTypes.string,
  success: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    loans: state.loanList.loans,
    column: state.loanList.column,
    direction: state.loanList.direction,
    notifications: state.loanList.notifications,
    token: state.loanList.token,
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
)(Notifications);