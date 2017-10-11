import React from 'react';
import { Container } from 'semantic-ui-react';

// TODO: Make canvas responsive

export interface CanvasFileProps {
  /** File to render in this Canvas */
  originalFile?: any;
  onCanvasFile: (any: any) => void;
  /** Incoming image file name*/
  droppedFileName: string;
}

interface CanvasFileState {
  // ctx: CanvasRenderingContext2D;
  droppedFileName: string;
  width: number;
  height: number;
  imageReady: boolean;
}

class CanvasFile extends React.Component<CanvasFileProps | CanvasFileState> {
  public props: CanvasFileProps;
  public state: CanvasFileState;
  private canvasFileContainer: HTMLDivElement;
  private canvasFile: HTMLCanvasElement;
  constructor(props: CanvasFileProps) {
    super(props);
    this.state = {
      droppedFileName: '',
      width: 300,
      height: 300,
      imageReady: false,
    };
  }

  renderCanvas() {
    const ctx = this.canvasFile.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const imageObject = document.createElement('img');
    imageObject.src = this.props.originalFile;
    imageObject.onload = () => {
      this.setState({
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
      this.props.onCanvasFile(ctx.getImageData(0, 0, this.state.width, this.state.height));
    };
  }

  componentDidMount() {
    const setWidth = this.canvasFileContainer.clientWidth;
    this.setState(
      {
        droppedFileName: this.props.droppedFileName,
        width: setWidth,
        height: setWidth,
      },
      this.renderCanvas);
  }

  componentDidUpdate() {
    if (this.state.droppedFileName !== this.props.droppedFileName) {
      this.setState(
        {
          droppedFileName: this.props.droppedFileName,
          imageReady: false,
        },
        this.renderCanvas,
      );
    }
  }  

  render() {
    return (
      <Container textAlign="center">
        <h3>Original</h3>
        <div ref={c => this.canvasFileContainer = c}>
          <canvas
            ref={c => this.canvasFile = c}
            width={this.state.width}
            height={this.state.height}
          />
        </div>
      </Container>
    );
  }
}

export default CanvasFile;
