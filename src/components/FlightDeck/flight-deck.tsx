import React from 'react';
import { Button, Grid, Modal } from 'semantic-ui-react';

import DropButton from '../DropButton';
import DropdownOptions from '../DropdownOptions';
import lib from '../../util/lib-transform';
import './style.css';

const FlightDeck = (props: any) => {

  const RGBFilter = () => (
    <DropdownOptions
      placeholder="Color Filters"
      onChange={props.rgbFilterOnChange}
      options={lib.optionValuesRGB()}
    />
  );

  const Transition = () => (
    <DropdownOptions
      placeholder="Transitions"
      onChange={props.transitionOnChange}
      options={lib.optionValuesTransition()}
    />
  );


  // TODO Save Image feature.
  return (
    <div className="flight-deck-main">

      <Grid stackable columns="3">
        <Grid.Column width={4}>
          <DropButton {...props} />
        </Grid.Column>
        <Grid.Column width={8}>
          <Grid.Row>
            <RGBFilter />
          </Grid.Row>
          <Grid.Row>
            <Transition />
          </Grid.Row>
        </Grid.Column>
        <Grid.Column width={4}>
          <Modal trigger={
            <Button
              positive={!props.pristine}
              disabled={props.pristine}
              fluid
            >
              Save Image
            </Button>
            } basic size="small">
            <Modal.Content>
              <h3>Sorry, the Save feature is not yet implemented :(</h3>
            </Modal.Content>
          </Modal>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default FlightDeck;
