import React, { Component } from 'react';
import { PushNotificationIOS } from 'react-native';
import PushNotification from 'react-native-push-notification';

import { config } from '../../config';
import axios from 'axios';

class PushCtrl extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  componentDidMount = () => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
        console.log( '\n\nTOKEN VALUE: ' + token.token + '\n\n');
        config.NOTIFICATIONS.notificationToken = token.token;
        axios.post(config.BASE_URL+'/dealers', config.NOTIFICATIONS, config.HEADERS)
          .then(res => {
            console.log(Object.keys(res));
            console.log(JSON.stringify(res));
          })
          .catch(err => {
            console.log(err);
          })
      },
  
      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );

        // process the notification
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

export default PushCtrl;