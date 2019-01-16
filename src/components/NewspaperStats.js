import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
} from 'react-native';

const { vw, vh, vmin, vmax } = require('react-native-viewport-units'); // eslint-disable-line no-unused-vars

export default class NewspaperStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stubs: this.getStubLengths(vw * 1000),
      stats: {
        matureWords: 134,
      },
    };
    this.animatedColor = [];
    this.state.stubs.forEach((cur, idx) => {
      this.animatedColor[idx] = new Animated.Value(0);
    });
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    const animations = this.state.stubs.map((item, idx) => {
      return Animated.timing(
        this.animatedColor[idx],
          {
            toValue: 1,
            duration: 300
          }
        );
    });
    Animated.stagger(60, animations).start();
  }

  getColorStub(key, length) {
    const hue = Math.floor(Math.random() * (360 - 1) + 1);
    const lightness = Math.floor(Math.random() * (38 - 18) + 18);
    const grayShade = `hsl(0, 0%, ${lightness}%)`;
    const colorShade = `hsl(${hue}, 48%, 48%)`;
    var color = this.animatedColor[key].interpolate({
      inputRange: [0, 1],
      outputRange: [grayShade, colorShade]
    });
    return <Animated.View key={key} style={[styles.stub, {backgroundColor: color, width: this.state.stubs[key]}]} />
  }

  getGrayStub(key, length) {
    const lightness = Math.floor(Math.random() * (38 - 18) + 18);
    const grayShade = `hsl(0, 0%, ${lightness}%)`;
    return <Animated.View key={key} style={[styles.stub, {backgroundColor: grayShade, height: 20, width: this.state.stubs[key], marginLeft: 3, marginTop: 3}]} />
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

  getMaturePercentage() {
    const { matureWords } = this.props;
    const pct = 105.0154 + (0.6811599 - 105.0154) / (1 + Math.pow(matureWords/107.1152, 0.6389192));
    return Math.floor(pct);
  }

  renderStubs() {
    return this.state.stubs.map((cur, idx, arr) => {
      const pct = idx * 100 / arr.length;
      if (pct <= this.getMaturePercentage()) return this.getColorStub(idx, cur)
      return this.getGrayStub(idx, cur);
    });
  }

  render() {
    return (
        <View style={styles.newspaper}>
          {this.renderStubs()}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  newspaper: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'scroll',
  },
  stub: {
    flexGrow: 1,
    margin: 5,
    marginLeft: 3,
    marginTop: 3,
    height: 20,
    width: 100,
    borderRadius: 15,
  }
});
