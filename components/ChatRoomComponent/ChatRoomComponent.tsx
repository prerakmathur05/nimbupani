
import React from 'react'
import { Text,View, Image, StyleSheet, Pressable } from 'react-native';
import styles from './styles';
import { NavigationHelpersContext, useNavigation } from '@react-navigation/native';

export default function ChatRoomComponent({chatRoomData}) {

  //Let's get the details of sender first
  const user = chatRoomData.users[1]; 
  const navigation = useNavigation();
  const onPress= ()=>{
    // console.warn("Pressed!");
    navigation.navigate("ChatRoom", {id:chatRoomData.id});

  }
  
  return (
    <Pressable onPress= {onPress} style = {styles.container}>
    <Image source= {{uri: user.imageUri}} 
    style = {styles.image} />
    {chatRoomData.newMessages &&  <View style = {styles.badgeContainer}>
      <Text style={styles.badgeText}>{chatRoomData.newMessages}</Text>
    </View>}
   
  <View style ={styles.rightContainer}> 
  <View style = {styles.row}>
  <Text style = {styles.name}>{user.name}</Text>
  <Text style = {styles.text}>{chatRoomData.lastMessage.createdAt}</Text>
  </View>
  <Text numberOfLines={1} ellipsizeMode="head" style = {styles.text}>{chatRoomData.lastMessage.content} </Text>
  </View>
  </Pressable>
  )
}
