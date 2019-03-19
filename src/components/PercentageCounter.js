import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  NativeModules,
  LayoutAnimation,
} from 'react-native';

import {
  vw,
} from '../utils/react-native-viewport-units';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental
  && UIManager.setLayoutAnimationEnabledExperimental(true);

export default class PercentageCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percentage: 1,
      fontSize: 20,
      circleSize: 20 * vw,
    };
  }

  componentDidMount() {
    const getPercentage = () => {
      const percentage = this.state.percentage + 1;
      this.setState({ percentage });
      if (percentage < this.props.end) {
        setTimeout(getPercentage, 10);
      } else {
        const fontSize = 25;
        const circleSize = vw * 20 + 5;
        LayoutAnimation.spring();
        this.setState({ fontSize, circleSize });
      }
    };
    getPercentage();
  }

  render() {
    return (
      <Text style={[styles.container, {
        borderRadius: this.state.circleSize, width: this.state.circleSize, height: this.state.circleSize, fontSize: this.state.fontSize, color: 'black', textAlign: 'center',
      }]}
      >
        {this.state.percentage}
        {' '}
%
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    lineHeight: 20 * vw,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
    textAlign: 'center',
    margin: 25,
    fontFamily: 'Fira',
  },
});
