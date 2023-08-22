import Matter from "matter-js";
import { getPipeSizePosPair } from "./utils/random";
import { Dimensions } from "react-native";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

let baseHorizontalSpeed = -4; // Initial base horizontal speed of obstacles
const speedIncreaseFactor = -0.1; // Amount to increase speed with each new point

const Physics = (entities, { touches, time, dispatch }) => {
  let engine = entities.Physics.engine;

  touches
    .filter((t) => t.type === "press")
    .forEach((t) => {
      Matter.Body.setVelocity(entities.Bird.body, {
        x: 0,
        y: -7,
      });
    });
  Matter.Engine.update(engine, time.delta);

  for (let index = 1; index <= 2; index++) {
    if (
      entities[`ObstracleTop${index}`].body.bounds.max.x <= 50 &&
      !entities[`ObstracleTop${index}`].point
    ) {
      entities[`ObstracleTop${index}`].point = true;
      dispatch({ type: "new_point" });

      // Increase speed as the point changes
      baseHorizontalSpeed += speedIncreaseFactor;
    }

    if (entities[`ObstracleTop${index}`].body.bounds.max.x <= 0) {
      entities[`ObstracleTop${index}`].point = false;
      const pipeSizePos = getPipeSizePosPair(windowWidth * 0.9);

      Matter.Body.setPosition(
        entities[`ObstracleTop${index}`].body,
        pipeSizePos.pipeTop.pos
      );
      Matter.Body.setPosition(
        entities[`ObstracleBottom${index}`].body,
        pipeSizePos.pipeBottom.pos
      );
    }

    // Translate obstacles with the updated speed
    Matter.Body.translate(entities[`ObstracleTop${index}`].body, {
      x: baseHorizontalSpeed,
      y: 0,
    });
    Matter.Body.translate(entities[`ObstracleBottom${index}`].body, {
      x: baseHorizontalSpeed,
      y: 0,
    });
  }

  Matter.Events.on(engine, "collisionStart", (event) => {
    dispatch({ type: "game_over" });
  });

  return entities;
};

export default Physics;
