import React, { useEffect } from 'react'
import Routes from './src/navigation/Routes';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import SplashScreen from "react-native-splash-screen";

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{ backgroundColor: '#00C853' }}
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
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ backgroundColor: 'red', marginTop: 5 }}
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