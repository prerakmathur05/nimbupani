
import React from 'react'
import { Text,View, Image, StyleSheet, Pressable } from 'react-native';
import styles from './styles';
import { NavigationHelpersContext, useNavigation } from '@react-navigation/native';
import { Auth, DataStore } from 'aws-amplify';
import { ChatRoom, User, ChatRoomUser } from '../../src/models';
import { Alert } from 'react-native';
  



export default function UserComponent({user}) {
  //Let's get the details of sender first

  // const navigation = useNavigation();
  // const onPress= ()=>{
  //   console.warn("Pressed!");
  //   // navigation.navigate("ChatRoom", {id:user.id});

  // }



  const navigation = useNavigation();
  const onPress = async ()=>{
    //check for existing chatroom between the users
    // const me = await Auth.currentAuthenticatedUser();
    // const targetChatRoom= await DataStore.query(ChatRoom, user.id)


    //create a new chatroom
    console.log("my onPress clicked!", user);
    const newChatRoom = await DataStore.save( new ChatRoom ({newMessages:0}));


    //connect authenticated user (me, who is using the application) with chatroom 
    const authenticatedUser = await Auth.currentAuthenticatedUser();
    const dbUser = await DataStore.query(User, authenticatedUser.attributes.sub)
    if (!dbUser) {
      Alert.alert("There was an error creating the ChatRoom");
      return;
    }
    await DataStore.save(new  ChatRoomUser({
      user:dbUser,
      chatRoom: newChatRoom
    }))
//connect clicked user with chatroom
  await DataStore.save(new  ChatRoomUser({
    user,
    //you can also write as user:user, remember this user is coming as an argument in the outer function
    chatRoom: newChatRoom
  }))
  console.log("chatroom",newChatRoom);
navigation.navigate("ChatRoom", {id:newChatRoom.id});
    
  }

  return (
    <View>

    <Pressable  style = {styles.container} onPress= {onPress}>
    
    <Image source= {{uri: user.imageUri}} style = {styles.image} />  
  
  <View style ={styles.rightContainer}>
  <View style = {styles.row}>
  <Text style = {styles.name}>{user.name}</Text>
  
  </View>
  </View>

  
  </Pressable>
  </View>
  )
}
