import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import styles from "./styles";
import {
  NavigationHelpersContext,
  useNavigation,
} from "@react-navigation/native";
import { Auth, DataStore } from "aws-amplify";
import { User, ChatRoomUser, Message } from "../../src/models";
// import Users from '../../assets/dummy-data/Users';

export default function ChatRoomComponent({ chatRoomData }) {
  //Let's get the details of sender first
  // const user = chatRoomData.users[1];

  // const [users, setUsers]= useState<User[]>([])

  const [user, setUser] = useState<User | null>(null);
  const [lastMessage, setLastMessage] = useState<Message | undefined>();
  useEffect(() => {
    const fetchUsers = async () => {
      const promisedFetchedUsers = (await DataStore.query(ChatRoomUser))
        .filter((x) => x.chatRoomId === chatRoomData.id && x.user)
        .map((x) => x.user);

      const resolvedFetchedUsers = await Promise.all(promisedFetchedUsers);
      // console.log("Users are here ==> ", resolvedFetchedUsers)
      // setUsers(resolvedFetchedUsers);
      const me = await Auth.currentAuthenticatedUser();
      setUser(
        resolvedFetchedUsers.find((user) => user.id != me.attributes.sub) ||
          null
      );
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (!chatRoomData.chatRoomLastMessageId) {
      return;
    }
    DataStore.query(Message, chatRoomData.chatRoomLastMessageId).then(
      setLastMessage
    );
  }, []);

  const navigation = useNavigation();
  const onPress = () => {
    // console.warn("Pressed!");
    navigation.navigate("ChatRoom", { id: chatRoomData.id });
  };
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image
        source={{
          uri: user?.imageUri
            ? user?.imageUri
            : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLeqsbTn6eqpr7PJzc/j5ebf4eLZ3N2wtrnBxsjN0NLGysy6v8HT1tissra8wMNxTKO9AAAFDklEQVR4nO2d3XqDIAxAlfivoO//tEOZWzvbVTEpic252W3PF0gAIcsyRVEURVEURVEURVEURVEURVEURVEURVEURVEURflgAFL/AirAqzXO9R7XNBVcy9TbuMHmxjN6lr92cNVVLKEurVfK/zCORVvW8iUBnC02dj+Wpu0z0Y6QlaN5phcwZqjkOkK5HZyPAjkIjSO4fIdfcOwFKkJlX4zPu7Ha1tIcwR3wWxyFhRG6g4Je0YpSPDJCV8a2Sv2zd1O1x/2WMDZCwljH+clRrHfWCLGK8REMiql//2si5+DKWKcWeAGcFMzzNrXC/0TUwQ2s6+LhlcwjTMlYsUIQzPOCb7YBiyHopyLXIEKPEkI/TgeuiidK/R9FniUDOjRDpvm0RhqjMyyXNjDhCfIMYl1gGjIMIuYsnGEYRMRZOMMunaLVwpWRW008v6fYKDIzxCwVAeNSO90BJW6emelYBRF/kHpYGVaoxTDAaxOFsfP9y8hpJ4xd7gOcij7JNGQ1EYFgkPJa1jQEiYZXRaRINKxSDUW9n+FT82lSKadkiru9/4XPqSLWOekGPoY05TAvLm9orm+YWuwHoBHkZKijNBJGmeb61eL6Ff/6q7bLr7yvv3vKGhpDRjvgjGaPz+gUg6YgcvpyAR2FIZ9U6nEEyZRTovmEU32KichpGn7C17XrfyH9gK/c0CMP05HZIM2uf9sEveizKveBy9/6Qt7o89ne33D525cfcIMW6ab+TMEukQbQbu+xu7X3A9bChmWaCeAkG17bpntwXgWxHaMzGPmUaR5dQZiKqRVeUZ3047fi3nAu28h4CHxCsZAgmEH8Y27jJAhm8c+5RQzRQNVGhVFSfxOYIjp/pP7RxzjevYXVGf4eLt+BJ1vCuLuLkrgABgCGXZ2wik5uty+oBvNirI6mkzhAf4Gsb58Hcm67Jzd+KwD10BYPLL3e0MjvKrgAULnOfveF/O4N2Xb9BZom3gJes3F9X5Zze8/6Yt09b4CrqsEjUv8oFBaR2rl+6CZr2xVrp24o/WitBKuGrrpl1+bFkmK2qXTON4VpbdfLa7o7y/WdLxG7lm2Lqh2clOwTegbvc/vj2U78CwhA87Bn8G5Nk3eOb0Nsr9flz3sG78UUtue4kpv1xvjg3TMay62BMlTlP+vrOMnJsRmt/ze0jsfkPPYdAH57hK+34PeOyc8XIXu5xT2HsUkdZz+adwg8HGFfQ3K5jtDvbUiO4Di9/ywHGrL88pDizZ++oTp+an+SMX/ndymUCwmHMdO7yuOx83pUx/eEMU0AvxWndwgidAqOZ8ypCwdEfvvEo6D9HwpA8wzvmOJEqAg9ySu8g4x0Hb9hSB/BANEKJ+LbPBU0lzbAJs4xt1AoshKkUGQmiH8/jJ0gdhTTLmSegHlPE0oOdXALnqDjKYh3px//fSgSWG8UqfrrIICzYYSJXRr9BSPbpNzw7gBjKjKOYI7ReIGqQRIap5+5MdjyvuDkExvGeXSlONWZAP3/AZBwJohU7QJRGU+cTVH18ELmRPNBmibW6MT/k1b0XhdkRBvyT6SB6EYv/GvhSmRNpGngRULsAlxMCGNXp7w3FfdEbTEEDdLI9TdIKRUzUesa3I461ER8cpNT7gMRhpKmYVS9ELOgCUQsa4SsulciKiLbY+AnHD8cpuhISsnxpamI84sbDq9qYJgf8wiiOBrC7Ml7M7ZECCqKoiiKoiiKoiiKoijv5AvJxlZRyNWWLwAAAABJRU5ErkJggg==",
        }}
        style={styles.image}
      />
      {!!chatRoomData.newMessages && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{chatRoomData?.newMessages}</Text>
        </View>
      )}

      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.text}>{lastMessage?.createdAt}</Text>
        </View>
        <Text numberOfLines={1} ellipsizeMode="head" style={styles.text}>
          {lastMessage?.content}{" "}
        </Text>
      </View>
    </Pressable>
  );
}
