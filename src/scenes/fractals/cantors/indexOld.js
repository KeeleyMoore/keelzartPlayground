import React, { Component } from 'react';
import { CanvasTemplatePageInput } from '../../../shared';
import { DrawCantors } from './cantor';

export class FractalCantors extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this);
    this.numInputChange = this.numInputChange.bind(this);
        this.state = {
          division: 33.33,
          divisionCap: 35,
          strokeWidth: 1,
          startLength: 30,
          startLengthCap: 100,
          rotate: true,
          height: window.innerHeight - 120,
          width: window.innerWidth,
          inputData: [{
            id: "division",
            name: "Line Length division",
            type: "number",
            defaultValue: this.division,
            onChange: this.numInputChange,
            max: 35,
            min: 3,
            step: 1
          },
          {
            id: "strokeWidth",
            name: "Line Stroke",
            type: "number",
            defaultValue: this.strokeWidth,
            onChange: this.numInputChange,
            max: 10,
            min: 0.1,
            step: 0.5
          }, {
            id: "startLength",
            name: "Start Length",
            type: "number",
            defaultValue: this.startLength,
            onChange: this.numInputChange,
            max: 100,
            min: 10,
            step: 10
          }, {
            id: "rotate",
            name: "Rotate",
            type: "radio",
            radioOptions: [{value: true, text: 'Yes'}, {value: false, text: 'No'}],
            value: this.rotate,
            onChange: this.toggle
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
    const { inputData, height, width, division, strokeWidth, startLength, rotate } = this.state;

    return (
      <CanvasTemplatePageInput
        inputs={inputData}
        values={{
          division: division,
          strokeWidth: strokeWidth,
          startLength: startLength,
          rotate: rotate
        }}
        width={width}
        height={height}
      >
        <DrawCantors
          key={'1'}
          width={width}
          height={height}
          stroke={'white'}
          strokeWidth={strokeWidth}
          rotate={rotate}
          division={division / 100}
          startLength={(100 - startLength) / 2}
        />
      </CanvasTemplatePageInput>
    )
  }
}
