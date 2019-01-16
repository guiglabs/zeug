import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  NativeModules,
  LayoutAnimation,
} from 'react-native';

const { UIManager } = NativeModules;
const { vw, vh, vmin, vmax } = require('react-native-viewport-units'); // eslint-disable-line no-unused-vars

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class AnimatedButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      w: 25.5 * vw,
      h: 25.5 * vw,
      buttonOnUnmount: {
        position: 'absolute',
        left: (-25.5 * vw) / 2,
        bottom: 10,
      }
    };
  }

  _onPressIn = () => {
    this.props.selectButton(this.props.text);
  };

  _onPressOut = () => {
    this.props.getAnswer(this.props.text);
    setTimeout(() => {
      this.props.selectButton(false);
    }, 1000);
  };

  animatePress() {
    let color;
    let h;
    let w;

    switch (this.props.buttonEvent) {
    case 'down':
      w = h = this.state.w + 15;
      break;
    case 'blurred':
      w = h = this.state.w - 55;
      color = 'lightblue';
      break;
    default:
      w = h = this.state.w - 15;
    }
    LayoutAnimation.spring();
    return [w, h, color];
  }

  render() {

    const [w, h, color] = this.animatePress();

    return (
      <TouchableOpacity
        onPressIn={this._onPressIn}
        onPressOut={this._onPressOut}
        style={[styles.button, {width: w, height: h}, (this.props.unmounting ? this.state.buttonOnUnmount : {color: 'black'})]}>
        <Text style={[
          styles.text,
          {color: color},
        ]}>
          {this.props.text}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    height: 25.5 * vw,
    width: 25.5 * vw,
    borderRadius: 25.5 * vw,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginLeft: 10,
    fontFamily: 'Fira',
  },
  text: {
    fontFamily: 'Fira',
    fontSize: 18,
  }
});
