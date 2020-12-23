import React, { Component } from 'react';
import { DrawTree } from './drawTree';

import { CanvasTemplatePageInput } from '../../shared';

export class TreeGenerator extends Component {
  constructor(props) {
    super(props);

    this.numInputChange = this.numInputChange.bind(this);
    this.giveMeATree = this.giveMeATree.bind(this);
 
    this.state = {
      depth: 12,
      length: 6.6,
      thickness: 3,
      treesGenerated: 1,
      thicknessMax: 20,
      lengthMax: 10,
      depthMax: 13,
      height: window.innerHeight - 120,
      width: window.innerWidth,
      inputData: [{
        id: "depth",
        name: "Max Branch Depth",
        type: "number",
        defaultValue: this.depth,
        onChange: this.numInputChange,
        max: 13,
        min: 1
      }, {
        id: "length",
        name: "Max Branch Length",
        type: "number",
        defaultValue: this.length,
        onChange: this.numInputChange,
        max: 10,
        min: 1,
        step: 0.2
      }, {
        id: "thickness",
        name: "Branch Thickness",
        type: "number",
        defaultValue: this.thickness,
        onChange: this.numInputChange,
        max: 20,
        min: 1
      }, {
        type: 'button',
        id: "give-me-a-tree",
        text: "Give Me A Tree!",
        onClick: this.giveMeATree
      }]
    };
  }

  numInputChange(event) {
    let { value } = event.target;
    const { id } = event.target;
    const max = this.state[`${id}Max`];

    if (value && this.state[id] !== value) {
      if (value > max) {
        value = max;
      }

      this.setState({[id]: value });
    }
  }

  giveMeATree() {
    this.setState(state => {
      return { 
        treesGenerated: state.treesGenerated++
      }
    });
  }

  render() {
    const { depth, length, thickness, inputData, height, width } = this.state;

    return (
      <CanvasTemplatePageInput
        inputs={inputData}
        values={{
          depth: depth,
          length: length,
          thickness: thickness
        }}
        height={height}
        width={width}
      >
        <DrawTree
          depth={depth}
          length={11 - length}
          height={height}
          width={width}
          thickness={thickness / 10}
        />
      </CanvasTemplatePageInput>
    );
  }
}


// Origin : knowstack.com/html5-canvas-fractal-tree/ || gist.github.com/gsluthra/3401766





// class MyRect extends Component {
//   constructor(props) {
//     super(props);

//     this.changeSize = this.changeSize.bind(this);
//   }

//   changeSize() {
//     // to() is a method of `Konva.Node` instances
//     this.rect.to({
//       scaleX: Math.random() + 0.8,
//       scaleY: Math.random() + 0.8,
//       duration: 0.2
//     });
//   };
//   render() {
//     return (
//       <Rect
//         ref={node => {
//           this.rect = node;
//         }}
//         width={50}
//         height={50}
//         fill="green"
//         draggable
//         onDragEnd={this.changeSize}
//         onDragStart={this.changeSize}
//       />
//     );
//   }
// }


// function randomPointGenerator(start, segmentLength, increaseDecrease) {
//   let newPoint = start;
//   console.log('start', start, 'segment length', segmentLength, ' start plus segment', start + segmentLength, 'New point', Math.floor(Math.random() * Math.floor(start + segmentLength)));
//   if (increaseDecrease === 'increase') {
//     newPoint += Math.floor(Math.random() * Math.floor(start + segmentLength));
//   } else if (increaseDecrease === 'decrease') {
//     newPoint -= Math.random() * segmentLength;
//   } else {
//     let trueFalse = Math.floor(Math.random() * Math.floor(2));
//     if (trueFalse) {
//       newPoint += Math.random() * segmentLength;
//     } else {
//       newPoint -= Math.random() * segmentLength;
//     }
//   }
//   return newPoint;
// }

// class MyLine extends Component {
//   render() {
//     const {startPoint, splitCount, splitNumber} = this.props;
//     let newSplitNumber = splitNumber + 1;
//     const width = window.innerWidth, height = window.innerHeight;
//     console.log(startPoint, splitCount);
//     console.log(startPoint[0] / newSplitNumber, splitCount);
//     const heightSegment = height / (splitCount);
//     const widthSegment = width / splitCount;
//     const halfWidth = width / 2;
//     let linePointArray = startPoint;

//     linePointArray.push(
//       random((startPoint[0]), startPoint[0] + heightSegment),
//       random(startPoint[1] - widthSegment, startPoint[1] - widthSegment)
//     );
    
//     return (
//       <Line
//         points={linePointArray}
//         stroke={'red'}
//         strokeWidth={15}
//         lineCap={'round'}
//         lineJoin={'round'}
//         />
//     )
//   }
// }