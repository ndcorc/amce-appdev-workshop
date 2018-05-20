import React, { Component } from "react";
import { Platform, RefreshControl } from "react-native";
import {
  Container, Header, Title,Content, Button, Icon,
  Card, CardItem, Text, Body, Left, Right
} from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import { VictoryPie, VictoryLegend } from "victory-native";

import styles from "./styles";

const sampleData = [
  {x: "Cats", y: 25},
  {x: "Dogs", y: 35},
  {x: "Birds", y: 20},
  {x: "Fish", y: 45},
  {x: "Lizards", y: 30},
]

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      total: (() => {
        var total = 0;
        for (var i = 0; i < this.props.loans.length; i++) {
          total += this.props.loans[i].value;
        }
        return total;
      })()
    };
  };

  _onRefresh() {
    this.setState({refreshing: true});
    this.props.refresh();
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.loans !== this.props.loans) {
      this.setState({refreshing: false});
    }
  }
  
  render() {
    var colors = [];
    for (var i = 0; i < this.props.loans.length; i++) {
      colors.push('rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')');
    }
    var total = 0;
    for (var i = 0; i < this.props.loans.length; i++) {
      total += this.props.loans[i].value;
    }
    return (
      <Container style={styles.container}>
        <Content refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }>
          <Card style={styles.mb} transparent>
            <Grid>
              <Row size={1} style={styles.text}>
                <CardItem header>
                  <Title>Loan Values</Title>
                </CardItem>
              </Row>
              <Row size={9} style={{backgroundColor: 'transparent'}}>
                <Col size={1.8}>
                  <CardItem style={styles.cardItem}>
                    <VictoryPie colorScale={colors}
                                data={this.props.loans} y={"value"} padding={styles.chart.padding}
                                width={styles.chart.width} height={styles.chart.height}
                                innerRadius={styles.chart.innerRadius} padAngle={1}
                                labels={(d) => {
                                  var percentage = Math.round(((d.value/total)*100)*10)/10;
                                  return percentage.toString() + "%";
                                }}/>
                  </CardItem>
                </Col>
                <Col size={1} style={{backgroundColor: 'transparent'}}>
                  <CardItem style={styles.cardItem}>
                    <VictoryLegend y={50} orientation="vertical" 
                                   gutter={2} rowGutter={{ top: 0, bottom: 0 }}
                                   padding={{top: 100}}
                                   data={this.props.loans.map((loan, i, arr) => {
                                     var d = {
                                       name: loan.loanee,
                                       symbol: {
                                         fill: colors[i],
                                         type: "square"
                                       }
                                     }
                                     return d;
                                   })}/>
                  </CardItem>
                </Col>
              </Row>
            </Grid>
          </Card>
        </Content>
      </Container>
    );
  }
}