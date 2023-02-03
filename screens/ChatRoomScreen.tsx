import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import Message from '../components/Message'
import { useRoute, useNavigation } from '@react-navigation/native'
import Chats from '../assets/dummy-data/Chats'
import MessageInput from '../components/MessageInput'
import { SafeAreaView } from 'react-native-safe-area-context'

// console.log(messages)
export default function ChatRoomScreen() {
  const route= useRoute();
  // console.warn("displaying chatroom this id ", route.params?.id)
  const navigation = useNavigation();
  navigation.setOptions({title:"Manushi Chillar"})

  return (
    <SafeAreaView style= {styles.page}>
      {/* <Text>ChatRoomScreen</Text> */}
        <FlatList 
        data = {Chats.messages}
        renderItem = {({item}) =>
            <Message message ={item} />
        } />
        <MessageInput />


    </SafeAreaView>
  )
}
const styles= StyleSheet.create({
    page:{
        flex:1,
        backgroundColor:'white',
    }
})