import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loanListActions from '../actions/loanListActions';
import PropTypes from 'prop-types';
import { config } from '../config';

import axios from 'axios';

import { 
  Container, Row, Col, Button, Alert, 
  Card, CardBody, CardTitle, CardLink
} from 'reactstrap';
import { Table } from 'semantic-ui-react';

import Loan from './Loan';

class LoanList extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      success: false
    };
    this.deleteProfile = this.deleteProfile.bind(this);
  }

  componentWillMount = () => { // HERE WE ARE TRIGGERING THE ACTION
    this.props.loanListActions.fetchLoans();
    this.props.loanListActions.fetchToken();
  }

  componentDidMount = () => {
    this.interval = setInterval(() => {
      if (typeof this.props.unreadMsg === 'undefined') { return }
      var unread = false;
      var profile = 0;
      console.log(this.props);
      var unreadMsg = this.props.unreadMsg;
      for (var i = 0; i < this.props.loans.length; i++) {
        var msgs = this.props.loans[i].messages;
        for (var j = 0; j < msgs.length; j++) {
          if (msgs[j].to === "PenFed Loan Processor" && msgs[j].unread === true) {
            unread = true;
            profile = i;
          }
        }
      }
      unreadMsg.unread = unread;
      unreadMsg.profile = profile;
      console.log(unread);
      this.props.loanListActions.updateUnread(unreadMsg);
    }, 1500);
    if (this.props.location.state && this.props.location.state.success) {
      this.setState({ success: !this.props.success });
      setTimeout(function(){
        this.setState({ success: !this.props.success });
      }.bind(this), 2500);
    }
  };
  componentWillUnmount = () => {
    clearInterval(this.interval);
  };

  componentWillUpdate(nextProps, nextState) {
    console.log(this.props);
    console.log(nextProps);
  }
  
  deleteProfile(index) {
    var loans = this.props.loans;
    config.HEADERS.data = {
      cudlId: loans[index].cudlId,
      token: this.props.token
    }
    axios.delete(config.BASE_URL+'/loans/'+loans[index].mcsId, config.HEADERS, {
      cudlId: loans[index].cudlId,
      token: this.props.token
    })
      .then(res => {
        console.log(res.data);
      });
    loans.splice(index, 1);
    this.props.loanListActions.updateLoans(loans);
  }
  updateStatus = (index, newStatus) => {
    var loan = this.props.loans[index];
    console.log(newStatus);
    loan.status = newStatus;
    loan.lastNotification = new Date().toLocaleString();
    var msg = {
      from: "PenFed Loan Processor", 
      to: loan.contact_name, 
      subject: "Loan Status Updated",
      message: (loan.status === "Current") ?
      "The status of this loan has been changed to \"Current\" again!" : 
      "The status of this loan has been changed to \"Completed\"!",
      time: loan.lastNotification,
      unread: true
    }
    loan.messages.push(msg);
    loan.notification = {
      message: msg,
      token: this.props.token
    }
    axios.put(config.BASE_URL+'/loans/'+loan.mcsId, loan, config.HEADERS)
      .then(res => {
        delete loan.notification;
        this.props.loanListActions.updateLoan(index, loan)
      });
  }
  getLoans() {
    var loans = [];
    for (var i = 0; i < this.props.loans.length; i++) {
      loans.push(
        <Loan loan={this.props.loans[i]} 
              index={i} 
              deleteProfile={this.deleteProfile.bind(this)}
              updateStatus={this.updateStatus}>
        </Loan>
      );
    }
    return (
      <Table.Body>{loans}</Table.Body>
    );
  }
  handleSort = (param) => () => {
    if (this.props.column !== param) {
      this.props.loanListActions.sortLoans(param)
      return
    }
    this.props.loanListActions.sortLoans()
  }

  renderData() {
    console.log(this.props);
    const column = this.props.column;
    const direction = this.props.direction;
    var cudlId = (typeof this.props.unreadMsg === 'undefined' || 
    this.props.loans.length === 0) ? 
    111 : this.props.loans[this.props.unreadMsg.profile].cudlId;
    var unreadMsg = this.props.unreadMsg;
    return (
      <Container fluid="true">
        {
          unreadMsg.unread ? (
          <Alert color="warning" style={{padding: "25px"}}>
            <h3>
              You have a new message waiting for Loan {cudlId}!
            </h3>
          </Alert>) : null
        }
        <br/><br/>
        <Row>
          <Col sm="12" md={{ size: 10, offset: 1 }} style={{paddingLeft: "0px", paddingRight: "0px"}}>
            <Card body style={{paddingLeft: "0px", paddingRight: "0px"}}>
              {
                this.props.success ? (
                <Alert color="success">
                  <h2 className="alert-heading">Success!</h2>
                  <p>
                    The loan notification profile has been successfully saved!
                  </p>
                </Alert>) : null
              }
              <CardTitle>
                <Row>
                  <Col sm="12" md={{ size: '6', offset: 1}}>
                    <h1 style={{fontSize: "35px"}}>Dealer Notifier</h1>
                  </Col>
                </Row>
              </CardTitle>
              <CardLink>
                <Col>
                  <Link to='/create_profile'>
                    <Button outline color="primary" size="lg" className="float-right" style={{fontSize: "15px"}}>
                      Create Notification Profile
                    </Button>
                  </Link>
                </Col>
              </CardLink>
              <CardBody>
                <Table container sortable striped selectable stackable collapsing style={{fontSize: "15px", width: "inherit"}}>
                  <Table.Header>
                    <Table.Row className="title">
                      <Table.HeaderCell sorted={column === 'cudlId' ? direction : null} onClick={this.handleSort('cudlId')}>Loan ID</Table.HeaderCell>
                      <Table.HeaderCell sorted={column === 'loanee' ? direction : null} onClick={this.handleSort('loanee')}>Loanee</Table.HeaderCell>
                      <Table.HeaderCell sorted={column === 'value' ? direction : null} onClick={this.handleSort('value')}>Loan Value</Table.HeaderCell>
                      <Table.HeaderCell sorted={column === 'dealership' ? direction : null} onClick={this.handleSort('dealership')}>Dealership</Table.HeaderCell>
                      <Table.HeaderCell sorted={column === 'contact_name' ? direction : null} onClick={this.handleSort('contact_name')}>Dealer Contact</Table.HeaderCell>
                      <Table.HeaderCell sorted={column === 'status' ? direction : null} onClick={this.handleSort('status')}>Status</Table.HeaderCell>
                      <Table.HeaderCell sorted={column === 'lastNotification' ? direction : null} onClick={this.handleSort('lastNotification')}>Last Notification</Table.HeaderCell>
                      <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  {this.getLoans()}
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  render() {
    console.log(this.props);
    return (
      <div className=""> {
        this.props.unreadMsg !== {} ? 
        this.renderData() :
        <div className="">
        </div>
      }
      </div>
    );
  }
}

LoanList.propTypes = {
  loanListActions: PropTypes.object,
  loans: PropTypes.array,
  column: PropTypes.string,
  direction: PropTypes.string,
  unreadMsg: PropTypes.object,
  unread: PropTypes.bool,
  profile: PropTypes.number,
  success: PropTypes.bool,
  token: PropTypes.string
};

function mapStateToProps(state) {
  console.log(state);
  return {
    loans: state.loanList.loans,
    column: state.loanList.column,
    direction: state.loanList.direction,
    unread: state.loanList.unreadMsg.unread,
    profile: state.loanList.unreadMsg.profile,
    unreadMsg: state.loanList.unreadMsg,
    success: state.loanList.success,
    token: state.loanList.token
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
)(LoanList);