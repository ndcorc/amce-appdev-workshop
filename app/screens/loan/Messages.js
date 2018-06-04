import React, { Component } from 'react';
import { View } from 'react-native';
import { 
  Container, Header, Left, Right, Title, Icon, Body, Separator,
  Badge, Button, H3, Text, Spinner, Content, List, CardItem, Card
 } from "native-base";

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loanListActions from '../../actions/loanListActions';
import PropTypes from 'prop-types';

import styles from "./styles";

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  componentDidMount = () => {
    this.props.loanListActions.fetchLoans();
  };

  getMessages = () => {
    let loan = this.props.loans[this.props.navigation.state.params.index];
    let messages = [];
    for (let i = 0; i < loan.messages.length; i++) {
      messages.push(
        <Card style={{marginTop: 10, marginBottom: 10}}>
          <CardItem bordered>
            <Left>
              <Text style={styles.bold}>From</Text>
            </Left>
            <Body>
              <Text>{loan.messages[i].from}</Text>
            </Body>
          </CardItem>
          <Separator style={{height: 1}}/>
          <CardItem bordered>
            <Left>
              <Text style={styles.bold}>Subject</Text>
            </Left>
            <Body>
              <Text>{loan.messages[i].subject}</Text>
            </Body>
          </CardItem>
          <Separator style={{height: 1}}/>
          <CardItem bordered>
            <Left>
              <Text style={styles.bold}>Message</Text>
            </Left>
            <Body>
              <Text>{loan.messages[i].message}</Text>
            </Body>
          </CardItem>
        </Card>
      );
    }
    return messages;
  }

  renderData = () => {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Messages</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          {this.getMessages()}
        </Content>
      </Container>
    )
  }

  render(){
    return(
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

Messages.propTypes = {
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
)(Messages);