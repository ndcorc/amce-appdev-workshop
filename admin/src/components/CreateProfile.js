import React, { Component } from 'react';
import { config } from '../config';
import { 
  Button, ButtonGroup, Card, CardTitle, CardBody,
  Container, Row, Col, Alert, Label,
  Form, FormGroup, Input, InputGroup, InputGroupAddon 
} from 'reactstrap';
import { Link } from 'react-router-dom';
import MaskedTextInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loanListActions from '../actions/loanListActions';
import PropTypes from 'prop-types';
import axios from 'axios';

const loanValueMask = createNumberMask({
  prefix: '$',
  allowDecimal: true
});
const loanIdMask = createNumberMask({
  prefix: '',
  allowDecimal: false,
  includeThousandsSeparator: false,
  allowLeadingZeroes: true
});
const DEBUG = true;
const create_msg = {
  from: "PenFed Loan Processor",
  subject: "Notification Channel Created",
  message: "A PenFed notification channel has just been created for this loan profile.",
  unread: true
}

class CreateProfile extends Component {

  constructor(props) {
    super(props);
    if (DEBUG) {
      this.state = {
        mcsId: null, cudlId: "", value: "",
        lastNotification: null,
        status: "Current", dealership: "Fred Haas Toyota", 
        loanee: "", contact_mobile: "(832) 622-1587", 
        contact_name: "Nolan Corcoran", messages: [],
        saved: false, success: false, error: false
      };
    } else {
      this.state = {
        mcsId: null, cudlId: null, value: null,
        lastNotification: null,
        status: "Current", dealership: null, loanee: null,
        contact_mobile: null, contact_name: null, messages: [],
        saved: false, success: false, error: false
      };
    }
    this.updateId = this.updateId.bind(this);
    this.updateLoanee = this.updateLoanee.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.updateDealership = this.updateDealership.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateMobile = this.updateMobile.bind(this);
    this.saveClose = this.saveClose.bind(this);
    this.saveContinue = this.saveContinue.bind(this);
  }

  componentWillMount = () => { // HERE WE ARE TRIGGERING THE ACTION
    this.props.loanListActions.fetchLoans();
    this.props.loanListActions.fetchToken();
  }

  updateId(e) { this.setState({cudlId: e.target.value}); }
  updateLoanee(e) { this.setState({loanee: e.target.value}); }
  updateValue(e) { this.setState({value: e.target.value}); }
  updateDealership(e) { this.setState({dealership: e.target.value}); }
  updateName(e) { this.setState({contact_name: e.target.value}); }
  updateMobile(e) { this.setState({contact_mobile: e.target.value}); }
  saveClose() {
    var profile = this.state;
    if (!this.state.saved) { // hasn't been saved yet, POST new profile
      delete profile.saved;
      delete profile.success;
      delete profile.error;
      create_msg.to = profile.contact_name;
      create_msg.time = profile.lastNotification = new Date().toLocaleString();
      profile.messages.push(create_msg);
      profile.value = parseInt(profile.value.replace("$", "").replace(",", ""), 10);
      profile.notification = {
        message: create_msg,
        token: this.props.token
      }
      console.log(profile);
      axios.post(config.BASE_URL+'/loans', profile, config.HEADERS)
        .then(res => {
          console.log(res.data);
          const data = res.data;
          this.setState({
            saved: true,
            mcsId: data.id
          });
          this.props.history.push({
            pathname: '/',
            state: { success: "true" }
          });
        });
    }
    else { // has been saved (and continued), PUT profile update
      delete profile.saved;
      delete profile.success;
      delete profile.error;
      profile.value = parseInt(profile.value.replace("$", "").replace(",", ""), 10);
      axios.put(config.BASE_URL+'/loans/'+this.state.mcsId, profile, config.HEADERS)
        .then(res => {
          this.setState({
            saved: true
          });
          this.props.history.push({
            pathname: '/',
            state: { success: "true" }
          });
        })
    }
  }
  saveContinue() {
    var profile = this.state;
    if (!this.state.saved) {
      delete profile.saved;
      delete profile.success;
      delete profile.error;
      create_msg.to = profile.contact_name;
      create_msg.time = profile.lastNotification = new Date().toLocaleString();
      profile.messages.push(create_msg);
      profile.value = parseInt(profile.value.replace("$", "").replace(",", ""), 10);
      profile.notification = {
        message: create_msg,
        token: this.props.token
      }
      axios.post(config.BASE_URL+'/loans', profile, config.HEADERS).then(res => {
        console.log(res.data);
        const data = res.data;
        this.setState({
          saved: true,
          mcsId: data.id,
          success: !this.state.success
        });
        setTimeout(function(){
          this.setState({
            success: !this.state.success
          });
        }.bind(this), 2500);
      });
    } else {
      delete profile.saved;
      profile.value = parseInt(profile.value.replace("$", "").replace(",", ""), 10);
      axios.put(config.BASE_URL+'/loans/'+this.state.mcsId, profile, config.HEADERS)
        .then(res => {
          this.setState({
            saved: true,
            success: !this.state.success
          });
          setTimeout(function(){
            this.setState({
              success: !this.state.success
            });
          }.bind(this), 2500);
        })
    }
  }
  showSuccess = () => {
    return (
      <Alert color="success">
        <h2 className="alert-heading">Success!</h2>
        <p>
          The loan notification profile has been successfully saved!
        </p>
      </Alert>
    );
  }


  render() {
    return (
      <div>
      <Container fluid="true">
        <br/><br/>
        <Row>
          <Col sm="12" md={{ size: 10, offset: 1 }}>
            <Card body>
              { this.state.success ? this.showSuccess() : null }
              <CardTitle>
                <Row>
                  <Col sm="12" md={{ size: 'auto', offset: 1}}>
                  <h1 style={{fontSize: "35px"}}>Create Notification Profile</h1>
                  </Col>
                </Row>
              </CardTitle>
              <CardBody>
                <Form>
                  <FormGroup row>
                    <Label sm={3}>Loan ID</Label>
                    <Col sm={4}>
                      <InputGroup>
                        <MaskedTextInput mask={loanIdMask}
                                         className="form-control"
                                         placeholder="Enter loan ID"
                                         value={this.state.cudlId}
                                         onChange={this.updateId} />
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={3}>Loanee</Label>
                    <Col sm={4}>
                      <Input type="name"
                             placeholder="e.g. Linda Sanchez"
                             value={this.state.loanee}
                             onChange={this.updateLoanee} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={3}>Loan Value</Label>
                    <Col sm={4}>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                        <MaskedTextInput mask={loanValueMask}
                                         className="form-control"
                                         placeholder="Enter an amount"
                                         value={this.state.value}
                                         onChange={this.updateValue} />
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="dealership" sm={3}>Dealership</Label>
                    <Col sm={4}>
                      <Input type="name" 
                             placeholder="e.g. Koons Tyson Chevy"
                             value={this.state.dealership}
                             onChange={this.updateDealership} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="exampleDate" sm={3}>Dealer Contact</Label>
                    <Col sm={4}>
                      <Input type="name"
                             placeholder="e.g. Paul Miller"
                             value={this.state.contact_name}
                             onChange={this.updateName} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="mobile" sm={3}>Dealer Contact Mobile</Label>
                    <Col sm={4}>
                      <MaskedTextInput mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                       className="form-control"
                                       placeholder="(123) 456-7890"
                                       guide={false}
                                       value={this.state.contact_mobile}
                                       onChange={this.updateMobile} />
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Row>
                    <Col>
                      <ButtonGroup className="float-right">
                        <Button outline color="primary" size="lg" onClick={this.saveClose}>
                          Save and Close
                        </Button>
                        &nbsp;
                        <Button outline color="primary" size="lg" onClick={this.saveContinue}>
                          Save and Continue
                        </Button>
                        &nbsp;
                        <Link to='/'>
                          <Button outline color="primary" size="lg">Cancel</Button>
                        </Link>
                      </ButtonGroup>
                    </Col>     
                    </Row> 
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  loanListActions: PropTypes.object,
  loans: PropTypes.array,
  column: PropTypes.string,
  direction: PropTypes.string,
  unreadMsg: PropTypes.object,
  unread: PropTypes.bool,
  profiles: PropTypes.array,
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
    profiles: state.loanList.unreadMsg.profiles,
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
)(CreateProfile);