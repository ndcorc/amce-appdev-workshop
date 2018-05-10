import React, { Component } from "react";
import {
  Container, Header, Title, Content, Button, Icon,
  Left, Right, Body, List, ListItem, Text, Segment
} from "native-base";

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loanListActions from '../../actions/loanListActions';
import PropTypes from 'prop-types';

import Dashboard from './Dashboard';
import LoanList from './LoanList';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { seg: 1 };
  }

  componentDidMount = () => {
    this.props.loanListActions.fetchLoans();
  };

  renderData = () => {
    return (
      <Container style={{ backgroundColor: "#FBFAFA" }}>
        <Header hasTabs>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>PenFed Notify</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="search" />
            </Button>
          </Right>
        </Header>
        <Segment>
          <Button first active={this.state.seg === 1 ? true : false}
                  onPress={() => this.setState({ seg: 1 })}>
            <Text>Dashboard</Text>
          </Button>
          <Button active={this.state.seg === 2 ? true : false}
                  onPress={() => this.setState({ seg: 2 })}>
            <Text>Loan List</Text>
          </Button>
        </Segment>

        <Content padder>
          {this.state.seg === 1 && <Dashboard loans={this.props.loans} navigate={this.props.navigation.navigate}/>}
          {this.state.seg === 2 && <LoanList loans={this.props.loans} navigate={this.props.navigation.navigate}/>}
        </Content>
      </Container>
    )
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

Home.propTypes = {
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
)(Home);