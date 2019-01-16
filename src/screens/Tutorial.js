import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image
} from 'react-native';

import Swiper from 'react-native-swiper';

export default class Tutorial extends React.Component {
  render() {
    return (
      <Swiper loop={false}>
        <View style={slideStyles.slide2}>
          <Text style={styles.text, {fontFamily: 'Fira', fontSize: 35, textAlign: 'center'}}>This is a</Text>
          <Text style={styles.text, {fontFamily: 'Fira', fontSize: 35, textAlign: 'center', backgroundColor: 'yellow'}}>language learning</Text>
          <Text style={styles.text, {fontFamily: 'Fira', fontSize: 35, textAlign: 'center'}}>application</Text>
        </View>
        <View style={slideStyles.slide2}>
        <Text style={styles.text, {fontFamily: 'Fira', fontSize: 60, textAlign: 'center'}}># 46: 🏛️</Text>
          <Text style={styles.text, {fontFamily: 'Fira', fontSize: 60, textAlign: 'center'}}># 3422: 🍎</Text>
        </View>
        <View style={slideStyles.slide1}>
        <Image
        style={{width: 250, height: 250}}
        source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Ebbinghaus2.jpg'}}
        />
          <Text style={styles.text, {fontFamily: 'Fira', fontSize: 30, textAlign: 'center'}}> Hermann Ebbinghaus </Text>
          <Text style={styles.text, {fontFamily: 'Fira', fontSize: 30, textAlign: 'center'}}> 1850 – 1909 </Text>
        </View>
        <View style={slideStyles.slide1}>
          <Text style={styles.text, {fontFamily: 'Fira', fontSize: 70, textAlign: 'center'}}> Der </Text>
          <Text style={styles.text, {fontFamily: 'Fira', fontSize: 70, textAlign: 'center'}}> Die </Text>
          <Text style={styles.text, {fontFamily: 'Fira', fontSize: 70, textAlign: 'center'}}> Das </Text>
          <Text onPress={() => this.props.navigation.navigate('Game')} style={styles.text, {fontFamily: 'Fira', fontSize: 70, textAlign: 'center', backgroundColor: 'yellow'}}> Zeug </Text>
        </View>
        <View style={slideStyles.slide3}>
          <Button
            title="Practice"
            onPress={() => this.props.navigation.navigate('Game')}
          />
        </View>
      </Swiper>
    );
  }
}

const styles = {
  text: {
    fontFamily: 'Fira',
    fontSize: 30,
    textAlign: 'center',
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
}

const slideStyles = {
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    textAlign: 'center'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
    textAlign: 'center'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
    textAlign: 'center'
  },
};
