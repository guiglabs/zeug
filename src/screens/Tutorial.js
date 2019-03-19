import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
} from 'react-native';

import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import { promiseAction } from '../redux/middlewares/promise';

const fetchUserDetails = () => promiseAction(
  fetch('http://localhost:3000/user', {
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTU1Mjg0MDQ0NSwiZXhwIjoxNTg0Mzc2NDQ1fQ.GurD54Myontk9eb7nk7AKwIh2p2xXsX0I-92w4YpORg',
    },
  }).then(res => res.json()),
  'GET_USER_DETAILS',
);

class Tutorial extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (

      <Swiper loop={false}>
        <View style={slideStyles.slide1}>
          <Button title="get user details" onPress={this.props.getUserDetails} />
          <Text>
            {this.props.loading ? 'Loading...' : this.props.user.displayName || 'done'}
          </Text>
        </View>
      </Swiper>
    );
  }
}

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
  getUserDetails: () => dispatch(fetchUserDetails()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tutorial);
