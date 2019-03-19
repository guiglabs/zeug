import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
} from 'react-native';


class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }
  render() {
    return (
      <View style={{ padding: 10 }}>
        <Text>Email</Text>
        <TextInput
          style={{ height: 40, backgroundColor: 'pink' }}
          placeholder="email"
          onChangeText={(text) => this.setState({ text })}
        />
        <Text>Password</Text>
        <TextInput
          style={{ height: 40, backgroundColor: 'pink' }}
          placeholder="password"
          autoComplete="password"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ text })}
        />
        <Button title="login" onPress={(e) => {}}/>
      </View>
    );
  }
}

export default Signup;