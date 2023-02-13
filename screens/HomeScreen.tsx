import * as React from  'react';
import { Text,View, Image, StyleSheet, FlatList, Pressable } from 'react-native';
import ChatRoomComponent from '../components/ChatRoomComponent'; 
import ChatRoomData from '../assets/dummy-data/ChatRooms';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Auth } from 'aws-amplify';

const logout= () =>{
  //logout user from application
  Auth.signOut();
}

export default function TabOneScreen() {
  return (
  <View style = {styles.page}>
  <FlatList 
  data = {ChatRoomData}
  renderItem = { ({item}) => <ChatRoomComponent chatRoomData={item} />} />
{/* <Pressable style ={{backgroundColor:'red', alignItems:'center', borderRadius:10, height:50, margin:10, justifyContent:'center'}} onPress= {logout}>
<Text>Logout</Text>

</Pressable> */}
  </View>
  );
}

const styles = StyleSheet.create({
  page:{
//just the div for each chat componet on tab1
backgroundColor:'white',
flex:1,  
}, 
});
