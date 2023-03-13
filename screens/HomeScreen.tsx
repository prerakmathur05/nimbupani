// Important tip -
// implicit return syntax
// const chatRooms = (await DataStore.query(ChatRoomUser))
//   .filter(x => x.userId === me.attributes.sub);

// // explicit return syntax
// const chatRooms = (await DataStore.query(ChatRoomUser))
//   .filter(x => {
//     return x.userId === me.attributes.sub;
//   });


import * as React from  'react';
import { useState, useEffect } from 'react';
import { Text,View, Image, StyleSheet, FlatList, Pressable } from 'react-native';
import ChatRoomComponent from '../components/ChatRoomComponent'; 

import { SafeAreaView } from 'react-native-safe-area-context';
import { Auth, DataStore } from 'aws-amplify';
import { ChatRoom, ChatRoomUser } from "../src/models";




export default function TabOneScreen() {
  const [chatRooms, setChatRooms]= useState<ChatRoom[]>([]);

  //test
  // useEffect(()=>{
  //   const fetchDummyData = async () =>{
  //     const dummyData = await fetch("https://dummy.restapiexample.com/api/v1/employees")
  //     console.warn("dekho voh aagaya",dummyData);
  //   }
  //   fetchDummyData();
  // },[])
 
  // useEffect for fetching the chatrooms 
  useEffect(()=>{
    const fetchChatRooms = async ()=>{ 
      //fetching the logged in user details
      const me = await Auth.currentAuthenticatedUser();

      
      //filetering the chatrooms for the current logged in user
      
      //code -1 This code is fast but not working because it's returning promises and we need these promises to be resolved
      // const chatRooms = (await DataStore.query(ChatRoomUser))
      // .filter(x => x.userId === me.attributes.sub)
      // .map(x => x.chatRoom)
      
      //code - 2
      const promisedChatRooms = (await DataStore.query(ChatRoomUser))
      .filter( x =>x.userId === me.attributes.sub)
      .map(x=>x.chatRoom)
      // console.warn("chatrooms ids ==> ",promisedChatRooms);

      const reslovedChatRooms = await Promise.all(promisedChatRooms)
      // console.warn("chatrooms ==> ",reslovedChatRooms);
      setChatRooms(reslovedChatRooms);
    
    };
    fetchChatRooms();
  }, [])
  const logout= () =>{
    //logout user from application
    Auth.signOut();
  }
  
  return (
  <View style = {styles.page}>
  <FlatList 
  data = {chatRooms}
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
