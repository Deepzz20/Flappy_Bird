import Matter from "matter-js"
import Bird from "../components/Bird";
import Floor from "../components/Floor";
import Obstracle from "../components/Obstracle";
import { Dimensions } from "react-native";
import { getPipeSizePosPair } from "../utils/random";

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export default (showStartPage) => {
    let engine = Matter.Engine.create({ enableSleeping: false })
    
    let world = engine.world
    
    world.gravity.y = 0.75; 

    const pipeSizePosA = getPipeSizePosPair()
    const pipeSizePosB = getPipeSizePosPair(windowWidth * 0.9)

    return {
      Physics: { engine, world },

        ...(showStartPage
            ? {}
            : {
                ObstracleTop1: Obstracle(
                    world,
                    "ObstracleTop1",
                    "red",
                    pipeSizePosA.pipeTop.pos,
                    pipeSizePosA.pipeTop.size
                ),
                ObstracleBottom1: Obstracle(
                    world,
                    "ObstracleBottom1",
                    "blue",
                    pipeSizePosA.pipeBottom.pos,
                    pipeSizePosA.pipeBottom.size
                ),

                ObstracleTop2: Obstracle(
                    world,
                    "ObstracleTop2",
                    "red",
                    pipeSizePosB.pipeTop.pos,
                    pipeSizePosB.pipeTop.size
                ),
                ObstracleBottom2: Obstracle(
                    world,
                    "ObstracleBottom2",
                    "blue",
                    pipeSizePosB.pipeBottom.pos,
                    pipeSizePosB.pipeBottom.size
                ),
                Bird: Bird(
                    world,
                    "green",
                    { x: 50, y: 300 },
                    { height: 45, width: 40 }
                ),      
            }),

      
      Floor: Floor(
        world,
        "green",
        { x: windowWidth / 2, y: windowHeight },
        { height: 150, width: windowWidth }
      ),
    };
}