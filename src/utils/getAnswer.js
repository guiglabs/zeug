getAnswer (answer) { // (givenAnsewr: String, rightAnser: String, onCorrect, onIncorrect, currentSession, graduatedWords, )
  if (answer === this.state.currentSession[0].article) {
    this.flashBackground(true);
  } else {
    this.flashBackground(false);
  }
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
  this.setState({currentSession, graduatedWords});
  // this.setState(currentState => { STATE REDUCER PATTERN
  //   const newState = magicalFunction(currentState)
  //   return newState;
  // })
} // backgroundColor

return currentSession, graduatedWords
