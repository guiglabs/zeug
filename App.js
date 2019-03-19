import React from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { Font } from 'expo';


import { createStore, applyMiddleware, compose } from 'redux';
import { Provider, connect } from 'react-redux';
import logger from './src/redux/middlewares/logger';
import api from './src/redux/middlewares/api';
import { promiseMiddleware } from './src/redux/middlewares/promise';
import reducers from './src/redux/reducers/reducers';
import { getCurrentSession } from './src/redux/actions/actions';

import AppNavigator from './src/navigation/AppNavigator';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(promiseMiddleware)));

const RootApp = () => (
  <Provider store={store}>
    <ConnectedApp />
  </Provider>
);

export default RootApp;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
    };
  }

  componentDidMount() {
    Font.loadAsync({
      Fira: require('./assets/fonts/FiraMono-Regular.ttf'),
    }).then(() => this.setState({ fontsLoaded: true }));
  }

  render() {
    if (this.state.fontsLoaded) {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
    return (
      <View>
        <Text>loading</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  words: state.words,
});

const mapDispatchToProps = dispatch => ({
  getCurrentSession: words => dispatch(getCurrentSession(words)),
});

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
