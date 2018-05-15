import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loanListActions from '../actions/loanListActions';
import PropTypes from 'prop-types';
import { config } from '../config';
import { 
  Container, Row, Col, Card, CardTitle, CardBody,
  Modal, ModalHeader, ModalBody
} from 'reactstrap';
import { Button, Table, Tab, Form } from 'semantic-ui-react';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      loan: {},
      messages: [],
      currentMsg: {},
      replyClicked: false,
      reply: {
        to: null,
        from: "Credit Union Loan Processor",
        subject: "",
        message: "",
        time: null
      },
      modal: false,
      index: null
    };
  }

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
          messages: res.data.messages
        });
        console.log(this.state.messages);
      })
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  }
  toggleReply = () => { 
    this.setState({ replyClicked: !this.state.replyClicked });
  }
  updateMessage = (e) => {
    var reply = this.state.reply;
    reply.message = e.target.value;
    this.setState({ reply: reply })
  }
  updateSubject = (e) => {
    var reply = this.state.reply;
    reply.subject = e.target.value;
    this.setState({ reply: reply })
  }
  readMessage = (i) => (e) => {
    const { match: { params } } = this.props;
    this.setState({ 
      modal: !this.state.modal,
      index: i,
      currentMsg: this.state.messages[i]
    });
    var loan = this.state.loan;
    loan.messages[i].unread = false;
    loan.lastNotification = new Date().toLocaleString();
    var msg = {
      from: "Credit Union Loan Processor",
      to: this.state.loan.contact_name,
      subject: "Message Read",
      message: "Your notification message has been read.",
      time: loan.lastNotification,
      unread: true
    }
    loan.notification = {
      message: msg,
      token: this.props.token
    }
    axios.put(config.BASE_URL+'/loans/'+params.id, loan, config.HEADERS)
      .then(res => {
        console.log(res.data);
        this.setState({
          messages: loan.messages
        });
        console.log(this.state.messages);
      })

  } 

  getMessages = (direction) => {
    var msg_list = [];
    //console.log(this.state.messages.length);
    for (var i = 0; i < this.state.messages.length; i++) {
      var msg = this.state.messages[i];
      if (direction === 'inbound' && msg.to === "Credit Union Loan Processor") {
        msg_list.push(
          <Table.Row key={i} style={{cursor: "pointer"}}
                     onClick={this.readMessage(i)}
                     negative={msg.unread}>
            <Table.Cell>{msg.time}</Table.Cell>
            <Table.Cell>{msg.from}</Table.Cell>
            <Table.Cell>{msg.to}</Table.Cell>
            <Table.Cell>{msg.subject}</Table.Cell>
          </Table.Row>
        );
      } else if(direction === 'outbound' && msg.from === "Credit Union Loan Processor") {
        msg_list.push(
          <Table.Row key={i} style={{cursor: "pointer"}}
                     onClick={this.readMessage(i)}>
            <Table.Cell>{msg.time}</Table.Cell>
            <Table.Cell>{msg.from}</Table.Cell>
            <Table.Cell>{msg.to}</Table.Cell>
            <Table.Cell>{msg.subject}</Table.Cell>
          </Table.Row>
        );
      }
    }
    return (
      <Table.Body>{msg_list}</Table.Body>
    );
  }

  render() {
    return (
      <Container fluid="true">
        <br/><br/>
        <Row>
          <Col sm="12" md={{ size: 10, offset: 1 }}>
            <Card body>
              <CardTitle>
                <Row>
                  <Col sm="12" md={{ size: 10, offset: 1}}>
                    <h1 style={{fontSize: "35px"}}>Message History: Loan {this.state.loan.cudlId}</h1>
                  </Col>
                </Row>
              </CardTitle>
              <CardBody>
                <Modal isOpen={this.state.modal} toggle={this.toggle} style={{fontSize: '20px'}}>
                  <ModalHeader toggle={this.toggle}><h2>Message Body</h2></ModalHeader>
                  <ModalHeader>
                    <br/>
                    <p style={{fontSize: '20px'}}>{this.state.currentMsg.message}</p>
                    <br/>
                  </ModalHeader>
                  <ModalHeader>
                    <Button style={{fontSize: '20px'}} color="primary" onClick={this.toggleReply}>Reply</Button>{' '}
                  </ModalHeader>
                  {
                    this.state.replyClicked ? (
                      <ModalBody>
                        <Form style={{fontSize: '20px'}}>
                          <Form.Input fluid label='Subject'
                                      placeholder='Subject'
                                      maxLength='78'
                                      value={this.state.reply.subject}
                                      onChange={this.updateSubject}/>
                          <Form.TextArea label='Notification Message' 
                                        placeholder='Notification message ...'
                                        value={this.state.reply.message}
                                        onChange={this.updateMessage} />
                          <Form.Button style={{fontSize: '20px'}} onClick={this.submit}>Submit</Form.Button>
                        </Form>
                      </ModalBody>
                    ) : null
                  }
                </Modal>
                <Tab panes={[
                  { 
                    menuItem: 'Inbound', 
                    pane: (
                      <Tab.Pane key='tab1'>
                        <Table sortable striped selectable stackable>
                          <Table.Header>
                            <Table.Row className="title">
                              <Table.HeaderCell>Date</Table.HeaderCell>
                              <Table.HeaderCell>From</Table.HeaderCell>
                              <Table.HeaderCell>To</Table.HeaderCell>
                              <Table.HeaderCell>Subject</Table.HeaderCell>
                            </Table.Row>
                          </Table.Header>
                          {this.getMessages("inbound")}
                        </Table>
                      </Tab.Pane>
                    )
                  },
                  { 
                    menuItem: 'Outbound', 
                    pane: (
                      <Tab.Pane key='tab2'>
                        <Table sortable striped selectable stackable>
                          <Table.Header>
                            <Table.Row className="title">
                              <Table.HeaderCell>Date</Table.HeaderCell>
                              <Table.HeaderCell>From</Table.HeaderCell>
                              <Table.HeaderCell>To</Table.HeaderCell>
                              <Table.HeaderCell>Subject</Table.HeaderCell>
                            </Table.Row>
                          </Table.Header>
                          {this.getMessages("outbound")}
                        </Table>
                      </Tab.Pane> 
                    )
                  }
                ]} renderActiveOnly={false} />
              </CardBody>
            </Card>
          </Col>
        </Row>  
      </Container>
    );
  }
}

Messages.propTypes = {
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
)(Messages);