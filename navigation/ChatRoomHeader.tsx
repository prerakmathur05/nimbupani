import React, { useEffect, useState } from 'react';
import {View, Image, Text, useWindowDimensions} from "react-native";
import { Feather } from '@expo/vector-icons';
import { DataStore,Auth } from 'aws-amplify';
import { ChatRoomUser, User } from '../src/models';

const ChatRoomHeader= ({id, children}) =>{
    const [user, setUser] = useState<User|null>(null)
    const {width}= useWindowDimensions();

    useEffect(()=>{
        if(!id)
        {return ;}
        const fetchUsers = async () =>{
            const fetchedUsers = await (await DataStore.query(ChatRoomUser)).filter(x=>x.chatRoomId===id).map(x=>x.user)
            
            const resolvedFetchedUsers= await Promise.all(fetchedUsers)
            // console.log(resolvedFetchedUsers);
            
            const authUser = await Auth.currentAuthenticatedUser();
            setUser(
                resolvedFetchedUsers.find((x) => x.id != authUser.attributes.sub) || null
            );
        };
        fetchUsers();
        


    },[])
    
    return (
      <View style = {{flexDirection:"row", justifyContent:"space-between", width:width-50, padding:10, 
      marginLeft:-25,
      alignItems:"center" }}>
    <Image source={{ uri: user?.imageUri
}}      
        style = {{width:30, height:30, borderRadius:30}}
        />
        <Text style= {{flex:1, textAlign:"left", marginLeft:10, fontWeight:"bold"}}>{user?.name}</Text>
        <View style={{flexDirection:'row', marginHorizontal:10, left:30 }}>
        <Feather name = "camera" size= {24} style ={{marginHorizontal:7}}/>
        <Feather name = "edit-2" size= {24} style ={{marginHorizontal:7}}/>
        </View>
  
  
      </View>
    )
  }
  export default ChatRoomHeader;