// Important tip -
// implicit return syntax
// const chatRooms = (await DataStore.query(ChatRoomUser))
//   .filter(x => x.userId === me.attributes.sub);

// // explicit return syntax
// const chatRooms = (await DataStore.query(ChatRoomUser))
//   .filter(x => {
//     return x.userId === me.attributes.sub;
//   });

import * as React from "react";
import { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";
import ChatRoomComponent from "../components/ChatRoomComponent";
import "@azure/core-asynciterator-polyfill";

import { SafeAreaView } from "react-native-safe-area-context";
import { Auth, DataStore } from "aws-amplify";
import { ChatRoom, ChatRoomUser, User, MentorRelation } from "../src/models";
import { useNavigation } from "@react-navigation/native";

const logout = () => {
  Auth.signOut();
};

const changeImage = async () => {
  //   console.log("Image change requested");
  const authUser = await Auth.currentAuthenticatedUser();
};

const newMentorRequest = () => {
  console.log("new mentor requested");
};

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
  const [mentorUser, setMentorUser] = useState<User | null>(null);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      const userModelUser = await DataStore.query(
        User,
        authUser.attributes.sub
      );
      setUser(userModelUser);

      const menteeUser = await (
        await DataStore.query(MentorRelation)
      ).filter((x) => x.menteeID === userModelUser.id);

      const mentorForThisMentee = await DataStore.query(
        User,
        menteeUser[0].mentorID
      );
      // console.log("mentor is ->", mentorForThisMentee);

      const promisedChatRooms = await (await DataStore.query(ChatRoomUser))
        .filter((x) => x.userId === userModelUser.id)
        .map((x) => x.chatRoom);

      const resolvedChatRooms = await Promise.all(promisedChatRooms);

      // console.log("Chatrooms", resolvedChatRooms);

      setMentorUser(mentorForThisMentee);
    };

    fetchUserDetails();
  }, []);

  // useEffect(()=>{
  //     const fetchChatRoom = async()=>{

  //         const chatRoom = await DataStore.query(ChatRoom)
  //         console.log(chatRoom);
  //     }
  //     fetchChatRooms();
  // },[])

  const initiateChat = () => {
    console.log("Wait i will initiate the chat");
  };

  return (
    <View style={styles.page}>
      <View style={styles.view}>
        <Text>Profile Settings</Text>
        <Pressable onPress={changeImage}>
          <Image style={styles.image} source={{ uri: user?.imageUri }} />
        </Pressable>
        <Text>{user?.name}</Text>
      </View>
      {mentorUser != null ? (
        <View style={styles.view}>
          <Text>Mentor Details</Text>
          <Pressable onPress={initiateChat}>
            <Image
              style={styles.image}
              source={{ uri: mentorUser?.imageUri }}
            />
            <Text>{mentorUser?.name}</Text>
          </Pressable>
          <Pressable onPress={newMentorRequest}>
            <Text>Request a new Mentor</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.view}>
          <Text>No mentor is allocated yet</Text>
        </View>
      )}

      <View style={styles.view}>
        <Pressable
          style={{
            backgroundColor: "#FF597B",
            alignItems: "center",
            borderRadius: 10,
            width: 100,
            height: 50,
            margin: 10,
            justifyContent: "center",
          }}
          onPress={logout}
        >
          <Text>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    //just the div for each chat componet on tab1
    backgroundColor: "white",
    flex: 1,
  },
  view: {
    display: "flex",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop: 10,
    marginBottom: 10,
  },
});
