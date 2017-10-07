import React from 'react';
import { Container } from 'semantic-ui-react';

// TODO: Make canvas responsive

export interface CanvasStreamedProps {
  /** Incoming image file */
  streamedFile?: ImageData;
}

interface canvasStreamedState {
  streamedFile: ImageData | undefined;
  width: number;
  height: number;
  imageReady: boolean;
}

class canvasStreamed extends React.Component<CanvasStreamedProps | canvasStreamedState> {
  public props: CanvasStreamedProps;
  public state: canvasStreamedState;
  private canvasStreamed: HTMLCanvasElement;
  constructor(props: CanvasStreamedProps) {
    super(props);
    this.state = {
      streamedFile: undefined,
      width: 300,
      height: 300,
      imageReady: false,
    };
  }

  /**
   * renderCanvas takes ImageData { Unit8ClampedArray, width, height }
   * This initially is a copy of the CanvasFile canvas
   */
  renderCanvas() {
    if (this.state.streamedFile) {
      const ctx = this.canvasStreamed.getContext('2d');
      console.log('canvasStreamed renderCanvas', this.state.streamedFile);
      ctx.putImageData(this.state.streamedFile, 0, 0);
    }
  }

  componentDidUpdate() {
    if (this.state.streamedFile !== this.props.streamedFile) {
      this.setState({ streamedFile: this.props.streamedFile }, this.renderCanvas);
    }
  }

  render() {

    return (
      <Container textAlign="center">
        <div>
          <canvas ref={c => this.canvasStreamed = c} width={this.state.width} height={this.state.height} />
        </div>
        Transformed
      </Container>
    );
  }
}

export default canvasStreamed;
