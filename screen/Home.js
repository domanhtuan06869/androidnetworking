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
  constructor() {
    super();
    this.state = {
      loading: true,
      //Loading state used while loading the data for the first time
      serverData: [],
      //Data Source for the FlatList
      fetching_from_server: false,
      //Loading state used while loading more data
    };
    this.offset = 0;
    //Index of the offset to load from web API
  }
 
  componentDidMount() {

  var urlprama=this.props.navigation.getParam('url', null)
  var url=urlprama==null?'https://tuan-nodejs.herokuapp.com/product/getlist?id=5d96bcd085809d18282a8cea':urlprama
  console.log(url)
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
       responseJson = responseJson.slice((this.offset*11),((this.offset+1)*11)-1)
                 console.log("offset : "+this.offset);

      //   console.log(responseJson.slice((this.offset*10),((this.offset+1)*10)-1));
      //Successful response from the API Call 
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
  loadMoreData = () => {
    
  var urlprama=this.props.navigation.getParam('url', null)
  var url=urlprama==null?'https://tuan-nodejs.herokuapp.com/product/getlist?id=5d96bcd085809d18282a8cea':urlprama
  console.log(url)
  //On click of Load More button We will call the web API again
    this.setState({ fetching_from_server: true }, () => { 
      //fetch('http://aboutreact.com/demo/getpost.php?offset=' + this.offset)
      fetch(url)
          .then(response => response.json())
          .then(responseJson => {
           responseJson = responseJson.slice((this.offset*11),((this.offset+1)*11)-1)
            console.log("offset Load : "+this.offset);
        //  console.log(responseJson);
          //Successful response from the API Call 
            this.offset = this.offset + 1;
            
            //After the response increasing the offset for the next API call.
            this.setState({
              //serverData: [...this.state.serverData, ...responseJson.results],
              serverData: [...this.state.serverData, ...responseJson],
              fetching_from_server: false,
              //updating the loading state to false
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

  fecthdownload(url){
    var android=RNFetchBlob.android
    RNFetchBlob.config({
      fileCache : true,
      // android only options, these options be a no-op on IOS
      addAndroidDownloads : {
        // Show notification when response data transmitted
        notification : true,
        // Title of download notification
        title : 'Great ! Download Success ! :O ',
        // File description (not notification description)
        description : 'An image file.',
        mime : 'image/png',
       
        // Make the file scannable  by media scanner
        mediaScannable : true,
      
      }
    })
    .fetch('GET',url)
    .then(res=>{
      android.actionViewIntent(res.path(), 'image/png')
      console.log(res.path())
      
    
    })
  }
  renderFooter() {
    return (
    //Footer View with Load More button
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={this.loadMoreData}
          //On Click of button calling loadMoreData function to load more data
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Loading</Text>
          {this.state.fetching_from_server ? (
            <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const android = RNFetchBlob.android
    return (
      <View style={styles.container}>
        {this.state.loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
contentContainerStyle={{width: '100%',backgroundColor:'#fff',alignItems:'center', }}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) =>String(item.id)}
            data={this.state.serverData}
            renderItem={({ item, index }) => (
              <View style={{backgroundColor:'#fff',marginTop:10,marginLeft:4 ,flexDirection:'column'}}>
              <TouchableOpacity style={[styles.shad,{width:item.previewWidth+1,height:item.previewHeight+1,position:'relative'}]}
              onPress={()=>
              //  this.fecthdownload(item.urlimage)
              this.props.navigation.navigate('Details',{url:item.largeImageURL})
             
              } >
              
                <Image style={{width:item.previewWidth,height:item.previewHeight,borderRadius:6,position:'absolute'}} source={{uri:String(item.previewURL)}}></Image>
                <Text style={{position:'absolute',padding:1,fontSize:10,backgroundColor:'#ccc',borderRadius:3,opacity:0.6,top:'80%'}}>{item.downloads} download</Text>
            
                </TouchableOpacity>
          </View>
            )}
            onEndReached={this.loadMoreData}
            onEndReachedThreshold ={0.1}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListFooterComponent={this.renderFooter.bind(this)}
            //Adding Load More button as footer component
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:4,
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
   backgroundColor:'#fff', borderRadius:10,alignItems:'center',marginLeft:2,
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
