import React from 'react';
import { Container } from 'semantic-ui-react';

import { DROPPED_FILE } from '../../constants';

// TODO: Make canvas responsive

export interface CanvasFileProps {
  /** Incoming image file */
  droppedFile: string;
}

interface CanvasFileState {
  // ctx: CanvasRenderingContext2D;
  droppedFile: string;
  width: number;
  height: number;
  imageReady: boolean;
}

class CanvasFile extends React.Component<CanvasFileProps | CanvasFileState> {
  public props: CanvasFileProps;
  public state: CanvasFileState;
  private canvasFile: HTMLCanvasElement;
  // HTMLImageElement
  static defaultProps: any;
  constructor(props: CanvasFileProps) {
    super(props);
    this.state = {
      // ctx: null,
      droppedFile: '',
      width: 300,
      height: 300,
      imageReady: false,
    };
  }

  renderCanvas() {
    const ctx = this.canvasFile.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const imageObject = document.createElement('img');
    imageObject.src = localStorage.getItem(DROPPED_FILE);
    imageObject.onload = () => {
      this.setState({
        width: 300,
        height: 300,
        imageReady: true,
      });
      // scaling image to fit canvas
      const scaleCanvas = Math.min(
        (this.canvasFile.width / imageObject.width),(this.canvasFile.height / imageObject.height),
      );    
      const sw1 = imageObject.width * scaleCanvas;
      const sh1 = imageObject.height * scaleCanvas;
      ctx.drawImage(imageObject,(this.canvasFile.width - sw1) / 2, (this.canvasFile.height - sh1) / 2,sw1,sh1);
      // fill canvas
      // const imgX = 0;
      // const imgY = 0;
      // ctx.drawImage(imageObject, imgX, imgY, this.canvasFile.width, this.canvasFile.height);
      // just load canvas
      // ctx.drawImage(imageObject as HTMLImageElement, 0, 0);
    };
    console.log('renderCanvas', ctx);
  }

  componentDidMount() {
    this.renderCanvas();
  }

  componentDidUpdate() {
    if (this.state.droppedFile !== this.props.droppedFile) {
      this.setState({ imageReady: false });
      this.renderCanvas();
      this.setState({ droppedFile: this.props.droppedFile });
    }
  }

  render() {

    return (
      <Container textAlign="center">
        <div>
          <canvas ref={c => this.canvasFile = c} width={this.state.width} height={this.state.height} />
        </div>
        Original
      </Container>
    );
  }
}

// CanvasFile.defaultProps = defaultProps;

export default CanvasFile;
