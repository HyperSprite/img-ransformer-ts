import React from 'react';
import { Grid } from 'semantic-ui-react';

import ImageFile from '../../image';

import { DEFAULT_IMAGE_NAME, DROPPED_FILE } from '../../constants';
import CanvasFile from '../CanvasFile';
import CanvasStream from '../CanvasStream';
import HeaderBlock from '../HeaderBlock';
import FlightDeck from '../FlightDeck';

import './style.css';

export interface Props {}

export interface State {
  /** File from the DropButton component */
  droppedFile: string;
  /** Image data from CanvasFile to CanvasStreamed */
  streamedFile: ImageData | undefined;
}

class ImgTransformer extends React.Component<Props, State>
{
  constructor(props: any) {
    super(props);
    this.state = {
      droppedFile: undefined,
      streamedFile: undefined,
    };
    this.handleImageSelect = this.handleImageSelect.bind(this);
    this.handleCanvasFileToArray = this.handleCanvasFileToArray.bind(this);
  }

  componentWillMount() {
    /** First page load, clear any existing local storage */
    localStorage.clear();
    /** Set the default image */
    localStorage.setItem(DROPPED_FILE, ImageFile);
    this.setState({ droppedFile: DEFAULT_IMAGE_NAME });
  }

  setImage(reader: FileReader, file: File) {
    localStorage.setItem(DROPPED_FILE, reader.result);
    this.setState({ droppedFile: file.name });
    // console.log('setImage reader', reader);
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

  handleCanvasFileToArray(CanvasFileImageData: any) {
    if (CanvasFileImageData) {
      this.setState({ streamedFile: CanvasFileImageData });
    }
  }

  render() {
    const { droppedFile } = this.state;
    const imageTitle = droppedFile !== DEFAULT_IMAGE_NAME ? droppedFile : '';

    return (
      <div>
        <HeaderBlock title={imageTitle} />
        <div className="it-main">
          <Grid stackable columns={2} >
            <Grid.Column>
              <CanvasFile
                droppedFile={this.state.droppedFile}
                onCanvasFile={this.handleCanvasFileToArray}
              />
            </Grid.Column>
            <Grid.Column>
              <CanvasStream streamedFile={this.state.streamedFile} />
            </Grid.Column>
          </Grid>
          <Grid>
            <Grid.Row>
              <Grid.Column width={2} />
              <Grid.Column width={12}>
                <FlightDeck dropped={this.handleImageSelect} />
              </Grid.Column>
              <Grid.Column width={2} />
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default ImgTransformer;
