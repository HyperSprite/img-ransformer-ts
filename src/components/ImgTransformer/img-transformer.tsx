import React from 'react';
import { Grid } from 'semantic-ui-react';

import lib from '../../util/lib-transform';
import ImageFile from '../../image';

import { DEFAULT_IMAGE_NAME } from '../../constants';
import CanvasFile from '../CanvasFile';
import CanvasStream from '../CanvasStream';
import HeaderBlock from '../HeaderBlock';
import FlightDeck from '../FlightDeck';

import './style.css';

export interface Props {}

export interface State {
  originalFile: any;
  /** File from the DropButton component */
  droppedFileName: string;
  /** Image data from CanvasFile to CanvasStreamed */
  streamedFile: ImageData | undefined | any;
  /** Pristien Canvas Image */
  pristineFile: ImageData | undefined;
  /** A fresh image on the Canvas */
  pristine: boolean;
  /** Canvas Width */
  width: number;
  /** Canvas Height */
  height: number;
}

class ImgTransformer extends React.Component<Props, State>
{
  constructor(props: any) {
    super(props);
    this.state = {
      originalFile: undefined,
      droppedFileName: undefined,
      streamedFile: undefined,
      pristineFile: undefined,
      width: 350,
      height: 350,
      pristine: true,
    };
    this.handleImageSelect = this.handleImageSelect.bind(this);
    this.handleCanvasFileToArray = this.handleCanvasFileToArray.bind(this);
    this.handleTransitionOnChange = this.handleTransitionOnChange.bind(this);
    this.handleRGBFilterOnChange = this.handleRGBFilterOnChange.bind(this);
  }

  componentWillMount() {
    this.setState({ originalFile: ImageFile, droppedFileName: DEFAULT_IMAGE_NAME });
  }

  setImage(reader: FileReader, file: File) {
    this.setState({ originalFile: reader.result, droppedFileName: file.name });
  }

  handleImageSelect(accepted: File) {
    const reader  = new FileReader();
    if (accepted && accepted[0]) {
      reader.onload = () => {
        this.setImage(reader, accepted[0]);
      };
      reader.readAsDataURL(accepted[0]);
    }
  }

  handleRGBFilterOnChange(event: React.SyntheticEvent<HTMLDivElement>, data: any) {
    if (this.state.streamedFile) {
      const imageData = data.value === 'reload_image' ?
        this.state.pristineFile : 
        this.state.streamedFile;
      this.setState({
        pristine: false,
        streamedFile: lib.transoform(
          imageData,
          'rgb',
          data.value,
          (r: any) => r),
      });
    }
  }

  handleTransitionOnChange(event: React.SyntheticEvent<HTMLDivElement>, data: any) {
    if (this.state.streamedFile) {
      const imageData = this.state.streamedFile;

      this.setState({
        pristine: false,
        streamedFile: lib.transoform(
          imageData,
          'transition',
          data.value,
          (r: any) => r),
      });
    }
  }

  handleCanvasFileToArray(CanvasFileImageData: any) {
    if (CanvasFileImageData) {
      this.setState({
        pristine: true,
        streamedFile: CanvasFileImageData,
        pristineFile: CanvasFileImageData,
      });
    }
  }
  
  render() {
    const { droppedFileName } = this.state;
    const imageTitle = droppedFileName !== DEFAULT_IMAGE_NAME ? droppedFileName : '';
    
    return (
      <div>
        <HeaderBlock title={imageTitle} />

          <Grid stackable padded columns={4}>
            <Grid.Column width={1} />
            <Grid.Column width={7} >
              <CanvasFile
                originalFile={this.state.originalFile}
                droppedFileName={this.state.droppedFileName}
                onCanvasFile={this.handleCanvasFileToArray}
              />
            </Grid.Column>
            <Grid.Column width={7} >
              <CanvasStream
                streamedFile={this.state.streamedFile}
              />
            </Grid.Column>
            <Grid.Column width={1} />
          </Grid>
          <Grid>
            <Grid.Row>
              <Grid.Column width={2} />
              <Grid.Column width={12}>
                <FlightDeck
                  dropped={this.handleImageSelect}
                  transitionOnChange={this.handleTransitionOnChange}
                  rgbFilterOnChange={this.handleRGBFilterOnChange}
                  pristine={this.state.pristine}
                />
              </Grid.Column>
              <Grid.Column width={2} />
            </Grid.Row>
          </Grid>
      </div>
    );
  }
}

export default ImgTransformer;
