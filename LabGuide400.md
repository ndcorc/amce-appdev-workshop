![](images/200/Picture-lab.png)  
Update: March 31, 2017

## Introduction

This is the fourth of several labs that are part of the **Oracle AMCe Push Notifications workshop.** This workshop will walk you through the Software Development Lifecycle (SDLC) for a Cloud Native project that will create and use several Microservices.

In the first lab (100), the Project Manager created a new project in the Developer Cloud Service and also created and assigned tasks to the developers of this application. In this lab you will assume the persona of the Java developer, who will be tasked with creating several microservices that will supply data to any front-end or analytics applications (one of which you will build in the following lab, lab 300).

***To log issues***, click here to go to the [github oracle](https://github.com/oracle/cloud-native-devops-workshop/issues/new) repository issue submission form.

## Objectives

- Access Developer Cloud Service
- Import Code from external Git Repository
- Import Project into Eclipse
- Build and Deploy project using Developer Cloud Service and Oracle Application Container Cloud Service

## Required Artifacts

- The following lab requires an Oracle Public Cloud account that will be supplied by your instructor. You will need to download and install latest version of Eclipse. Instructions are found in the Student Guide.

# Create Initial Mobile Client Project

## Create React Native Project

### **STEP 1**: Install Dependencies

In order to create the client mobile application for the dealership contact user, we will be using React Native - a JavaScript framework for building cross-platform, native applications. To create our initial React Native project we must first install the necessary dependencies described in React Native's [Getting Started page.](https://facebook.github.io/react-native/docs/getting-started.html). We will be using [**Homebrew**](https://brew.sh/) (Mac only) and [**npm**](https://www.npmjs.com/). If you do not have a Mac, please use some other preferred package manager for your OS.

- Using your terminal, install **Node** and **Watchman**:

```console
brew install node
brew install watchman
```

  ![](images/200/Picture11.png)  

- Then, use **npm** (which comes with Node) to globally install the **React Native CLI**.

```console
npm install -g react-native-cli
```

  ![](images/200/Picture11.png)  

### **STEP 2**: Generate Project Boilerplate

- Use the **React Native CLI** to generate our **React Native** project boilerplate called "AutoDealer".

```console
react-native init AutoDealer
```

    ![](images/200/Picture11.png)  

### **STEP 3**: Test Run Initial Application

- Use the **React Native CLI** to run the *Xcode** iOS Simulator for iPhone X.

```console
react-native run-ios --simulator="iPhone X"
```

  ![](images/200/Picture13.png)

  ![](images/200/Picture13.png)  

  ![](images/200/Picture13.png)  

- After verifying the application is running properly, close the iOS Simulator and terminate associated processes.

## Add Project Implementation

### **STEP 4**: Add App Implementation Directory

Now that we have the **React Native** project properly built, let's add the directory which contains our project code and then edit the project configuration files to actually implement the code.

- In project repository previously cloned in Lab 200, copy the `app` directory.

    ![](images/200/Picture20.png)  

- Paste the `app` directory into the root directory of your React Native project.

    ![](images/200/Picture21.png)  

### **STEP 5**: Edit Project Configuration Files

Right now, the `index.js` file is pointing at the wrong `App.js` file and the `package.json` does not reflect the dependecies that need to be installed. Furthermore, we require a new `config.js` file to store the access keys and URLs of our **AMCe Mobile Backend and API** created in Lab300.

- In a text editor, open the `index.js` file in the project root and replace:

`import App from './App';`

with

`import App from './app/App';` 

- Now we can just delete the deprecated `App.js` file.

  ![](images/200/Picture32.png)  

- Next, open the `package.json` file and copy/paste the following into `"dependencies"` and `"devDependencies"` (versions may vary):

```json
  "dependencies": {
    "axios": "^0.18.0",
    "lodash": "^4.17.10",
    "native-base": "^2.4.3",
    "prop-types": "^15.6.1",
    "react": "16.3.1",
    "react-native": "0.55.4",
    "react-native-icon-badge": "^1.1.3",
    "react-native-pull-to-refresh": "^2.1.3",
    "react-native-push-notification": "^3.0.2",
    "react-native-svg": "^6.3.1",
    "react-native-vector-icons": "^4.6.0",
    "react-navigation": "^1.5.11",
    "react-redux": "^5.0.7",
    "redux": "^4.0.0",
    "redux-thunk": "^2.2.0",
    "victory-native": "^0.17.4"
  },
  "devDependencies": {
    "babel-jest": "22.4.3",
    "babel-preset-react-native": "4.0.0",
    "jest": "22.4.3",
    "react-test-renderer": "16.3.1"
  }
```

  ![](images/200/Picture33.png)  

- In the project's root, create a file called `config.js` and paste the following code:

```javascript
const BASE_URL = '<Credit Union API Base URL>';
const HEADERS = {
    auth: {
        'username': '<IDCS User Name>',
        'password': '<IDCS Password>'
    },
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Oracle-Mobile-Backend-Id': '<CreditUnion MBE ID>'
    }  
}

export const config = { BASE_URL, HEADERS };
```

- For `'Oracle-Mobile-Backend-Id'` copy/paste the **Backend ID** of the **AMCe Mobile Backend** you created in Lab 100 found here:

    ![](images/200/Picture34.3.png)  

- For `'Username'` and `'password'` use your IDCS login information used to login into your **AMCe** environment.

- For `const BASE_URL` copy/paste the base URL of the **AMCe Custom API** you created in Lab 300 found here:

    ![](images/200/Picture34.3.png)  

## Build Working Application

### **STEP 6**: Install and Configure App Dependencies

Now that we've added the application's implementation and edited/added the configuration files to reflect our changes, we will install the app dependencies defined in `package.json` and then link the **React Native** libraries to our Xcode project. Finally, we must manually link the `PushNotificationsIOS` library which we will more dive deeper into in Lab 600.

- Use **npm** to install the node modules defined in `package.json`.

    ```console
    npm install
    ```

    ![](images/200/Picture39.2.png)  

- Use the **React Native CLI** to automatically link the newly installed **React Native** libraries to our actual Xcode project.

    ```console
    react-native link
    ```

    ![](images/200/Picture39.2.png)  

### **STEP 7**: Configure Push Notifications Library

We have now linked all of the **React Native** libraries except for the `PushNotificationsIOS` library, which must be manually linked. To do so we will have to actually go into our Xcode project and edit the configuration settings/files to properly include the library. The official **React Native** documentation on this process can be found [here](https://facebook.github.io/react-native/docs/pushnotificationios.html).

- In the `ios/` directory of your **React Native** project, open up the Xcode project called `AutoDealer.xcodeproj`.

    ![](images/200/Picture42.png)  

- Once we have the Xcode project pulled up, the first step in manually linking our `PushNotificationsIOS` library is to drag the library's `.xcodeproj` file found in `node_modules/react-native/PushNotificationsIOS/` and drop it into the `Libraries` group in your Xcode project.

    ![](images/200/Picture43.png)  

- Next, click the main project file within Xcode (the one that represents the `.xcodeproj`), select `Build Phases`, and drag the static library from the `Products` folder inside the Library you are importing to `Link Binary With Libraries`.

    ![](images/200/Picture44.png)  

- Because we will be calling this library from our native code, we must include the library's headers in our search path. To do so, go to the main project file within Xcode (as before), select `AutoDealer` under the `Targets` section, select `Build Settings`, and, under `Search Paths/Header Search Paths`, include the following library path: `$(SRCROOT)/../node_modules/react-native/Libraries/PushNotificationsIOS`

    ![](images/200/Picture45.png)  

- Lastly, to enable support for notification and register events you need to augment your `AppDelegate.m` as follows:

    At the top of your AppDelegate.m:

    `#import <React/RCTPushNotificationManager.h>`

    And then in your AppDelegate implementation add the following:

    ```
    // Required to register for notifications
    - (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
    {
    [RCTPushNotificationManager didRegisterUserNotificationSettings:notificationSettings];
    }
    // Required for the register event.
    - (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
    {
    [RCTPushNotificationManager didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
    }
    // Required for the notification event. You must call the completion handler after handling the remote notification.
    - (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
                                                            fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
    {
    [RCTPushNotificationManager didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
    }
    // Required for the registrationError event.
    - (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
    {
    [RCTPushNotificationManager didFailToRegisterForRemoteNotificationsWithError:error];
    }
    // Required for the localNotification event.
    - (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification
    {
    [RCTPushNotificationManager didReceiveLocalNotification:notification];
    }
    ```

    ![](images/200/Picture45.png)  

### **STEP 8**: Test Run Working Application

Now we should have everything installed and configured to test run our working, fully implemented application. This time, however, instead of using the **React Native CLI** to run the iOS Simulator, we will build the project and run the iOS Simulator using Xcode.

- On the left side of the top bar in Xcode, select the build `Target` (`AutoDealer`), the iOS Simulator Device (e.g. `iPhone 8 Plus`) to run it on, and then click the "Play" arrow button to build and run the current scheme.

    ![](images/200/Picture46.2.png)  

- Once the simulator is up and running the application should be pulling the loan data correctly, initially displaying a dashboard of the Auto Dealer's loan profiles and a percentage breakdown of their loan values as so:

    ![](images/200/Picture46.2.png)  

- Once you have verified that your mobile application is correctly working, stop the project by clicking the "Stop" square button.

    ![](images/200/Picture46.2.png)  
