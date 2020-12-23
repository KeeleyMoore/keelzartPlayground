import React from 'react';
import { Group, Line } from 'react-konva';

export const DrawCantors = props => {
  const { width, height, stroke, strokeWidth, rotate, division, startLength } = props;

  const x = (width / 100) * startLength,
        y = height/2,
        len = width - (x * 2);

  let toReturn;
  switch (rotate) {
    case true:
      toReturn = <DrawAnlgedCantor key={'1'} x={x} y={y} len={len} stroke={stroke} division={division} strokeWidth={strokeWidth} />;
      break;
    case false:
    default:
      toReturn = <DrawStraightCantor key={'1'} x={x} y={y} len={len} stroke={stroke} division={division} strokeWidth={strokeWidth} />;
    break;
  }

  return <Group>
    {toReturn}
  </Group>;
}

const DrawAnlgedCantor = props => {
  const { len, stroke, x, y, vertical, division, strokeWidth } = props;
  let points = [x, y, x + len, y];
  if (vertical) {
    points = [x, y - len / 2, x, y + len / 2];
  }

  let cantorObjects = [<Line key={`${x}-0`} points={points} stroke={stroke} strokeWidth={strokeWidth} />];

  if (len > 7) {
    let x1 = x,
        x2 = x + len,
        y1 = y,
        y2 = y;
    if (vertical) {
      x1 = x - len * division;
      x2 = x - len * division;
      y1 = y - len / 2;
      y2 = y + len / 2;
    }
    cantorObjects = cantorObjects.concat(
      <DrawAnlgedCantor key={`${x}-1`} x={x1} y={y1} len={len * (division * 2)} stroke={stroke} strokeWidth={strokeWidth} vertical={!vertical} division={division} />,
      <DrawAnlgedCantor key={`${x}-2`} x={x2} y={y2} len={len * (division * 2)} stroke={stroke} strokeWidth={strokeWidth} vertical={!vertical} division={division} />
    );
  }

  return cantorObjects;
}

const DrawStraightCantor = props => {
  const { len, stroke, x, y, division, strokeWidth } = props;
  let cantorObjects = [<Line key={`${x}-0`} points={[x, y, x + len, y]} stroke={stroke} strokeWidth={strokeWidth} />];

  if (len > 1) {
    const newY = y + 20;
    
    cantorObjects = cantorObjects.concat(
      <DrawStraightCantor key={`${x}-1`} x={x} y={newY} len={len * division} stroke={stroke} strokeWidth={strokeWidth} division={division} />,
      <DrawStraightCantor key={`${x}-2`} x={x + (len * (division * 2))} y={newY} len={len/3} stroke={stroke} strokeWidth={strokeWidth} division={division} />
    );
  }

  return cantorObjects;
}
