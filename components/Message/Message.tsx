import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const blue= '#3777f0';
const grey ='lightgrey';
const myId='u1';

export default function Message({message}) {
    const isMe= message.user.id === myId; 

  return (
    <View style = {[
        styles.container, isMe? styles.leftContainer:styles.rightContainer]}>
      <Text style = {{color: isMe?  "black":"white"}}>{message.content}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
    backgroundColor:'#377f0',
    padding:10,
    margin:10,
    borderRadius:10,
    maxWidth:"75%",
    },
    leftContainer:{
      backgroundColor:grey,
      marginLeft:'auto',
      marginRight: 10,
    },
    rightContainer:{
      backgroundColor:blue,
      marginLeft:10,
      marginRight: 'auto',
    },

    text:{
        color:'white',

    }

})