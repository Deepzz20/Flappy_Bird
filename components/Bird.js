import React, { useState, useEffect } from "react";
import Matter from "matter-js";
import { View, Image } from "react-native";

const Bird = (props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    require("../assets/bird1.png"),
    require("../assets/bird2.png"),
    require("../assets/bird3.png"),
  ];

  const updateImageIndex = () => {
    const nextImageIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(nextImageIndex);
  };

  // Update the image index every 100 milliseconds
  useEffect(() => {
    const intervalId = setInterval(updateImageIndex, 100);
    return () => clearInterval(intervalId);
  }, [currentImageIndex]);

  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;
  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  const birdWidth = 70;
  const birdHeight = 50;

  return (
    <View
      style={{
        position: "absolute",
        left: xBody,
        top: yBody,
        width: widthBody,
        height: heightBody,
      }}
    >
      <Image
        source={images[currentImageIndex]}
        style={{
          width: birdWidth,
          height: birdHeight,
        }}
      />
    </View>
  );
};

export default (world, color, pos, size) => {
  const initialBird = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label: "Bird" }
  );
  Matter.World.add(world, initialBird);

  return {
    body: initialBird,
    color,
    pos,
    renderer: <Bird />,
  };
};
