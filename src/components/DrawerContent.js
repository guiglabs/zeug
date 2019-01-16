import React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { shouldAnimateUnmount } from '../actions/actions';

const DrawerContent = (props) => {

  const buttonAction = (e) => {
    console.log(e);
  };

  const changeInput = () => {
    props.closeDrawer();
    setTimeout(() => props.shouldAnimateUnmount(true), 200);
  }

  const { options } = props.appState;
  const { navigate } = props.navigation;

  return (
    <View style={styles.drawer}>
      <TouchableHighlight onPress={props.closeDrawer} style={styles.button} underlayColor="blue">
        <Ionicons style={styles.icon} name="md-close" color="gray" size={30} />
      </TouchableHighlight>

      <TouchableHighlight onPress={() => changeInput()} style={styles.button} className="hello" underlayColor="blue">
        <Ionicons style={styles.icon} name={options.voiceInput ? 'md-mic' : 'md-mic-off'} color="gray" size={30} />
      </TouchableHighlight>

      <TouchableHighlight onPress={() => navigate('Tutorial')} style={styles.button} underlayColor="blue">
        <Ionicons style={styles.icon} name="md-bug" color="gray" size={30} />
      </TouchableHighlight>

      <TouchableHighlight onPress={() => navigate('Stats')} style={styles.button} underlayColor="blue">
        <Ionicons style={styles.icon} name="md-stats" color="gray" size={30} />
      </TouchableHighlight>
    </View>
  );
};

const mapStateToProps = state => ({
  appState: state.appState,
});

const mapDispatchToProps = dispatch => ({
  shouldAnimateUnmount: unmountingInputMethod => dispatch(shouldAnimateUnmount(unmountingInputMethod)),
});

const navDrawerContent = withNavigation(DrawerContent);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(navDrawerContent);

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  icon: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    textAlign: 'center',
  },
  button: {
    width: 30 + 10,
    height: 30 + 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30 + 10,
  },
});
