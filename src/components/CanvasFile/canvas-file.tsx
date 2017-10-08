import React from 'react';
import { Container } from 'semantic-ui-react';

// TODO: Make canvas responsive

export interface CanvasFileProps {
  /** File to render in this Canvas */
  originalFile?: any;
  onCanvasFile: (any: any) => void;
  /** Incoming image file */
  droppedFile: string;
  /** Sync width with ImgTransformer */
  width: number;
  /** Sync height with ImgTransformer */
  height: number;
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
  constructor(props: CanvasFileProps) {
    super(props);
    this.state = {
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
    imageObject.src = this.props.originalFile;
    imageObject.onload = () => {
      this.setState({
        width: this.props.width,
        height: this.props.height,
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
    this.setState(
      {
        droppedFile: this.props.droppedFile,
        width: this.props.width,
        height: this.props.height,
      },
      this.renderCanvas);
  }

  componentDidUpdate() {
    if (this.state.droppedFile !== this.props.droppedFile) {
      this.setState(
        {
          droppedFile: this.props.droppedFile,
          imageReady: false,
        },
        this.renderCanvas,
      );
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

export default CanvasFile;
