import React from 'react';
import { Group, Circle } from 'react-konva';
import { mapRange } from '../../../utils';

const DrawCircle = (props) => {
  const { radius, x, y, reduceX, reduceY, rangeValues, minRadius} = props;
  const rVal = mapRange(y, rangeValues.yMin, rangeValues.yMax, 0, 255);
  const bVal = mapRange(x, rangeValues.xMin, rangeValues.xMax, 0, 255);
  let newCircleObjects = [];
  
  if (radius > minRadius) {
    if (!reduceX && !reduceY) {
      newCircleObjects.push({key: `${radius}-2`,x: x, y: y, radius: radius * 0.75 });
    } else {
      const newRadius = radius / 2;

      if (reduceX) {
        newCircleObjects.push(
          {key: `${radius}-1x-${x}`,x: x - radius, y: y, radius: newRadius },
          {key: `${radius}-2x-${y}`,x: x + radius, y: y, radius: newRadius }
        );
      }
      if (reduceY) {
        newCircleObjects.push(
          {key: `${radius}-1y-${y}`,x: x, y: y - radius, radius: newRadius },
          {key: `${radius}-2y-${x}`,x: x, y: y + radius, radius: newRadius }
        );
      }
    }
  }

  let circlesArray = [<Circle key={`${radius}-1`} x={x} y={props.y} radius={radius} stroke={`rgb(${rVal},60,${bVal})`} />].concat(newCircleObjects.map(
    circleObject => <DrawCircle {...circleObject} reduceX={reduceX} reduceY={reduceY} rangeValues={rangeValues} minRadius={minRadius} />
  ));

  return circlesArray;
}

export const DrawCircles = (props) => {
  const { x, y } = props;
  const rangeValues = {
    xMin: x - y,
    xMax: x + y,
    yMin: 0,
    yMax: y * 2
  }

  return <Group>
    <DrawCircle key={x} radius={y / 2} rangeValues={rangeValues} {...props} />
  </Group>
}
