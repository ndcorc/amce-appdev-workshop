import React, { Component } from 'react';
import _ from 'lodash';
import { config } from '../config';
import axios from 'axios';
import { Row, Col, Container, Card } from 'reactstrap';
import LoanList from './LoanList';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.sortTable = this.sortTable.bind(this);
    this.deleteProfile = this.deleteProfile.bind(this);
  };
  
  componentDidMount = () => {
    axios.get(config.BASE_URL+'/loans', config.HEADERS)
      .then(res => {
        console.log(res.data);
        const data = res.data;
        this.setState({
          loans: data, 
          column: null, 
          direction: null
        });
      });
  }
  deleteProfile = (index) => {
    var loans = this.state.loans;
    loans.splice(index, 1);
    this.setState({ loans: loans });
  }
  updateStatus = (index) => {
    var loan = this.state.loans[index];
    loan.status = "Completed";
    console.log(loan);
    axios.put(config.BASE_URL+'/loans/'+loan.mcsId, loan, config.HEADERS)
      .then(res => {
        console.log(res.data);
        const data = res.data;
        var loans = this.state.loans;
        loans[index] = loan;
        this.setState({ loans: loans });
      });
  }
  sortTable = param => {
    console.log(param);
    const column = this.state.column;
    const loans = this.loans;
    const direction = this.state.direction;

    if (column !== param) {
      this.setState({
        column: param,
        loans: _.sortBy(loans, [param]),
        direction: 'ascending'
      })
      return
    }
    this.setState({
      loans: loans.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending'
    });
  }

  render() {
    return (
      <Container fluid="true" className="Loans">
        <br/><br/>
        <Row>
          <Col sm="12"  md={{ size: 10, offset: 1 }}>
            <Card body>
              <LoanList loans={this.state.loans} column={this.state.column} 
                        direction={this.state.direction} success={this.state.success}
                        sortTable={this.sortTable} deleteProfile={this.deleteProfile} 
                        updateStatus={this.updateStatus} />
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
};
