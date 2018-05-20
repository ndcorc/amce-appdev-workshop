import React, { Component } from 'react';
import { PushNotificationIOS } from 'react-native';
import PushNotification from 'react-native-push-notification';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loanListActions from '../actions/loanListActions';
import PropTypes from 'prop-types';

import { config } from '../../config';
import axios from 'axios';

class PushCtrl extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  componentWillMount = () => {
    this.props.loanListActions.fetchLoans();
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
        console.log( 'TOKEN VALUE: ' + token.token );
        config.NOTIFICATIONS.notificationToken = token.token;
        axios.post(config.BASE_URL+'/dealers', config.NOTIFICATIONS, config.HEADERS)
          .then(res => {
            //console.log(JSON.stringify(res));
            PushNotification.setApplicationIconBadgeNumber(0);
          })
          .catch(err => {
            console.log(err);
          })
      },
  
      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );
        // process the notification
        PushNotification.setApplicationIconBadgeNumber(1);
        // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
  
      // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: "YOUR GCM SENDER ID",
  
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,
      
      /**
        * (optional) default: true
        * - Specified if permissions (ios) and token (android and ios) will requested or not,
        * - if not, you must call PushNotificationsHandler.requestPermissions() later
        */
      requestPermissions: true,
    });
  }

  render(){
    return null;
  }
}

PushCtrl.propTypes = {
  loanListActions: PropTypes.object,
  loans: PropTypes.array,
  column: PropTypes.string,
  direction: PropTypes.string,
  unreadMsg: PropTypes.object,
  success: PropTypes.bool
};

function mapStateToProps(state) {
  console.log(state);
  return {
    loans: state.loanList.loans,
    column: state.loanList.column,
    direction: state.loanList.direction,
    unreadMsg: state.loanList.unreadMsg,
    success: state.loanList.success
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
)(PushCtrl);