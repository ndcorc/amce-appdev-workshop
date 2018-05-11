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

import * as firebase from 'firebase';

const fbConfig = {
  apiKey: "AIzaSyASKCTX_UBmTSmdN4jKrzjzX_a_vhUBQK0",
  authDomain: "creditunion-7fee3.firebaseapp.com",
  databaseURL: "https://creditunion-7fee3.firebaseio.com",
  projectId: "creditunion-7fee3",
  storageBucket: "",
  messagingSenderId: "1054553748518"
}
firebase.initializeApp(fbConfig);

const messaging = firebase.messaging();
messaging.usePublicVapidKey(config.KEYS.firebase);
messaging.requestPermission()
  .then(() => {
    console.log('Notification permission granted.');
    messaging.getToken()
      .then(currentToken => {
        if (currentToken) {
          //sendTokenToServer(currentToken);
          //updateUIForPushEnabled(currentToken);
        } else {
          // Show permission request.
          console.log('No Instance ID token available. Request permission to generate one.');
          // Show permission UI.
          //updateUIForPushPermissionRequired();
          //setTokenSentToServer(false);
        }
      })
      .catch(err => {
        console.log('An error occurred while retrieving token. ', err);
        //showToken('Error retrieving Instance ID token. ', err);
        //setTokenSentToServer(false);
      });
  })
  .catch(err => {
    console.log('Unable to get permission to notify.', err);
  });

// Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(() => {
  messaging.getToken()
    .then(refreshedToken => {
      console.log('Token refreshed.');
      //setTokenSentToServer(false);
      //sendTokenToServer(refreshedToken);
    })
    .catch(err => {
      console.log('Unable to retrieve refreshed token ', err);
      //showToken('Unable to retrieve refreshed token ', err);
    });
});

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
