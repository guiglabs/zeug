import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';

import {
  vw,
} from '../utils/react-native-viewport-units';

const arr = [];
for (let i = 0; i < 500; i++) {
  arr.push(i);
}

export default class Squares extends Component {
  constructor() {
    super();
    this.arr = this.getStubLengths(vw * 1000);
    this.animatedValue = [];
    this.arr.forEach((value) => {
      this.animatedValue[value] = new Animated.Value(0);
    });
  }

  getStubLengths(total) {
    const min = vw * 10;
    const max = vw * 30;
    const result = [];
    const sum = result.reduce((cur, acc) => acc += curr, 0);
    while (total > max) {
      const rand = Math.floor(Math.random() * (max - min) + min);
      result.push(rand);
      total -= rand;
    }
    result.push(total - sum);
    return result;
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    const animations = this.arr.map(item => Animated.timing(
      this.animatedValue[item],
      {
        toValue: 1,
        duration: 2000,
      },
    ));
    Animated.stagger(10, animations).start();
  }

  render() {
    const animations = this.arr.map((a, i) => (
      <Animated.View
        key={i}
        style={{
          opacity: this.animatedValue[i], height: 20, width: a * vw, backgroundColor: 'red', marginLeft: 3, marginTop: 3,
        }}
      />
    ));
    return (
      <View style={styles.container}>
        {animations}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
