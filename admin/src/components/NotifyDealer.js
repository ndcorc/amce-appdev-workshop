import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loanListActions from '../actions/loanListActions';
import PropTypes from 'prop-types';
import { config } from '../config';
import { Form } from 'semantic-ui-react';
import { Container, Row, Col, Card, CardTitle, CardBody } from 'reactstrap';

class NotifyDealer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      contact_name: null,
      subject: null,
      message: null,
      time: null
    };
  };
  componentWillMount = () => { // HERE WE ARE TRIGGERING THE ACTION
    this.props.loanListActions.fetchLoans();
    this.props.loanListActions.fetchToken();
  }
  componentDidMount = () => {
    const { match: { params } } = this.props;
    console.log(params);
    axios.get(config.BASE_URL+'/loans/'+params.id, config.HEADERS)
      .then(res => {
        console.log(res.data);
        this.setState({
          loan: res.data,
          contact_name: res.data.contact_name
        })
      })
  };

  updateMessage = (e) => {
    this.setState({ message: e.target.value })
  }
  updateSubject = (e) => {
    this.setState({ subject: e.target.value })
  }
  submit = () => {
    const { match: { params } } = this.props;
    console.log(this.state.loan);
    var profile = this.state.loan;
    profile.lastNotification = new Date().toLocaleString();
    var msg = {
      from: "PenFed Loan Processor",
      to: this.state.contact_name,
      subject: this.state.subject,
      message: this.state.message,
      time: profile.lastNotification,
      unread: true
    }
    console.log(msg);
    profile.messages.push(msg);
    profile.notification = {
      message: msg,
      token: this.props.token
    }
    axios.put(config.BASE_URL+'/loans/'+params.id, profile, config.HEADERS)
      .then(res => {
        console.log(res.data);
        this.props.history.push({
          pathname: '/',
          state: { success: true }
        })
      })
  }

  render() {
    return (
      <Container fluid="true">
        <br/><br/>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Card body>
              <CardTitle>
                <Row>
                  <Col sm="12" md={{ size: '6', offset: 1}}>
                  <h1 style={{fontSize: "35px"}}>Notify Dealer</h1>
                  </Col>
                </Row>
              </CardTitle>
              <CardBody>
                <Form>
                  <Form.Input fluid label='To' placeholder={this.state.contact_name} readOnly />
                  <Form.Input fluid label='Subject'
                              placeholder='Subject'
                              maxLength='78'
                              value={this.state.subject}
                              onChange={this.updateSubject}/>
                  <Form.TextArea label='Notification Message' 
                                 placeholder='Notification message ...'
                                 value={this.state.message}
                                 onChange={this.updateMessage} />
                  <Form.Button onClick={this.submit}>Submit</Form.Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>  
      </Container>
    )
  }
};

NotifyDealer.propTypes = {
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
)(NotifyDealer);