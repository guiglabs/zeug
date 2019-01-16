import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Tutorial from '../screens/Tutorial';
import Game from '../screens/Game';
import Stats from '../screens/Stats';
import Results from '../screens/Results';

const navigator = createStackNavigator(
  { Game, Tutorial, Stats, Results },
  {
    initialRouteName: 'Tutorial',
    headerMode: 'none',
  },
);

const AppContainer = createAppContainer(navigator);

export default class AppNavigator extends React.Component {
  render() {
    return <AppContainer />;
  }
}
