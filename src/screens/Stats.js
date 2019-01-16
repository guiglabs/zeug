import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

import NewspaperStats from '../components/NewspaperStats';
import PercentageCounter from '../components/PercentageCounter';

const { vw, vh, vmin, vmax } = require('react-native-viewport-units'); // eslint-disable-line no-unused-vars
import { Ionicons } from '@expo/vector-icons';

export default class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: {
        matureWords: 134
      }
    };
  }

  getMaturePercentage() {
    const { matureWords } = this.state.stats;
    const pct = 105.0154 + (0.6811599 - 105.0154) / (1 + Math.pow(matureWords/107.1152, 0.6389192));
    return Math.floor(pct);
  }

  handlePress() {
    this.props.navigation.navigate('Game');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{alignItems: 'flex-end', width: '100%', marginRight: 30}}>
          <TouchableHighlight onPress={() => this.props.navigation.navigate('Game')} style={{height: 50, width: 50, borderRadius: 30, justifyContent: 'center', alignItems: 'center'}}>
            <Ionicons name="md-arrow-back" size={32} color="gray" />
          </TouchableHighlight>
        </View>
        <NewspaperStats matureWords={this.state.stats.matureWords} />
          <PercentageCounter style={[styles.percentage, {color: 'yellow'}]} end={this.getMaturePercentage()}/>
          <Text style={styles.explanation}>You know {this.state.stats.matureWords} words, wich make up about {this.getMaturePercentage()}% of everyday conversation, newspapers and magazines.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: vw * 5,
    flex: 1,
    flexDirection: 'column',
    paddingTop: 20,
    backgroundColor: '#1e1e1e',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  explanation: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    fontWeight: '100',
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Fira',
  },
  percentage: {
    textAlign: 'center',
    lineHeight: vw * 25,
    fontSize: 30,
    fontWeight: '100',
  },
});
