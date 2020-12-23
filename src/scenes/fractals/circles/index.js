import React, { Component } from 'react';
import { CanvasTemplatePageInput } from '../../../shared';
import { DrawCircles } from './drawCircles';

export class FractalCircles extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this);
    this.numInputChange = this.numInputChange.bind(this);
    this.state = {
      reduceX: true,
      reduceY: false,
      minRadius: 6,
      minRadiusCap: 5,
      height: window.innerHeight - 120,
      width: window.innerWidth,
      inputData: [{
        id: "minRadius",
        name: "Min Circle Radius",
        type: "number",
        defaultValue: this.minRadius,
        onChange: this.numInputChange,
        max: "100",
        min: "5"
      }, {
        id: "reduceX",
        name: "Reduce by X Axis",
        type: "radio",
        radioOptions: [{value: true, text: 'Yes'}, {value: false, text: 'No'}],
        value: this.reduceX,
        onChange: this.toggle
      }, {
        id: "reduceY",
        name: "Reduce by Y Axis",
        type: "radio",
        radioOptions: [{value: true, text: 'Yes'}, {value: false, text: 'No'}],
        value: this.reduceY,
        onChange: this.toggle
      }]
    }
  }

  numInputChange(event) {
    let { value } = event.target;
    const { id } = event.target;
    const cap = this.state[`${id}Cap`];

    if (value && this.state[id] !== value) {
      if (value < cap) {
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
    const { reduceX, reduceY, minRadius, inputData, height, width } = this.state;

    return (
      <CanvasTemplatePageInput
        inputs={inputData}
        values={{
          reduceX: reduceX,
          reduceY: reduceY,
          minRadius: minRadius
        }}
        width={width}
        height={height}
      >
        <DrawCircles
          key={'1'}
          x={width / 2}
          y={height / 2}
          minRadius={minRadius}
          reduceX={reduceX}
          reduceY={reduceY}
        />
      </CanvasTemplatePageInput>
    )
  }
}
