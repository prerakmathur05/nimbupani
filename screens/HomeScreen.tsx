import * as React from  'react';
import { Text,View, Image, StyleSheet, FlatList } from 'react-native';
import ChatRoomComponent from '../components/ChatRoomComponent'; 
import ChatRoomData from '../assets/dummy-data/ChatRooms';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabOneScreen() {
  return (
  <View style = {styles.page}>
  <FlatList 
  data = {ChatRoomData}
  renderItem = { ({item}) => <ChatRoomComponent chatRoomData={item} />} />

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
