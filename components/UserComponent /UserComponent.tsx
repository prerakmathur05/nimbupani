
import React from 'react'
import { Text,View, Image, StyleSheet, Pressable } from 'react-native';
import styles from './styles';
import { NavigationHelpersContext, useNavigation } from '@react-navigation/native';

export default function UserComponent({user}) {
  //Let's get the details of sender first

  const navigation = useNavigation();
  const onPress= ()=>{
    console.warn("Pressed!");
    // navigation.navigate("ChatRoom", {id:user.id});

  }
  
  return (
    <Pressable onPress= {onPress} style = {styles.container}>
    <Image source= {{uri: user.imageUri}} 
    style = {styles.image} />  
  <View style ={styles.rightContainer}>

  <View style = {styles.row}>
  <Text style = {styles.name}>{user.name}</Text>
  
  </View>
  </View>

  
  </Pressable>
  )
}
