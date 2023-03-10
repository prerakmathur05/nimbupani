import { View, 
    Text, 
    StyleSheet, 
    TextInput, 
    Pressable,
    KeyboardAvoidingView, 
    Platform } from 'react-native'
import React, {useState} from 'react'
import { SimpleLineIcons, Feather, MaterialCommunityIcons, AntDesign, Ionicons } from '@expo/vector-icons'
import {Auth, DataStore} from "aws-amplify";
import {ChatRoom, Message} from "../../src/models";


export default function MessageInput({chatRoom}) {
  const [message, setMessage]= useState("");
//   console.warn(message)
const sendMessage= async()=>{
    const user = await Auth.currentAuthenticatedUser()
    const newMessage = await DataStore.save(new Message ({
        content:message,
        userID:user.attributes.sub,
        chatroomID:chatRoom.id,

    }))
    updateLastMessage(newMessage);
    setMessage("");
}

const updateLastMessage = async(newMessage)=>{
    DataStore.save(ChatRoom.copyOf(chatRoom,updatedChatRoom =>{
        updatedChatRoom.LastMessage = newMessage;
    }))
}


const onPressClicked= ()=>{
    console.warn("Buttton clicked")
}
const onPress = () =>{
    message? sendMessage() : onPressClicked()
}
  return (
<KeyboardAvoidingView style = {styles.root}
behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
keyboardVerticalOffset={100}>
<View style = {styles.inputContainer}>
<SimpleLineIcons name ="emotsmile" size={24} color='#595959' style = {styles.icon}/>
<TextInput  style = {styles.inputContainerText}
placeholder="Your message..."
value = {message}
onChangeText={(newMessage)=>{setMessage(newMessage)}}
/>
<Feather name = "camera" size={24} color="#595959"  style = {styles.icon}/>
<MaterialCommunityIcons name = "microphone-outline" size={24} color="#595959" style = {styles.icon}/>
</View>
<Pressable 
onPress= {onPress}
style={styles.buttonContainer}>

{message? <Ionicons name ="send" size={18} color="white"/>:  <AntDesign name="plus" size ={24} color="white" />}  

</Pressable>
    </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
root:{
flexDirection:'row',
padding:10},

inputContainer:{
flex:1,
backgroundColor:'#f2f2f2',
marginRight:10,
borderRadius:25,
borderWidth:1,
borderColor:"#dedede",
justifyContent:'center',
alignItems:"center",
flexDirection:'row',
padding:5,
},

inputContainerText:{
    flex:1, //should take rest of the space available for the text after the smiley
    marginHorizontal:5,
},

icon:{
    marginHorizontal:5,
},

buttonContainer:{
width:50,
height:50,
borderRadius:25,
justifyContent:'center',
backgroundColor:'#3777f0',
alignItems:'center',
    }, 

buttonText:{
    color:'white',
    fontSize:35,
}
})