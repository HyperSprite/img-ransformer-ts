import React from 'react';
import { Container } from 'semantic-ui-react';

import { DROPPED_FILE } from '../../constants';

// import CanvasComponent from './canvas';

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
    const imageObject = document.createElement('img');
    imageObject.src = localStorage.getItem(DROPPED_FILE);
    imageObject.onload = () => {
      this.setState({
        width: 300,
        height: 300,
        imageReady: true,
      });
      ctx.drawImage(imageObject as HTMLImageElement, 0, 0);
    };
    console.log('renderCanvas', imageObject);
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
