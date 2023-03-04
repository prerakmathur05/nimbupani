
import React, { useEffect, useState } from 'react'
import { Text,View, Image, StyleSheet, Pressable } from 'react-native';
import styles from './styles';
import { NavigationHelpersContext, useNavigation } from '@react-navigation/native';
import {Auth, DataStore} from "aws-amplify";
import {User, ChatRoomUser, Message} from "../../src/models"
// import Users from '../../assets/dummy-data/Users';

export default function ChatRoomComponent({chatRoomData}) {

  //Let's get the details of sender first
  // const user = chatRoomData.users[1]; 
  
  // const [users, setUsers]= useState<User[]>([])

  const [user, setUser]= useState<User|null>(null)
  const [lastMessage, setLastMessage] = useState<Message|undefined>()
  useEffect(()=>{
    const fetchUsers = async ()=>{
      const promisedFetchedUsers = (await DataStore.query(ChatRoomUser))
      .filter(x => x.chatRoomId===chatRoomData.id && x.user)
      .map(x=> x.user);

      const resolvedFetchedUsers = await Promise.all(promisedFetchedUsers)
      console.log("Users are here ==> ", resolvedFetchedUsers)
      // setUsers(resolvedFetchedUsers);
      const me = await Auth.currentAuthenticatedUser();
      setUser(resolvedFetchedUsers.find(user => user.id != me.attributes.sub)||null);
      
    } 
    
    fetchUsers();
  }, [])

  useEffect(()=>{
    if (!chatRoomData.chatRoomLastMessageId){
      return ;
    }
    DataStore.query(Message, chatRoomData.chatRoomLastMessageId).then(setLastMessage);


  },[])
  
  const navigation = useNavigation();
  const onPress= ()=>{
    // console.warn("Pressed!");
    navigation.navigate("ChatRoom", {id:chatRoomData.id});

  }
  return (
    <Pressable onPress= {onPress} style = {styles.container}>
    <Image source= {{uri: user?.imageUri}} style = {styles.image} />
    {!!chatRoomData.newMessages &&  <View style = {styles.badgeContainer}>
      <Text style={styles.badgeText}>{chatRoomData?.newMessages}</Text>
    </View>}
   
  <View style ={styles.rightContainer}> 
  <View style = {styles.row}>
  <Text style = {styles.name}>{user?.name}</Text>
  <Text style = {styles.text}>{lastMessage?.createdAt}</Text>
  </View>
  <Text numberOfLines={1} ellipsizeMode="head" style = {styles.text}>{lastMessage?.content} </Text>
  </View>
    </Pressable>
    )
  }
