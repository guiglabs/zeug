import React from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text
} from 'react-native';
import { Font } from 'expo';

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import reducers from './src/reducers/reducers';
import { getCurrentSession } from './src/actions/actions';
let store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__());

import AppNavigator from './src/navigation/AppNavigator';

export default class RootApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedApp />
      </Provider>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false
    }
  }
  componentDidMount() {
    Font.loadAsync({
      'Fira': require('./assets/fonts/FiraMono-Regular.ttf'),
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
    } else {
      return (
        <View>
          <Text>loading</Text>
        </View>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  words: state.words,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentSession: (words) => dispatch(getCurrentSession(words)),
});

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
