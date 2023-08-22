import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import message from "./assets/message.png";

const StartPage = ({ onStartGame }) => {
  return (
    <View style={styles.container}>
      <Image source={message} style={styles.image} activeOpacity={1} />
      <TouchableOpacity
        style={styles.startButton}
        onPress={onStartGame}
        activeOpacity={0}
      >
        <Text style={styles.buttonText}>Start Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    flex: 1,
    resizeMode: "stretch", // This ensures the image covers the entire screen
    position: "absolute",
    width: "90%",
    height: "80%",
  },
  startButton: {
    backgroundColor: "black",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    position: "absolute",
    bottom: 100,
    opacity: 0,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default StartPage;
