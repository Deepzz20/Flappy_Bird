import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { GameEngine } from "react-native-game-engine";
import entities from "./entities";
import Physics from "./physics";
import background from "./assets/background.png";
import gameover from "./assets/gameover.png";
import number0 from "./assets/0.png";
import number1 from "./assets/1.png";
import number2 from "./assets/2.png";
import number3 from "./assets/3.png";
import number4 from "./assets/4.png";
import number5 from "./assets/5.png";
import number6 from "./assets/6.png";
import number7 from "./assets/7.png";
import number8 from "./assets/8.png";
import number9 from "./assets/9.png";
import { Dimensions, StyleSheet } from "react-native";
import StartPage from "./StartPage";
import Bird from "./components/Bird";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const numberImages = [
  number0,
  number1,
  number2,
  number3,
  number4,
  number5,
  number6,
  number7,
  number8,
  number9,
];

export default function App() {
  const [running, setRunning] = useState(false);
  const [gameEngine, setGameEngine] = useState(null);
  const [currentpoints, setCurrentpoints] = useState(0);
  const [showStartPage, setShowStartPage] = useState(true); // Added state for StartPage

  useEffect(() => {
    if (showStartPage) {
      setRunning(false);
      
    } else {
      setRunning(true);
    }
  }, [showStartPage]);

  const pointsArray = currentpoints.toString().split("").map(Number);

  const onStartGame = () => {
    setCurrentpoints(0);
    setRunning(true);
    setShowStartPage(false);
    gameEngine.swap(entities());
  };

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={background}
        style={styles.backgroundImage}
        resizeMode="stretch"
      />
      <GameEngine
        ref={(ref) => {
          setGameEngine(ref);
        }}
        systems={[Physics]}
        entities={entities(showStartPage)}
        running={running}
        onEvent={(e) => {
          switch (e.type) {
            case "game_over":
              setRunning(false);
              gameEngine.stop();
              break;
            case "new_point":
              setCurrentpoints(currentpoints + 1);
              break;
          }
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <StatusBar style="auto" hidden={true} />
      </GameEngine>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {showStartPage ? ( // Show StartPage conditionally
          <StartPage onStartGame={onStartGame} />
        ) : !running ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              {pointsArray.map((digit, index) => (
                <Image
                  key={index}
                  source={numberImages[digit]}
                  style={{ width: 40, height: 40, marginRight: 5 }}
                  resizeMode="contain"
                />
              ))}
            </View>

            <View style={{ marginVertical: 20 }}>
              <Image
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
                resizeMode="contain"
                source={gameover}
              />
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "black",
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}
              onPress={() => {
                setCurrentpoints(0);
                setRunning(true);
                gameEngine.swap(entities());
              }}
            >
              <Text
                style={{ fontWeight: "bold", color: "white", fontSize: 30 }}
              >
                START GAME
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              marginTop: 20,
            }}
              >
                <View style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}>
            {pointsArray.map((digit, index) => (
              <Image
                key={index}
                source={numberImages[digit]}
                style={{ width: 40, height: 40, marginRight: 5 }}
                resizeMode="contain"
              />
            ))}
                  </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: windowWidth,
    height: windowHeight,
    opacity: 1,
  },
});
