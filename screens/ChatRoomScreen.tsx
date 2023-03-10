import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import React, {useEffect, useState} from 'react'
import '@azure/core-asynciterator-polyfill';

import Message from '../components/Message'
import { useRoute, useNavigation } from '@react-navigation/native'
import Chat from '../assets/dummy-data/Chats'
import MessageInput from '../components/MessageInput'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Auth, DataStore, SortDirection } from 'aws-amplify';
import {ChatRoom, Message as MessageModel} from "../src/models";



// console.log(messages)
  export default function ChatRoomScreen() {
  const [messages, setMessages]=useState<MessageModel[]>([])
  const [chatRoom, setChatRoom]=useState<ChatRoom|null>(null)



  const route= useRoute();
  console.log("route", route);
  const navigation = useNavigation();
  navigation.setOptions({title:"Manushi Chillar"})
  
  // console.warn("displaying chatroom this id ", route.params?.id)
  
useEffect(()=>{ 
       fetchChatRoom()  
  },[]);
  
useEffect(()=>{ 
if (!chatRoom){
  return;
}
fetchMessages();
},[chatRoom]);
  

useEffect(()=>{
  const subscription = DataStore.observe(MessageModel).subscribe(msg=>{
    console.log("subscription messages,", msg)
   if (msg.model ===MessageModel && msg.opType ==='INSERT'){
     setMessages(existingMessages => [msg.element,...existingMessages])
   }
   })
  return ()=> subscription.unsubscribe() 
  }, [])

  const fetchChatRoom= async () =>{
      if (!route.params?.id ){
        console.log("No chatroom/route id provided");
        return;
      }
      const chatRoom = await DataStore.query(ChatRoom, route.params.id );
      if (!chatRoom){
        console.error("Couldn't find a chat room with this id")
      }
      else {
        setChatRoom(chatRoom);
      }
      
    }
      
  const fetchMessages = async() => {
    if (!chatRoom){
      return ;
    }
    const fetchedMessages = await DataStore.query(
      MessageModel, 
      (x) => x.chatroomID.eq(chatRoom?.id), {sort:x => x.createdAt(SortDirection.DESCENDING)}
      );
      console.log("Fetched Messages ", fetchedMessages)
      setMessages(fetchedMessages);
  }
  
    
if (!chatRoom){
  return <ActivityIndicator />
}
  return (
    <SafeAreaView style= {styles.page}>
      {/* <Text>ChatRoomScreen</Text> */}
        <FlatList 
        data = {messages}
        renderItem = {({item}) =>
            <Message message ={item} />
        } 
        inverted />
        <MessageInput chatRoom = {chatRoom} />


    </SafeAreaView>
  )}

const styles= StyleSheet.create({
    page:{
        flex:1,
        backgroundColor:'white',
    }
})  