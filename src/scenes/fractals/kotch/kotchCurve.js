import React from 'react';
import { Group, Line } from 'react-konva';

const DrawCurve = props => {
  const { x1, y1, x2, y2, alpha, stroke, strokeWidth, depth, currentDept } = props;
  let points = [x1, y1, x2, y2];
  let curveLinesArray = [{ points: points }];
  let lines = [];
  if (currentDept === depth) {
    lines = curveLinesArray.map((LineObject, index) => {
      return <Line key={index} points={LineObject.points} stroke={stroke} strokeWidth={strokeWidth} />;
    });
    return lines;
  }
  const genericProps = {
    alpha: alpha,
    depth: depth,
    stroke: stroke,
    strokeWidth: strokeWidth,
    currentDept: currentDept + 1
  };
  const xThird = (x2 - x1) / 3,
    yThird = (y2 - y1) / 3;

  const xa = x1 + xThird,
    ya = y1 + yThird,
    xc = x2 - xThird,
    yc = y2 - yThird,
    xb = xa + (xc - xa) * Math.cos(-alpha) - (yc - ya) * Math.sin(-alpha),
    yb = ya + (yc - ya) * Math.cos(-alpha) + (xc - xa) * Math.sin(-alpha);

  // console.log('xb', (xc - xa), ' * cos',  (xc - xa) * Math.cos(-alpha), '-', (yc - ya), '* sin', (yc - ya) * Math.sin(-alpha) , ' === ',xa, '+', (xc - xa) * Math.cos(-alpha) - (yc - ya) * Math.sin(-alpha) );
  // console.log('--------------');
  // console.log('yb', (yc - ya), ' * cos', (yc - ya) * Math.cos(-alpha), '+', (xc - xa), '* sin', (xc - xa) * Math.sin(-alpha), '===',ya, '+', (yc - ya) * Math.cos(-alpha));

  return [
    <DrawCurve key={x1} x1={x1} y1={y1} x2={xa} y2={ya} {...genericProps} />,
    <DrawCurve key={xa} x1={xa} y1={ya} x2={xb} y2={yb} {...genericProps} />,
    <DrawCurve key={x2} x1={xb} y1={yb} x2={xc} y2={yc} {...genericProps} />,
    <DrawCurve key={xc} x1={xc} y1={yc} x2={x2} y2={y2} {...genericProps} />
  ];
};

export const DrawKotchCurve = (props) => {
  const { width, height, startLength, stroke = 'red', strokeWidth = 1, depth } = props;

  const x1 = (width / 100) * startLength,
    y1 = height * 7 / 8,
    len = width - (x1 * 2);
  return (
    <Group>
      <DrawCurve key={x1} x1={x1} y1={y1} x2={x1 + len} y2={y1} alpha={Math.PI / 3} stroke={stroke} strokeWidth={strokeWidth} depth={depth} currentDept={1} />
    </Group>
  );
};
