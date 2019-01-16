import React from 'react';
import AnswerButtons from './AnswerButtons';
import AnswerVoice from './AnswerVoice';
import { connect } from 'react-redux';

const AnswerInterface = props => {
  if (!props.appState.options.voiceInput) {
    return <AnswerButtons getAnswer={props.getAnswer} />;
  } else {
    return <AnswerVoice getAnswer={props.getAnswer} />; // change to voice
  }
};

const mapStateToProps = (state) => ({
  appState: state.appState
});

export default connect(
  mapStateToProps,
)(AnswerInterface);
