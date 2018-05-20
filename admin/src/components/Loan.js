import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Button, Table, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import FaEllipsisH from 'react-icons/lib/fa/ellipsis-h';

class Loan extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      dropdownOpen: false,
      hover: false,
      rowHover: false,
      index: props.index,
      loan: props.loan,
      modal: false
    };
    this.toggle = this.toggle.bind(this);
    this.toggleHover = this.toggleHover.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.deleteProfile = this.deleteProfile.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
  }

  componentDidMount = () => {
    console.log(this.props);
  };

  toggle() { this.setState({ dropdownOpen: !this.state.dropdownOpen }); }
  toggleHover() { this.setState({ hover: !this.state.hover }); }
  toggleModal() { this.setState({ modal: !this.state.modal }); }
  deleteProfile() {
    this.props.deleteProfile(this.state.index);
  }
  updateStatus = () => {
    var newStatus = (this.props.loan.status === "Current") ? "Completed" : "Current";
    this.props.updateStatus(this.props.index, newStatus);
    this.setState({ modal: !this.state.modal })
  }
  getTime = () => {
    return this.props.loan.lastNotification.toLocaleString("en-US", {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'});
  }
  getAlert = () => { return false; }

  render() {
    var iColor, bgColor;
    if (this.state.dropdownOpen || this.state.hover) {
      iColor = "white";
      bgColor = "rgb(0, 47, 255)";
    }
    else if(this.state.rowHover) {
      iColor = "rgb(0, 47, 255)";
      bgColor = "transparent";
    }
    else {
      iColor = "rgb(100, 100, 100)";
      bgColor = "transparent";
    }
    var warningState = (this.props.unreadMsg.profiles.includes(this.props.index)) ? true : false;
    return (
      <Table.Row className="trWarning" key={this.state.index} negative={false} 
                 onMouseEnter={() => this.setState({rowHover: true})} 
                 onMouseLeave={() => this.setState({rowHover: false})}
                 warning={warningState}>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
          <ModalHeader toggle={this.toggleModal}>Update Loan Status</ModalHeader>
          <ModalBody>Change loan status {(this.props.loan.status === "Current") ? "to Completed" : "back to Current"}?</ModalBody>
          <ModalFooter>
            <Button negative onClick={this.toggleModal}>No</Button>
            <Button positive icon='checkmark' labelPosition='right' content='Yes' onClick={this.updateStatus} />
          </ModalFooter>
        </Modal>
        <Table.Cell>
          {warningState ? <Icon name="attention"/> : null}
          {this.props.loan['cudlId']}
        </Table.Cell>
        <Table.Cell>{this.props.loan['loanee']}</Table.Cell>
        <Table.Cell>{"$"+(this.props.loan['value'].toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'))}</Table.Cell>
        <Table.Cell>{this.props.loan['dealership']}</Table.Cell>
        <Table.Cell>{this.props.loan['contact_name']}</Table.Cell>
        <Table.Cell>
          {
            this.props.loan.status === "Current" ? 
            <Button color='yellow' onClick={this.toggleModal} 
                    style={{paddingLeft: "10px", paddingRight: "10px"}}>Current</Button> : 
            <Button color='green' onClick={this.toggleModal}
                    style={{paddingLeft: "10px", paddingRight: "10px"}}>Completed</Button>
          }
        </Table.Cell>
        <Table.Cell>{this.getTime()}</Table.Cell>
        <Table.Cell>
          <Dropdown direction="down" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle style={{backgroundColor: bgColor}} 
                            onMouseEnter={this.toggleHover}
                            onMouseLeave={this.toggleHover}>
              <FaEllipsisH style={{color: iColor}}/>
            </DropdownToggle>
            <DropdownMenu down>
              <Link to={'/update_profile/'+this.props.loan.mcsId}><DropdownItem style={{fontSize: "20px"}}>Update Profile</DropdownItem></Link>
              <Link to={'/notify_dealer/'+this.props.loan.mcsId}><DropdownItem style={{fontSize: "20px"}}>Notify Dealer</DropdownItem></Link>
              <Link to={'/messages/'+this.props.loan.mcsId}><DropdownItem style={{fontSize: "20px"}}>Message History</DropdownItem></Link>
              <DropdownItem divider></DropdownItem>
              <DropdownItem onClick={this.deleteProfile} style={{fontSize: "20px"}}>Delete Profile</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default Loan;