import React, { Component } from 'react';
//import react in our code.
import { Dimensions } from 'react-native';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Platform,RefreshControl,
  ActivityIndicator,Image,PermissionsAndroid
} from 'react-native';
//import all the components we are going to use.
import RNFetchBlob from 'rn-fetch-blob'
export async function request_storage_runtime_permission() {
 
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        'title': 'ReactNativeCode Storage Permission',
        'message': 'ReactNativeCode App needs access to your storage to download Photos.'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
 
   //   Alert.alert("Storage Permission Granted.");
    }
    else {
 
     // Alert.alert("Storage Permission Not Granted");
 
    }
  } catch (err) {
    console.warn(err)
  }
}

export default class App extends Component {
  static navigationOptions = ({ navigation }) => ({
    header:(
      <View style={{  justifyContent:"space-between",
      flexDirection:"row",
      backgroundColor:'#2f95dc',
      paddingVertical:10,
      paddingHorizontal:20,}}>
          <Text> </Text>
          <Text style={{fontSize:20,marginTop:5,color:'white',}}>Trang chủ</Text>
          <Text> </Text>
      </View>
    ),
  })
  
  constructor() {

    super();
    this.state = {
      loading: true,url:'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=2bb9a866a9f3f5cdd73350262f2775ea&tags=thi%C3%AAn+nhi%C3%AAn&text=thi%C3%AAn+nhi%C3%AAn&extras=+views%2C+media%2C+path_alias%2C+url_sq%2C+url_t%2C+url_s%2C+url_q%2C+url_m%2C+url_n%2C+url_z%2C+url_c%2C+url_l%2C+url_o&per_page=80&page=1&format=json&nojsoncallback=1&auth_token=72157711254317986-becdd1f72ee17a15&api_sig=cd5c00f92a8456b67d4e221098915899',
      //Loading state used while loading the data for the first time
      serverData: [],
      urlpramas:null,
      isrefesh:false,
      //Data Source for the FlatList
      fetching_from_server: false,
      //Loading state used while loading more data
    };
    this.offset = 0;
    //Index of the offset to load from web API
  }
 
  async componentDidMount() {
    await request_storage_runtime_permission()
    this.getImage()
  }
   getImage(){

  fetch(this.state.url)
    .then(response => response.json())
    .then(responseJson => {
     responseJson = responseJson.photos.photo.slice((this.offset*11),((this.offset+1)*11)-1)
               console.log("offset : "+this.offset);


      this.offset = this.offset + 1;
      //After the response increasing the offset for the next API call.
      this.setState({
       // serverData: [...this.state.serverData, ...responseJson.results],
       serverData: [...this.state.serverData, ...responseJson],
        //adding the new data with old one available in Data Source of the List
        loading: false,
        //updating the loading state to false
      });
    })
    .catch(error => {
      console.error(error);
    });
 }

  _onRefresh = ()=> {
  this.setState({isrefesh:true})
  this.getImage()
  setTimeout(()=>{
    this.setState({isrefesh:false})
  },1500)

  }

  loadMoreData = () => {
   
  
  
    this.setState({ fetching_from_server: true }, () => { 
   
      fetch(this.state.url)
          .then(response => response.json())
          .then(responseJson => {
           responseJson = responseJson.photos.photo.slice((this.offset*11),((this.offset+1)*11)-1)
            console.log("offset Load : "+this.offset);
            this.setState({
         
              serverData: [...this.state.serverData, ...responseJson],
              fetching_from_server: false,
            });
          })
          .catch(error => {
            console.error(error);
          });
    });
    setTimeout(()=>{
      this.setState({fetching_from_server:false})
    },4000)
  };

chay(){
  <Text>fgsgssdfdsffs</Text>
}
  renderFooter() {
    return (

      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={this.loadMoreData}
         style={{marginBottom:19}}
        >
         
          {this.state.fetching_from_server ? (
            <ActivityIndicator size="large"   color="blue" style={{ marginLeft: 8 ,marginBottom:10}} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const android = RNFetchBlob.android
    return (
      <View   style={styles.container}>
     
        {this.state.loading ? (
          <ActivityIndicator size="large" />
        ) : (
         
              
            <View style={styles.container}>
            <FlatList
              style={styles.flatlist}
              data={this.state.serverData}
              keyExtractor={(item, index) => index.toString()}
              CellRendererComponent={({ children, item, ...props }) => {
                  return (
                      <View {...props} style={{ marginTop: 2 }}>
                          {children}
                      </View>
                  )
              }}
              renderItem={({ item,index }) => {
                
                  return (
                      <View style={styles.viewRow}>
                      
               {index%2==0 ?<Image style={{height:item.height_m,width:item.width_q,borderRadius:6,marginTop:10,backgroundColor:'blue'}} source={{uri:item.url_m}}></Image>:undefined }    
                        
               {index%2==0 ?<Image style={{height:item.height_m,width:item.width_q,borderRadius:6,marginTop:10,backgroundColor:'blue'}} source={{uri:item.url_m}}></Image>:undefined }  
                     
   
                       
                       
                      </View>
                  )
              }}
          />
      </View>
        )}
        </View>
     
    );
  }
}

const styles = StyleSheet.create({
    container: {
       flex: 1
    },
    flatList: {
       width: '100%',
       height: '100%'
    },
    viewRow: {
       flexDirection: 'row',
       alignItems:'flex-start'
    
    },
    image: {
       width: '49%',
       resizeMode: 'cover'
    }
 });
