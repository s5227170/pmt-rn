import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, useDispatch } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import AppNavigator from './navigation/AppNavigator';

import articleReducer from './store/reducers/articlesReducer';
import authReducer from './store/reducers/authReducer';

const rootReducer = combineReducers({
  articles: articleReducer,
  auth: authReducer
})
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "nunito-light": require("./assets/fonts/Nunito-Light.ttf"),
    "mukta-extra-light": require("./assets/fonts/Mukta-ExtraLight.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <AppNavigator/>
    </Provider>
  )
}

const styles = StyleSheet.create({});
