import React, { Component } from 'react';
//import react in our code.
import { Dimensions } from 'react-native';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Platform,
  ActivityIndicator,Image
} from 'react-native';
//import all the components we are going to use.
import RNFetchBlob from 'rn-fetch-blob'
import { Button } from 'react-native-paper';
export default class App extends Component {

  componentDidMount() {
      setTimeout(()=>{
        this.props.navigation.navigate('Apphome')
  
      },2000)
  }
 
  render() {
    return (
      <View style={styles.container}>
       <Text>Splast</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
backgroundColor:'red'
  },

});
