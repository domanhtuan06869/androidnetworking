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
var listcategory=[{name:'Động vật',id:'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=2bb9a866a9f3f5cdd73350262f2775ea&tags=Du+l%E1%BB%8Bch&text=Du+l%E1%BB%8Bch&extras=+views%2C+media%2C+path_alias%2C+url_sq%2C+url_t%2C+url_s%2C+url_q%2C+url_m%2C+url_n%2C+url_z%2C+url_c%2C+url_l%2C+url_o&per_page=80&page=1&format=json&nojsoncallback=1&auth_token=72157711254317986-becdd1f72ee17a15&api_sig=290a1b50ca7edb68ffccc86b0cd564bf'}
,{name:'Girl',id:'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=2bb9a866a9f3f5cdd73350262f2775ea&tags=g%C3%A1i+xinh&text=g%C3%A1i+xinh&extras=+views%2C+media%2C+path_alias%2C+url_sq%2C+url_t%2C+url_s%2C+url_q%2C+url_m%2C+url_n%2C+url_z%2C+url_c%2C+url_l%2C+url_o&per_page=80&page=1&format=json&nojsoncallback=1&auth_token=72157711254317986-becdd1f72ee17a15&api_sig=7be8b57bc93c79474f65c52e29374391'},
{name:'Thể thao',id:'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=2bb9a866a9f3f5cdd73350262f2775ea&tags=Th%E1%BB%83+thao&text=Th%E1%BB%83+thao&extras=+views%2C+media%2C+path_alias%2C+url_sq%2C+url_t%2C+url_s%2C+url_q%2C+url_m%2C+url_n%2C+url_z%2C+url_c%2C+url_l%2C+url_o&per_page=80&page=1&format=json&nojsoncallback=1&auth_token=72157711254317986-becdd1f72ee17a15&api_sig=e91e43c888ad8cb04fc35d98523823e7'},
{name:'Nhà đẹp',id:'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=2bb9a866a9f3f5cdd73350262f2775ea&tags=nh%C3%A0+%C4%91%E1%BA%B9p&text=nh%C3%A0+%C4%91%E1%BA%B9p&extras=+views%2C+media%2C+path_alias%2C+url_sq%2C+url_t%2C+url_s%2C+url_q%2C+url_m%2C+url_n%2C+url_z%2C+url_c%2C+url_l%2C+url_o&per_page=80&page=1&format=json&nojsoncallback=1&auth_token=72157711254317986-becdd1f72ee17a15&api_sig=e3e9e1c35d04d11b0ec0ae81cfc5a547'}]
import { Button } from 'react-native-paper';
export default class Category extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header:(
      <View style={{  justifyContent:"space-between",
      flexDirection:"row",
      backgroundColor:'#2f95dc',
      paddingVertical:10,
      paddingHorizontal:20,}}>
          <Text> </Text>
          <Text style={{fontSize:20,marginTop:5,color:'white',}}>Thể loại</Text>
          <Text> </Text>
      </View>
    ),
  })
    render() {
      return (
        <View style={{ flex: 1,  alignItems: 'center' }}>
          {/* other code from before here */}
          <FlatList
          contentContainerStyle={{
          alignSelf:'flex-start',
          backgroundColor:'#fff',
    
        
        }}
        
        onEndReachedThreshold={0.7}
          data={listcategory}
          contentContainerStyle={{
            alignSelf: 'center', 
          
        }}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
          renderItem={({item}) => 
           <View style={{width:'50%',height:70,backgroundColor:'#fff',justifyContent:'center',marginLeft:3}}>
          <TouchableOpacity style={{
   backgroundColor:'#fff', borderRadius:10,alignItems:'center',marginLeft:2,marginTop:3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.36,
    shadowRadius: 9.68,

    elevation: 2,
  width:'90%',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'}}
          onPress={()=>
            this.props.navigation.push('Home',{url:item.id})
          
          } >
  
   

            <Text style={{fontWeight:'bold',textAlign:'center'}}>{item.name} </Text>
         
            </TouchableOpacity>
      </View>
        }
          keyExtractor={item => item.name}
        />
    
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
backgroundColor:'#fff'
  },

  separator: {
    height: 0.5,
  
  },
  text: {
    fontSize: 15,
    color: 'black',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  }, shad:{
   backgroundColor:'#fff', borderRadius:10,alignItems:'center',alignItems:'center',marginLeft:2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  }
});
