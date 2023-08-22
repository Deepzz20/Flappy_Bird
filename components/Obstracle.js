import React from 'react';
import Matter from 'matter-js';
import { View, Image } from 'react-native';
import pipeTop from '../assets/pipe_top.png';
import pipeCore from '../assets/pipe_core.png';

const Obstacle = props => {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;
    const xBody = props.body.position.x - widthBody / 2;
    const yBody = props.body.position.y - heightBody / 2;

    const pipeRatio = 160 / widthBody;
    const pipeHeight = 33 * pipeRatio;
    const pipeIterations = Math.ceil(heightBody / pipeHeight);
    const pipeTopLeft = xBody + (widthBody - widthBody - 40) / 2;

    return (   
        <View>       
            <Image
                style={{
                    position: "absolute",
                    left: xBody,
                    top: yBody,
                    width: widthBody - 20,
                    height: heightBody - 20,
                }}
                resizeMode="stretch"
                source={pipeCore} />
            
            <Image
                style={{
                    position: "absolute",
                    left: pipeTopLeft,
                    top: yBody - pipeHeight / 2,
                    width: widthBody + 20,
                    height: pipeHeight - 30,
                }}
                resizeMode="stretch"
                source={pipeTop} />

            <Image
                style={{
                    position: "absolute",
                    left: pipeTopLeft,
                    top: yBody + heightBody - pipeHeight / 2,
                    width: widthBody +20,
                    height: pipeHeight - 30,
                     transform: [{ rotate: '180deg' }],
                }}
                resizeMode="stretch"
                source={pipeTop} />
        </View>
    );
};

export default (world, label, color, pos, size) => {
    const initialObstacle = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            label,
            isStatic: true,
        }
    );
    Matter.World.add(world, initialObstacle);

    return {
        body: initialObstacle,
        color,
        pos,
        renderer: <Obstacle />,
    };
};
