import React from 'react';
import Matter from 'matter-js';
import { View, Image } from 'react-native';

const Floor = props => {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y
    const xBody = props.body.position.x - widthBody / 2
    const yBody = props.body.position.y - heightBody / 2

    return (
        <Image
            source={require('../assets/floor.png')}
            style={{
                position: 'absolute',
                left: xBody, // Check if xBody is a valid number
                top: yBody,
                width: widthBody,
                height: 200 // Adjust the height as needed
            }}
        />
    )    
}

export default (world, color, pos, size) => {
    const initialFloor = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {
        label: 'Floor',
        isStatic: true,
    }
    )
    Matter.World.add(world, initialFloor)

    return {
        body: initialFloor,
        color,
        pos,
        renderer: <Floor />
    }
}
