import React from 'react';
import {
  View,
  Text,
  Button,
  ActivityIndicator,
} from 'react-native';

import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';

const Tutorial = props => (
  <Swiper loop={false}>
    <View style={slideStyles.slide1}>
      <Button title="get user details" onPress={props.getUserDetails} />
      <View>
        {props.loading ? <ActivityIndicator size="large" color="#0000ff" /> : <Text>{props.user.displayName || 'done'}</Text>}
      </View>
    </View>
  </Swiper>
);

const slideStyles = {
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    textAlign: 'center',
  },
};

const mapStateToProps = state => ({
  user: state.userDetails.user,
  loading: state.userDetails.loading,
});

const mapDispatchToProps = dispatch => ({
  getUserDetails: () => dispatch({
    type: 'GET_USER_DETAILS',
    apiCall: {
      url: 'user',
    },
  }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tutorial);
