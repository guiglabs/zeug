import React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  Animated,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import Drawer from 'react-native-drawer';

import { connect } from 'react-redux';
import {
  getSession, graduateWord, moveToTheBack, updateCard,
} from '../redux/actions/actions';

import Card from '../components/Card';
import DrawerContent from '../components/DrawerContent';
import AnswerInterface from '../components/AnswerInterface';

import { vw } from '../utils/react-native-viewport-units';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackColour: 'blue',
      displayArticle: false,
      circleSize: new Animated.Value(0),
      opacity: new Animated.Value(0),
      gameDone: false,
    };
    this.getAnswer = this.getAnswer.bind(this);
  }

  closeControlPanel = () => {
    // eslint-disable-next-line no-underscore-dangle
    this._drawer.close();
  };

  openControlPanel = () => {
    // eslint-disable-next-line no-underscore-dangle
    this._drawer.open();
  };

  componentDidMount() {
    this.props.getSession();
  }

  getAnswer(answer) { // (givenAnswer: String, rightAnser: String, onCorrect, onIncorrect, currentSession, graduatedWords, )
    if (answer === this.props.currentSession[0].article) {
      this.flashBackground(true);
    } else {
      this.flashBackground(false);
    }

    setTimeout(() => {
      const word = this.props.currentSession[0];
      const correct = answer === word.article;

      // SEEN vs UNSEEN
      // Unseen cards need to be correctly answered **twice conescutivly** before graduating
      // Seen cards can graduate if the first answer is correct
      // CORRECT vs INCORRECT
      // If it's correct on the second time it should graduate the card
      // consecutiveCorrectAnswers >= 2 vs consecutiveCorrectAnswers < 2

      if (word.firstAnswerCorrect === null) {
        word.firstAnswerCorrect = correct;
      }

      if (!correct) {
        word.firstAnswerCorrect = false;
      }

      // if firstAnswerCorrect === null
      //   firstAnswerCorrect = correct [true | false];
      // if firstAnswerCorrect === true && !correct
      //   firstAnswerCorrect = false

      const unseen = word.stage === 'UNSEEN';

      if (unseen) { // if UNSEEN
        if (correct) { // if CORRECT
          word.consecutiveCorrectAnswers++;
          if (word.consecutiveCorrectAnswers >= 2) {
            this.updateCard(word.cardId, word.wordId, word.firstAnswerCorrect); // correct is a boolean. In this case is false.
            this.props.graduateWord(word); // graduate it
          } else {
            this.props.moveToTheBack(); // push it to the back of the array
          }
        } else { // if INCORRECT
          word.consecutiveCorrectAnswers = 0;
          this.props.moveToTheBack(); // push it to the back of the array
        }
      } else { // if SEEN // seen cards are initialized with consecutiveCorrectAnswers = 1 in the server
        if (correct) { // if CORRECT
          word.consecutiveCorrectAnswers++;
          if (word.consecutiveCorrectAnswers >= 2) {
            this.updateCard(word.cardId, word.wordId, word.firstAnswerCorrect); // correct is a boolean. In this case is false.
            this.props.graduateWord(word); // graduate it
          } else {
            this.props.moveToTheBack(); // push it to the back of the array
          }
        } else { // if INCORRECT
          word.consecutiveCorrectAnswers = 0;
          this.props.moveToTheBack(); // push it to the back of the array
        }
      }

      const gameDone = this.props.currentSession.length < 1;
      this.setState({ gameDone });
    // this.setState(currentState => { STATE REDUCER PATTERN
    //   const newState = magicalFunction(currentState)
    //   return newState;
    // })
    }, 1000);
  }

  updateCard(cardId, wordId, correct) {
    console.log(cardId, wordId, correct);

    this.props.updateCard({ id: cardId, correct });
    // fetch('http://192.168.1.204:3000/cards', {
    //   method: 'PUT',
    //   body: JSON.stringify({ cardId, wordId, correct }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // }).catch((error) => {
    //   console.log(error); // eslint-disable-line no-console
    // });
    // return this;
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
        this.state.circleSize,
        {
          toValue: 0,
          duration: 800,
        },
      ),
      Animated.timing(
        this.state.opacity,
        {
          toValue: 0,
          duration: 900,
        },
      ),
    ];
    Animated.stagger(100, animations).start();
  }

  flashBackground(correct) {
    const displayArticle = true;
    let feedbackColour;
    if (correct) {
      feedbackColour = 'green';
    } else {
      feedbackColour = 'red';
    }
    this.setState({ feedbackColour, displayArticle });
    setTimeout(() => this.setState({ feedbackColour: 'white', displayArticle: false }), 1000);
    this.showAnswer();
  }

  renderCard() {
    return <Card word={this.props.currentSession[0]} displayArticle={this.state.displayArticle} />;
  }

  render() {
    if (this.state.gameDone) {
      return this.props.navigation.navigate('Results');
    }

    const size = this.state.circleSize.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 19.5],
    });

    const opacity = this.state.opacity.interpolate({
      inputRange: [0, 0.2, 1],
      outputRange: [1, 0, 0],
    });

    return (
      <Drawer
        ref={ref => this._drawer = ref}
        content={<DrawerContent closeDrawer={this.closeControlPanel.bind(this)} />}
        type="overlay"
        openDrawerOffset={viewport => viewport.width / 7 * 5}
        side="right"
        tapToClose
        styles={drawerStyles}
        acceptPan={false}
        tweenDuration={200}
        negotiatePan
      >

        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.wordCount}>
              {this.props.currentSession.filter(a => a.stage === 'UNSEEN').length}
              {' '}
              {this.props.currentSession.filter(a => a.stage === 'SEEN').length}
            </Text>
            <TouchableHighlight
              onPress={this.openControlPanel}
              style={{
                height: 50, width: 50, borderRadius: 30, justifyContent: 'center', alignItems: 'center',
              }}
            >
              <Ionicons name="md-menu" size={32} color="gray" />
            </TouchableHighlight>
          </View>
          <View style={{ width: 90 * vw, height: 90 * vw }}>
            {this.renderCard()}
            <Animated.View
              style={[
                styles.feedback,
                { transform: [{ scale: size }], opacity, backgroundColor: this.state.feedbackColour }]}
            >
            </Animated.View>
          </View>
          <View style={styles.answerInput}>
            <AnswerInterface getAnswer={this.getAnswer} />
          </View>
        </View>
      </Drawer>
    );
  }
}

const mapStateToProps = state => ({
  currentSession: state.words.currentSession,
  loading: state.words.loading,
  words: state.words,
  appState: state.appState,
});

const mapDispatchToProps = dispatch => ({
  getSession: () => dispatch(getSession()),
  graduateWord: card => dispatch(graduateWord(card)),
  moveToTheBack: () => dispatch(moveToTheBack()),
  updateCard: card => dispatch(updateCard(card)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Game);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    paddingTop: 25,
    paddingLeft: 20,
  },
  wordCount: {
    color: 'gray',
    fontSize: 20,
    fontFamily: 'Fira',
  },
  feedback: {
    position: 'absolute',
    width: 90 * vw,
    height: 90 * vw,
    borderRadius: 90 * vw,
    zIndex: -10,
  },
  answerInput: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
});

const drawerStyles = {
  drawer: {
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: -30,
    backgroundColor: 'yellow',
  },
};
