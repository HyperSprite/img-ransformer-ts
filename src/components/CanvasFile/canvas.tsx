import * as React from 'react';

export interface CanvasComponentProps {
  onContextChange:(ctx:CanvasRenderingContext2D) => void;
}

export default class CanvasComponent extends React.Component<CanvasComponentProps, undefined> {

  private canvas:HTMLCanvasElement;

  constructor(props:CanvasComponentProps) {
    super(props);
  }

  resizeHandler = () => {
    if (this.canvas) {
      this.canvas.width = this.canvas.clientWidth;
      this.canvas.height = this.canvas.clientHeight;
      this.props.onContextChange(this.canvas.getContext('2d'));
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeHandler);
    this.resizeHandler();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  render() {
    return (
      <canvas ref={c => this.canvas = c}>
        This application requires an HTML Canvas to operate. Unfortunately, your browser does not support Canvas.
      </canvas>
    );
  }
}

// TODO: Turned off strictNullChecks for this file. Needs further investigation.
