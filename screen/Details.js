import React, { Component } from 'react';
//import react in our code.
import { Dimensions } from 'react-native';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,Alert,
  Platform,  Easing,
  ActivityIndicator,Image, Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import SwipeRender from "react-native-swipe-render";
//import all the components we are going to use.
import RNFetchBlob from 'rn-fetch-blob'
import { Button } from 'react-native-paper';
export default class Details extends Component {
  static navigationOptions = ({ navigation }) => ({
    header:(
      <View style={{  justifyContent:"space-between",
      flexDirection:"row",
      backgroundColor:'#2f95dc',
      paddingVertical:10,
      paddingHorizontal:20,}}>
          <Text> </Text>
          <Text style={{fontSize:20,marginTop:5,color:'white',}}>Chi tiết</Text>
          <Text> </Text>
      </View>
    ),
  })

state={
  isshow:false,
  isshow2:false,
  isspin:null,
  fadeValue: new Animated.Value(0),
  fadeValue2: new Animated.Value(0),
  spinValue : new Animated.Value(0),
  spinValue2: new Animated.Value(0),
  link_l:'',
  link_z:''




}
_spin = () => {
  this.state.spinValue.setValue(0);
  Animated.timing(
    this.state.spinValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.linear
    }
  ).start();
};
_spin2 = () => {
  this.state.spinValue2.setValue(0);
  Animated.timing(
    this.state.spinValue2, {
      toValue: 1,
      duration: 300,

      useNativeDriver: true,
      easing: Easing.linear
    }
  ).start();
};
_start = () => {
  Animated.timing(this.state.fadeValue, {
    toValue: 1,
    duration: 1100
  }).start();
};
_start2 = () => {
  Animated.timing(this.state.fadeValue2, {
    toValue: 1,
    duration: 800
  }).start();
};
_end = () => {
  Animated.timing(this.state.fadeValue, {
    toValue: 0,
    duration: 600
  }).start();
};
_end2 = () => {
  Animated.timing(this.state.fadeValue2, {
    toValue: 0,
    duration: 1000
  }).start();
};

componentDidMount(){

this.setState({link_l:url=this.props.navigation.getParam('url', 'NO-NAME')})
}
download(urll){
  var date      = new Date();
  var url       = urll;
  var ext       = this.extention(url);
  console.log(ext)
  ext = "."+ext[0];
  const { config, fs } = RNFetchBlob
  let PictureDir = fs.dirs.PictureDir
  let options = {
    fileCache: true,
    addAndroidDownloads : {
      useDownloadManager : true,
      notification : true,
      path:  PictureDir + "/"+Math.floor(date.getTime() + date.getSeconds() / 2)+ext,
      description : 'Image'
    }
  }
  config(options).fetch('GET', url).then((res) => {
    Alert.alert("Tải xuống thành công");
  }).catch((err)=>{
console
  });
}
extention(filename){
  return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
}



swiper=(index)=>{
    const url=this.props.navigation.getParam('url', 'NO-NAME')
    this.setState({link_l:url[index].url_l})
    this.setState({link_z:url[index].url_z})

}
componentDidMount(){
    const url=this.props.navigation.getParam('url', 'NO-NAME')
    const idex=this.props.navigation.getParam('index', null)
    this.setState({link_l:url[idex].url_l})
    this.setState({link_z:url[idex].url_z})
 
}


  render() {
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['15deg', '50deg']
      });
      const spin2 = this.state.spinValue2.interpolate({
        inputRange: [0, 1],
        outputRange: ['45deg', '0deg',]
        });
        const spin3 = this.state.spinValue2.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '0deg',]
          });
        
   // const android = RNFetchBlob.android
    const url=this.props.navigation.getParam('url', 'NO-NAME')
    const idex=this.props.navigation.getParam('index', null)
    return (
      <View style={styles.container}>
            <View style={{width:'99.8%',height:'100%',position:'relative'}}>
            <SwipeRender
            data={url}
            renderItem={({ item, index }) => {
                return (
                    <View key={"SwipeRender-slide#" + idex} style={{width:'100%',height:'100%'}}>
                        <Image
                            source={{ uri: item.url_l }}
                            style={{width:'100%',height:'100%',backgroundColor:'#000'}}
                            resizeMode="contain"
                        />
                    </View>
                );
            }}

            // OPTIONAL PROP USAGE.
            index={idex} // default 0
            loop={false} // default false
            loadMinimal={true} // default false
            loadMinimalSize={2}
            enableAndroidScrollView={true} // default false
            horizontal={true} // default true
            onIndexChanged={this.swiper}
        />
    <TouchableOpacity onPress={()=>{
    if(this.state.isshow==false){
      this.setState({isshow:true})
      this.setState({isshow2:true})
      this.setState({isspin:true})
      this._spin()
      this._start()
      this._start2()
    }else{
      setTimeout(()=>{
        this.setState({isshow:false})
        this.setState({isshow2:false})
        this.setState({ fadeValue: new Animated.Value(0)})
        this.setState({ fadeValue2: new Animated.Value(0)})
 
      },700)
      this.setState({isspin:false})
      this._end()
      this._end2()
      this._spin2()
    }
    }} style={{width:60,height:60,borderRadius:30,position:'absolute',top:'85%',left:'78.7%' ,alignItems:'center',justifyContent:'center' }}>
    <Text style={{width:60,height:60,borderRadius:30,backgroundColor:'red',marginTop:5}}> </Text>
    <Animated.Image style={{width:20,height:20,position:'absolute', transform: [
                  { rotate:this.state.isspin==true?spin:this.state.isspin==false?spin2:spin3 }
                ]}} source={require('../icon/add-plus-button.png')}/>
    </TouchableOpacity>
    
    </View>
          {this.state.isshow==true?<Animated.View
          style={{
            opacity: this.state.fadeValue,
           
            margin: 5,
            borderRadius: 12,
            position:'absolute',
            top:'53%',left:'55%' 
            
          }}
        >
       
        <View style={{flexDirection:'row',alignItems:'center'}}>
        <Text style={{padding:4,borderRadius:3,backgroundColor:'#ccc'}} >1080x2960</Text>
          <TouchableOpacity onPress={()=>{this.download(this.state.link_l)}} style={{marginLeft:4,width:60,height:60,borderRadius:30,backgroundColor:'red',justifyContent:'center',alignItems:'center'}}>
          <Image style={{width:20,height:20,position:'absolute'}} source={require('../icon/download.png')}></Image>   
          </TouchableOpacity>
         
        </View>
        
        </Animated.View>:null}
        {this.state.isshow==true?<Animated.View
          style={{
            opacity: this.state.fadeValue2,
          
            margin: 5,
            borderRadius: 12,
            position:'absolute',
            marginTop:70,
            top:'53%',left:'57%' 
          }}
        >
       
       <View style={{flexDirection:'row',alignItems:'center'}}>
        <Text style={{padding:4,borderRadius:3,backgroundColor:'#ccc'}} >640x1060</Text>
          <TouchableOpacity onPress={()=>{this.download(this.state.link_z)}} style={{marginLeft:4,width:60,height:60,borderRadius:30,backgroundColor:'red',alignItems:'center',justifyContent:'center'}}>
          <Image style={{width:20,height:20,position:'absolute'}} source={require('../icon/download.png')}></Image>
          </TouchableOpacity>
         
        </View>
        
        
        </Animated.View>:null}
      
    
     
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
    alignItems: 'center',backgroundColor:'#fff',
   
  },

  
});
