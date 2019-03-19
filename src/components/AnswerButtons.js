import React from 'react';
import {
  StyleSheet,
  View,
  Animated
} from 'react-native';
import { connect } from 'react-redux';
import AnimatedButton from './AnimatedButton';

import { toggleVoice, shouldAnimateUnmount } from '../redux/actions/actions';

class AnswerButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonStates: [
        {text: 'der', buttonState: 'off'},
        {text: 'die', buttonState: 'off'},
        {text: 'das', buttonState: 'off'}],
      unmounting: false
    };
  }

  componentDidMount() {
    this.props.shouldAnimateUnmount(false);
  }

  componentDidUpdate() {
    if (this.props.unmountingInputMethod && !this.props.voiceInput) {
      this.setState({unmounting: true});
      // animation
      this.props.toggleVoice();
    }
  }

  selectButton = (text) => {
    let buttons;

    switch (text) {
    case 'der':
      buttons = ['down', 'blurred', 'blurred'];
      break;
    case 'die':
      buttons = ['blurred', 'down', 'blurred'];
      break;
    case 'das':
      buttons = ['blurred', 'blurred', 'down'];
      break;
    default:
      buttons = ['off', 'off', 'off'];
    }

    const buttonStates = buttons.map((button, idx) => {
      return {text: this.state.buttonStates[idx].text, buttonState: button};
    });
    this.setState({buttonStates});
  };

  render() {

    return (
      <View style={styles.container}>
        {this.state.buttonStates.map((button, idx, buttons) => {
          return (
            <AnimatedButton
              key={button.text}
              onPress={this.props.onPress}
              getAnswer={this.props.getAnswer}
              selectButton={this.selectButton.bind(this)}
              buttonEvent={buttons[idx].buttonState}
              className={button.text}
              text={button.text}
              style={this.state.buttonStyle}
              unmounting={this.state.unmounting} />
          );
        })}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  unmountingInputMethod: state.appState.events.unmountingInputMethod,
  voiceInput: state.appState.options.voiceInput
});

const mapDispatchToProps = (dispatch) => ({
  toggleVoice: () => dispatch(toggleVoice()),
  shouldAnimateUnmount: (unmountingInputMethod) => dispatch(shouldAnimateUnmount(unmountingInputMethod)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnswerButtons);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
