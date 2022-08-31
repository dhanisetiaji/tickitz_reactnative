import React, { useEffect } from 'react'
import { Alert } from 'react-native';
import Routes from './src/navigation/Routes';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import SplashScreen from "react-native-splash-screen";
import OneSignal from 'react-native-onesignal';
import messaging from '@react-native-firebase/messaging';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    // console.log('Authorization status:', authStatus);
  }
}

// OneSignal Initialization
// OneSignal.setAppId('ed6bd84e-549c-401a-853c-f34491d7f806');
// OneSignal.promptForPushNotificationsWithUserResponse();
// OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
//   console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
//   let notification = notificationReceivedEvent.getNotification();
//   console.log("notification: ", notification);
//   const data = notification.additionalData
//   console.log("additionalData: ", data);
//   notificationReceivedEvent.complete(notification);
// });
// OneSignal.setNotificationOpenedHandler(notification => {
//   console.log("OneSignal: notification opened:", notification);
// });

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: '#00C853', padding: 10,
        width: '95%'
      }}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      text1Style={{
        fontSize: 17,
        color: '#fff'
      }}
      text2Style={{
        fontSize: 15,
        color: '#fff',
      }}
    />
  ),
  payment: (props) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 10,
        width: '95%',
        borderColor: '#333',
        borderWidth: 1,
      }}
      contentContainerStyle={{ paddingHorizontal: 10, }}
      text1Style={{
        fontSize: 17,
        color: '#333'
      }}
      text2Style={{
        fontSize: 15,
        color: '#333',
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        backgroundColor: 'red', padding: 10,
        width: '95%'
      }}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      text1Style={{
        fontSize: 17,
        color: '#fff'
      }}
      text2Style={{
        fontSize: 15,
        color: '#fff',
      }}
    />
  ),
};

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
    requestUserPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Toast.show({
        type: 'payment',
        text1: remoteMessage.notification.title,
        text2: remoteMessage.notification.body,
      })
    });
    return unsubscribe;
  })

  return (<>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
        <Toast
          config={toastConfig}
          position='top'
          topOffset={10}
        />
      </PersistGate>
    </Provider>
  </>
  )
}

export default App