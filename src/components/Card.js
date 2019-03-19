import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';

import {
  vw,
} from '../utils/react-native-viewport-units';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      circleSize: new Animated.Value(0),
      opacity: new Animated.Value(0),
      fontSize: 12 * vw,
      showArticle: true,
      scale: new Animated.Value(0),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.word) this.getSize(nextProps.word.substantive);
  }

  getSize(word) {
    const fontSize = 86 * vw / word.length * 1.3;
    this.setState({ fontSize });
  }

  showAnswer() {
    const animations = [
      Animated.timing(
        this.state.circleSize,
        {
          toValue: 1,
          duration: 900,
        },
      ),
      Animated.timing(
        this.state.opacity,
        {
          toValue: 1,
          duration: 1200,
        },
      ),
      Animated.timing(
        this.state.opacity,
        {
          toValue: 0,
          duration: 600,
        },
      ),
    ];
    Animated.stagger(100, animations).start();
  }

  render() {
    const size = this.state.circleSize.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 2.5],
    });

    const opacity = this.state.opacity.interpolate({
      inputRange: [0, 0.8, 1],
      outputRange: [1, 1, 0],
    });

    return (
      <View>
        <View style={styles.card}>
          <Animated.Text style={[styles.article, { opacity: 1, marginBottom: 16 * vw }]}>{this.props.displayArticle ? this.props.word && this.props.word.article || ' ' : ' '}</Animated.Text>
          <Text style={[styles.substantive, { fontSize: this.state.fontSize, marginTop: -26 * vw }]}>{this.props.word && this.props.word.substantive || ' '}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
    borderRadius: 90 * vw,
    width: 90 * vw,
    height: 90 * vw,
  },
  article: {
    position: 'absolute',
    fontFamily: 'Fira',
    textAlign: 'center',
    maxWidth: 86 * vw,
    alignItems: 'center',
    fontSize: 12 * vw,
    textAlign: 'center',
    top: 50,
    // opacity: 0,
  },
  substantive: {
    position: 'absolute',
    fontFamily: 'Fira',
    maxWidth: 86 * vw,
    alignItems: 'center',
    fontSize: 25.5 * vw,
    textAlign: 'center',
  },
});
