import React from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  NativeModules,
  LayoutAnimation,
} from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { toggleVoice, shouldAnimateUnmount } from '../redux/actions/actions';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental
  && UIManager.setLayoutAnimationEnabledExperimental(true);

class AnswerVoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      w: 80,
      h: 80,
    };
  }

  componentDidMount() {
    this.props.shouldAnimateUnmount(false);
  }

  componentDidUpdate() {
    if (this.props.appState.events.unmountingInputMethod && this.props.appState.options.voiceInput) {
      this.props.toggleVoice();
    }
  }

  _onPressIn = () => {
    w = h = this.state.w + 40;
    this.setState({ w, h });
    LayoutAnimation.spring();
  }

  _onPressOut = () => {
    w = h = this.state.w - 40;
    this.setState({ w, h });
    LayoutAnimation.spring();
  }

  render() {
    return (
      <TouchableHighlight onPressIn={this._onPressIn} onPressOut={this._onPressOut} style={[styles.button, { height: this.state.h, width: this.state.w }]}>
        <Ionicons name="md-mic" color="white" size={this.state.w - 50} style={{ margin: 5 }} />
      </TouchableHighlight>
    );
  }
}

const mapStateToProps = state => ({
  appState: state.appState,
});

const mapDispatchToProps = dispatch => ({
  toggleVoice: () => dispatch(toggleVoice()),
  shouldAnimateUnmount: unmountingInputMethod => dispatch(shouldAnimateUnmount(unmountingInputMethod)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnswerVoice);

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'red',
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
