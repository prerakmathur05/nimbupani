import * as React from  'react';
import { Text,View, Image, StyleSheet, FlatList, Pressable } from 'react-native';
import UserComponent from '../components/UserComponent ';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';


import { DataStore } from '@aws-amplify/datastore';
import {User} from "../src/models";





export default function UsersScreen() {
  const [users, setUsers]= useState<User[]>([])
  // const models = DataStore.query(User);
  // console.log("user models ", models);
  // useEffect(()=>{
  //   const fetchUsers = async() =>{
  //     // console.log("loggging")
  //     const fetchedUsers= await DataStore.query(User);
  //     // setUsers(fetchedUsers);
  //     console.log("users  -->",fetchedUsers);
  //   };
  //    fetchUsers()
  // }, [])
  // console.warn("You and IIIIII")
  useEffect(() => {
    
    const fetchAllUsers = async () =>{
      console.warn("Fucntion called => " )

      const promisedFetchedAllUsers = await DataStore.query(User);
    
      const resolvedFetchedUsers = await Promise.all(promisedFetchedAllUsers);
      console.warn("fetchedAllUsers=> ", resolvedFetchedUsers );

      setUsers(resolvedFetchedUsers);

  }
  fetchAllUsers();}
  , []);


  return (
  <View style = {styles.page}>



    <FlatList 
  data = {users}
  renderItem = { ({item}) => <UserComponent user={item} />} />
  

  
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
