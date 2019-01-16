import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native';

import Confetti from 'react-native-confetti';

export default class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if(this._confettiView) {
      this._confettiView.startConfetti();
    }
  }

  render() {
    return (
      <View style={styles.container}>
      <Confetti ref={(node) => this._confettiView = node}/>
        <Text style={styles.text}>You are done for today</Text>
        <Button
          title="See your stats"
          style={styles.text}
          onPress={() => this.props.navigation.navigate('Stats')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#92BBD9',
},
text: {
  textAlign: 'center',
  fontFamily: 'Fira',
  color: '#fff',
  fontSize: 30,
  fontWeight: 'bold',
  },
});
