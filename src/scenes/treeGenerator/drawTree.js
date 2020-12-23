import React from 'react';
import { Line, Group } from 'react-konva';
import { random } from '../../utils';

const GenerateBranches = (x1, y1, angle, depth, randomBranchMax, thickness) => {
  const branchArmLength = random(0, randomBranchMax);
  let LineArray = [];

  if (depth !== 0) {
    const x2 = x1 + (Math.cos(angle * (Math.PI / 180.0)) * depth * branchArmLength);
    const y2 = y1 + (Math.sin(angle * (Math.PI / 180.0)) * depth * branchArmLength);
    LineArray.push({ points: [x1, y1, x2, y2], strokeWidth: depth * thickness });
    LineArray = LineArray.concat(
      GenerateBranches(x2, y2, angle - random(15, 20), depth - 1, randomBranchMax, thickness),
      GenerateBranches(x2, y2, angle + random(15, 20), depth - 1, randomBranchMax, thickness)
    );
  }

  return LineArray;
};

export const DrawTree = (props) => {
  const { depth, length, height, thickness, width } = props;
  const randomBranchMax = Math.floor((height / length) / depth);
  const branches = GenerateBranches(width / 2, height, -90, depth, randomBranchMax, thickness);

  return (
    <Group>
      {branches.map((branch, index) => (
        <Line
          key={`${index}-${branch.points[0]}`}
          points={branch.points}
          strokeWidth={branch.strokeWidth}
          stroke={'red'}
        />
      ))}
    </Group>
  );
};
