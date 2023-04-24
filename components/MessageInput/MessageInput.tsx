import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  SimpleLineIcons,
  Feather,
  MaterialCommunityIcons,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
import { Auth, DataStore, Storage } from "aws-amplify";
import { ChatRoom, Message } from "../../src/models";
import EmojiSelector from "react-native-emoji-selector";
import * as ImagePicker from "expo-image-picker";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
// const { v4: uuidv4 } = require("uuid");

export default function MessageInput({ chatRoom }) {
  const [message, setMessage] = useState("");
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const sendMessage = async () => {
    const user = await Auth.currentAuthenticatedUser();
    const newMessage = await DataStore.save(
      new Message({
        content: message,
        userID: user.attributes.sub,
        chatroomID: chatRoom.id,
      })
    );
    updateLastMessage(newMessage);
    setMessage("");
    setIsEmojiOpen(false);
  };

  const updateLastMessage = async (newMessage) => {
    DataStore.save(
      ChatRoom.copyOf(chatRoom, (updatedChatRoom) => {
        updatedChatRoom.LastMessage = newMessage;
      })
    );
  };

  const onPress = () => {
    if (image) {
      sendImage();
    } else if (message) {
      sendMessage();
    }
  };

  const resetFields = () => {
    // console.warn("Buttton clicked");
    setMessage("");
    setIsEmojiOpen(false);
    setImage(null);
    setProgress(0);
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const takeImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,

      aspect: [4, 3],
    });
    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const sendImage = async () => {
    if (!image) {
      return;
    }
    const blob = await getImageBlob();
    // const name = uuidv4() + ".png";
    const imageKey = await Storage.put(`${uuidv4()}.png`, blob, {
      progressCallback,
    });
    // console.log("Sending image", imageKey);

    const user = await Auth.currentAuthenticatedUser();
    const newMessage = await DataStore.save(
      new Message({
        content: message,
        image: imageKey.key,
        userID: user.attributes.sub,
        chatroomID: chatRoom.id,
      })
    );
    const progressCallback = (progress) => {
      console.log(`Bytes uploaded: ${progress.loaded}/${progress.total}}`);
      setProgress((progress.loaded / progress.total) * 100);
    };
    updateLastMessage(newMessage);
    resetFields();
  };
  const getImageBlob = async () => {
    if (!image) {
      return null;
    }
    const response = await fetch(image);
    const blob = await response.blob();
    return blob;
  };

  // { height: isEmojiOpen ? "50%" : "auto" }
  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      {image && (
        <View style={styles.sendImageContainer}>
          <Image
            source={{ uri: image }}
            style={{ width: 100, height: 100, borderRadius: 10 }}
          />
          <View
            style={{
              flex: 1,
              justifyContent: "flex-start",
              alignSelf: "flex-end",
            }}
          >
            <View
              style={{
                height: 5,
                borderRadius: 5,
                backgroundColor: "#3777f0",
                width: `${progress}%`,
              }}
            />
          </View>
          <Pressable onPress={() => setImage(null)}>
            <AntDesign
              name="close"
              size={24}
              color="black"
              style={{ margin: 5 }}
            />
          </Pressable>
        </View>
      )}
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Pressable
            onPress={() => setIsEmojiOpen((currentValue) => !currentValue)}
          >
            <SimpleLineIcons
              name="emotsmile"
              size={24}
              color="#595959"
              style={styles.icon}
            />
          </Pressable>
          <TextInput
            style={styles.inputContainerText}
            placeholder="Your message..."
            value={message}
            onChangeText={(newMessage) => {
              setMessage(newMessage);
            }}
          />
          <Pressable onPress={pickImage}>
            <Feather
              name="image"
              size={24}
              color="#595959"
              style={styles.icon}
            />
          </Pressable>
          <Pressable onPress={takeImage}>
            <Feather
              name="camera"
              size={24}
              color="#595959"
              style={styles.icon}
            />
          </Pressable>
          <MaterialCommunityIcons
            name="microphone-outline"
            size={24}
            color="#595959"
            style={styles.icon}
          />
        </View>
        <Pressable onPress={onPress} style={styles.buttonContainer}>
          {message || image ? (
            <Ionicons name="send" size={18} color="white" />
          ) : (
            <AntDesign name="plus" size={24} color="white" />
          )}
        </Pressable>
      </View>

      <EmojiSelector
        onEmojiSelected={(emoji) =>
          setMessage((currentMessage) => currentMessage + emoji)
        }
        columns={8}
      />
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  root: {
    padding: 10,
    // height: "50%", as we have made this dynamic in the root view
  },
  row: {
    flexDirection: "row",
  },
  inputContainer: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    marginRight: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#dedede",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 5,
  },

  inputContainerText: {
    flex: 1, //should take rest of the space available for the text after the smiley
    marginHorizontal: 5,
  },

  icon: {
    marginHorizontal: 5,
  },

  buttonContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    backgroundColor: "#3777f0",
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 35,
  },

  sendImageContainer: {
    flexDirection: "row",
    margin: 10,
    alignSelf: "stretch",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 10,
  },
});
