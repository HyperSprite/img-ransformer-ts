import React from 'react';
import { Grid } from 'semantic-ui-react';

import CanvasFile from '../CanvasFile';
import CanvasStream from '../CanvasStream';
import HeaderBlock from '../HeaderBlock';
import FlightDeck from '../FlightDeck';

import './style.css';

export interface Props {}

export interface State {
  /** File from the DropButton component */
  droppedFile: File | undefined;
  /** File from the DropButton component */
  streamedFile: File | undefined;
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
  }

  handleImageSelect(accepted: any) {
    console.log(accepted[0]);
    this.setState({ droppedFile: accepted[0], streamedFile: accepted[0] });
  }

  render() {
    return (
      <div>
        <HeaderBlock title={this.state.droppedFile && this.state.droppedFile.name } />
        <div className="it-main">
          <Grid stackable columns={2} >
            <Grid.Column>
              <CanvasFile droppedFile={this.state.droppedFile} />
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
