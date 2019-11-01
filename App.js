import React, { Component } from 'react';
 
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Platform,
  ActivityIndicator,Image,Button
} from 'react-native';
import { createAppContainer , createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from './screen/Home'
import DetailsScreen from './screen/Details'
import CategoryScreen from './screen/Category'
import Splat from './screen/Splast'
import Detai from './screen/Dtail'
import Icon from 'react-native-vector-icons/FontAwesome';


class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* other code from before here */}
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.push('Home',{url:'sfgsdgsdgsd'})}
        />
      </View>
    );
  }
}

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Details: DetailsScreen,
  Detais:Detai
});
HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <Icon name="home" size={25}  color={focused?'#2f95dc':null }/>
  ),
};

HomeStack.path = '';

const CategoryStack = createStackNavigator({
  Categorys: CategoryScreen,
  Details: DetailsScreen,

});
CategoryStack.navigationOptions = {
  tabBarLabel: 'Category',
  tabBarIcon: ({ focused }) => (
    <Icon name="tasks" size={25}  color={focused?'#2f95dc':null } />
  ),
};

CategoryStack.path = '';


const bottomtab=createBottomTabNavigator(
  {
    Home: HomeStack,
    Category:CategoryStack,
  },
  {
    /* Other configuration remains unchanged */
  }
)

const InitialNavigator = createSwitchNavigator({
  Splash: Splat,
  Apphome: bottomtab
});

export default createAppContainer(InitialNavigator);