import * as React from  'react';
import { Text,View, Image, StyleSheet, FlatList, Pressable } from 'react-native';
import UserComponent from '../components/UserComponent ';
import Users from '../assets/dummy-data/Users';
import { SafeAreaView } from 'react-native-safe-area-context';




export default function UsersScreen() {
  return (
  <View style = {styles.page}>
  <FlatList 
  data = {Users}
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
