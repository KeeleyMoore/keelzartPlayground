import React, { Component } from 'react';
import { CanvasTemplatePageInput } from '../../../shared';
import { DrawKotchCurve } from './kotchCurve';

export class KotchCurve extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this);
    this.numInputChange = this.numInputChange.bind(this);
    this.state = {
      depth: 4,
      depthCap: 8,
      startLength: 90,
      startLengthCap: 100,
      height: window.innerHeight - 120,
      width: window.innerWidth,
      inputData: [{
        id: "depth",
        name: "Depth of curve",
        type: "number",
        defaultValue: this.depth,
        onChange: this.numInputChange,
        max: "15",
        min: "1"
      }, {
        id: "startLength",
        name: "Start Length",
        type: "number",
        defaultValue: this.startLength,
        onChange: this.numInputChange,
        max: 100,
        min: 10,
        step: 10
      }]
    }
  }

  numInputChange(event) {
    let { value } = event.target;
    const { id } = event.target;
    const cap = this.state[`${id}Cap`];

    if (value && this.state[id] !== value) {
      if (value > cap) {
        value = cap;
      }

      this.setState({[id]: Number(value) });
    }
  }

  toggle(event) {
    const {value, name} = event.target;

    this.setState({ [name]: value === 'true' ? true : false });
  }

  render() {
    const { depth, inputData, height, width, startLength } = this.state;

    return (
      <CanvasTemplatePageInput
        inputs={inputData}
        values={{
          depth: depth,
          startLength: startLength
        }}
        width={width}
        height={height}
      >
        <DrawKotchCurve
          key={'1'}
          depth={depth}
          width={width}
          height={height}
          startLength={(100 - startLength) / 2}
        />
      </CanvasTemplatePageInput>
    )
  }
}
