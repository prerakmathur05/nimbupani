import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Auth, DataStore } from "aws-amplify";
import { User } from "../../src/models";
import { S3Image } from "aws-amplify-react-native";
import { useWindowDimensions } from "react-native";

const blue = "#3777f0";
const grey = "lightgrey";
export default function Message({ message }) {
  const { width } = useWindowDimensions();
  const [user, setUser] = useState<User | undefined>();
  const [isMe, setIsMe] = useState<Boolean>(false);

  useEffect(() => {
    DataStore.query(User, message.userID).then(setUser);
  }, []);

  useEffect(() => {
    const checkIfMe = async () => {
      if (!user) {
        return;
      }
      const authUser = await Auth.currentAuthenticatedUser();
      setIsMe(user.id === authUser.attributes.sub);
    };
    checkIfMe();
  }, [user]);

  // message.userID === me.attributes .sub;

  return (
    <View
      style={[
        styles.container,
        isMe ? styles.leftContainer : styles.rightContainer,
      ]}
    >
      {message.image && (
        <View style={{ marginBottom: message.content ? 10 : 0 }}>
          <S3Image
            imgKey={message.image}
            style={{ width: width * 0.7, aspectRatio: 4 / 3 }}
            resizeMode="contain"
          />
        </View>
      )}
      <Text style={{ color: isMe ? "black" : "white" }}>{message.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#377f0",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    maxWidth: "75%",
  },
  leftContainer: {
    backgroundColor: grey,
    marginLeft: "auto",
    marginRight: 10,
  },
  rightContainer: {
    backgroundColor: blue,
    marginLeft: 10,
    marginRight: "auto",
  },

  text: {
    color: "white",
  },
});
