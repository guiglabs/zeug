import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Tutorial from '../screens/Tutorial';
import Game from '../screens/Game';
import Stats from '../screens/Stats';
import Results from '../screens/Results';
import Signup from '../screens/Signup';

const navigator = createStackNavigator(
  {
    Game, Tutorial, Stats, Results, Signup,
  },
  {
    initialRouteName: 'Game',
    headerMode: 'none',
  },
);

const AppContainer = createAppContainer(navigator);
const AppNavigator = () => <AppContainer />;
export default AppNavigator;
