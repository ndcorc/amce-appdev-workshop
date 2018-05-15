import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Body,
  List,
  ListItem,
  Text,
  Segment
} from "native-base";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seg: 2
    };
  }
  
  render() {
    return (
      <Container style={{ backgroundColor: "#FBFAFA" }}>
        <Header hasTabs>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}>
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
          <Button
            first
            active={this.state.seg === 1 ? true : false}
            onPress={() => this.setState({ seg: 1 })}>
            <Text>Dashboard</Text>
          </Button>
          <Button
            active={this.state.seg === 2 ? true : false}
            onPress={() => this.setState({ seg: 2 })}>
            <Text>Loan List</Text>
          </Button>
        </Segment>

        <Content padder>
          {this.state.seg === 1 && <Dashboard />}
          {this.state.seg === 2 && <LoanList />}
        </Content>
      </Container>
    );
  }
}

export default Home;
