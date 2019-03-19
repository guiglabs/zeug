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

import Card from '../components/Card';
import DrawerContent from '../components/DrawerContent';
import AnswerInterface from '../components/AnswerInterface';

import {
  vw,
} from '../utils/react-native-viewport-units';

const BASE_URL = 'http://localhost:3000';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSession: [], // includes all words fetched
      graduatedWords: [], // when a word is answered correctly twice it is graduated. This will be sent to the API to pass it to sm2
      feedbackColour: 'blue',
      displayArticle: false,
      feedback: null,
      circleSize: new Animated.Value(0),
      opacity: new Animated.Value(0),
      fontSize: 12 * vw,
      showArticle: true,
      scale: new Animated.Value(0),
      gameDone: false,
    };
    this.getAnswer = this.getAnswer.bind(this);
  }

  closeControlPanel = () => {
    this._drawer.close();
  };

  openControlPanel = () => {
    this._drawer.open();
  };

  componentDidMount() {
    fetch(`${BASE_URL}/cards`,
      {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTU1Mjg0MDQ0NSwiZXhwIjoxNTg0Mzc2NDQ1fQ.GurD54Myontk9eb7nk7AKwIh2p2xXsX0I-92w4YpORg',
        },
      })
      .then(response => response.json())
      .then((words) => {
        if (words.length < 1) this.props.navigation.navigate('Results');
        this.setState({ currentSession: words });
      }).catch((error) => {
        console.error('Error while trying to fetch cards', error); // eslint-disable-line no-console
      });
  }

  updateCard(cardId, wordId, correct) {
    fetch('http://192.168.1.204:3000/cards', {
      method: 'PUT',
      body: JSON.stringify({ cardId, wordId, correct }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch((error) => {
      console.log(error); // eslint-disable-line no-console
    });
  }

  getAnswer(answer) { // (givenAnsewr: String, rightAnser: String, onCorrect, onIncorrect, currentSession, graduatedWords, )
    if (answer === this.state.currentSession[0].article) {
      this.flashBackground(true);
      this.setState({ feedback: 'positive' });
    } else {
      this.flashBackground(false);
      this.setState({ feedback: 'negative' });
    }

    setTimeout(() => {
      const word = this.state.currentSession[0];
      const correct = answer === word.article;
      const { currentSession, graduatedWords } = this.state;

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

      if (word.stage === 'UNSEEN') { // if UNSEEN
        if (correct) { // if CORRECT
          word.consecutiveCorrectAnswers++;
          if (word.consecutiveCorrectAnswers >= 2) {
            this.updateCard(word.cardId, word.wordId, word.firstAnswerCorrect); // correct is a boolean. In this case is false.
            graduatedWords.push(currentSession.shift()); // graduate it
          } else {
            currentSession.push(currentSession.shift()); // push it to the back of the array
          }
        } else { // if INCORRECT
          word.consecutiveCorrectAnswers = 0;
          currentSession.push(currentSession.shift()); // push it to the back of the array
        }
      } else { // if SEEN // seen cards are initialized with consecutiveCorrectAnswers = 1 in the server
        if (correct) { // if CORRECT
          word.consecutiveCorrectAnswers++;
          if (word.consecutiveCorrectAnswers >= 2) {
            this.updateCard(word.cardId, word.wordId, word.firstAnswerCorrect); // correct is a boolean. In this case is false.
            graduatedWords.push(currentSession.shift()); // graduate it
          } else {
            currentSession.push(currentSession.shift()); // push it to the back of the array
          }
        } else { // if INCORRECT
          word.consecutiveCorrectAnswers = 0;
          currentSession.push(currentSession.shift()); // push it to the back of the array
        }
      }
      const gameDone = currentSession.length < 1;
      this.setState({ currentSession, graduatedWords, gameDone });
    // this.setState(currentState => { STATE REDUCER PATTERN
    //   const newState = magicalFunction(currentState)
    //   return newState;
    // })
    }, 1000);
  } // feedbackColour

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
    const feedback = null;
    this.setState({ feedbackColour, displayArticle, feedback });
    setTimeout(() => this.setState({ feedbackColour: 'white', displayArticle: false }), 1000);
    this.showAnswer();
  }

  renderCard() {
    return <Card word={this.state.currentSession[0]} displayArticle={this.state.displayArticle} />;
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
              {this.state.currentSession.filter(a => a.stage === 'UNSEEN').length}
              {' '}
              {this.state.currentSession.filter(a => a.stage === 'SEEN').length}
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
  words: state.words,
  appState: state.appState,
});

const mapDispatchToProps = dispatch => ({
  getCurrentSession: words => dispatch(getCurrentSession(words)),
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
