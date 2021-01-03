interface KotchCurvePattern {
  vertex: {
    x: number;
    y: number;
    z: number;
  }[];
  loop: boolean;
  margin: number[];
}

export const kotchCurvePatterns: Record<string, KotchCurvePattern> = {
  'line': {
    vertex: [
      { x: 0, y: 200, z: 0 },
      { x: 400, y: 200, z: 0 },
    ],
    loop: true,
    margin: [650, 150, 150]
  },
  'triangle': {
    vertex: [
      { x: 0, y: 0, z: 0 },
      { x: 200, y: 320, z: 0 },
      { x: 400, y: 0, z: 0 },
    ],
    loop: true,
    margin: [650, 350, 100]
  },
  'square': {
    vertex: [
      { x: 0, y: 0, z: 0 },
      { x: 400, y: 0, z: 0 },
      { x: 400, y: 400, z: 0 },
      { x: 0, y: 400, z: 0 },
    ],
    loop: true,
    margin: [650, 450]
  },
  'squareMirrored': {
    vertex: [
      { x: 0, y: 0, z: 0 },
      { x: 400, y: 0, z: 0 },
      { x: 400, y: 400, z: 0 },
      { x: 0, y: 400, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 400, z: 0 },
      { x: 400, y: 400, z: 0 },
      { x: 400, y: 0, z: 0 },
      { x: 400, y: 0, z: 0 },
    ],
    loop: true,
    margin: [650, 550, 100]
  },
  'cross': {
    vertex: [
      { x: 200, y: 200, z: 0 },
      { x: 400, y: 200, z: 0 },
      { x: 200, y: 200, z: 0 },
      { x: 200, y: 400, z: 0 },
      { x: 200, y: 200, z: 0 },
      { x: 0, y: 200, z: 0 },
      { x: 200, y: 200, z: 0 },
      { x: 200, y: 0, z: 0 },
      { x: 200, y: 200, z: 0 },
    ],
    loop: false,
    margin: [650, 450]
  },
  'diamond': {
    vertex: [
      { x: 200, y: 0, z: 0 },
      { x: 400, y: 200, z: 0 },
      { x: 200, y: 400, z: 0 },
      { x: 0, y: 200, z: 0 },
      { x: 200, y: 0, z: 0 }
    ],
    loop: false,
    margin: [650, 450]
  }
};
