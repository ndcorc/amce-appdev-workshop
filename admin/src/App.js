import React, { Component } from 'react';
import { config } from './config';
import axios from 'axios';
import './App.css';

import Navigation from './components/Navigation';
import { Route, Switch } from 'react-router-dom';
import LoanList from './components/LoanList';
import Messages from './components/Messages';
import CreateProfile from './components/CreateProfile';
import UpdateProfile from './components/UpdateProfile';
import NotifyDealer from './components/NotifyDealer';
import Page404 from './components/Page404';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      token: null
    };
  };

  componentDidMount = () => {
    axios.get(config.BASE_URL+'/dealers', config.HEADERS)
    .then(res => {
      this.setState({
        token: res.data.token
      })
    })
  };
  
  render() {
    return (
      <div className="App">
        <Navigation />
        <Switch className="App">
          <Route exact path='/' render={(props) => <LoanList {...props} token={this.state.token} />}/>
          <Route path='/messages/:id' render={(props) => <Messages {...props} token={this.state.token} />}/>
          <Route path='/update_profile/:id' render={(props) => <UpdateProfile {...props} token={this.state.token} /> }/>
          <Route path='/notify_dealer/:id' component={(props) => <NotifyDealer {...props} token={this.state.token} />}/>
          <Route path='/create_profile' render={(props) => <CreateProfile {...props} token={this.state.token} /> }/>
          <Route component={Page404}/>
        </Switch>
      </div>
    );
  }
}

export default App;
