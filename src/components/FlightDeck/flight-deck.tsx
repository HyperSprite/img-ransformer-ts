import React from 'react';
import { Button, Grid, Modal } from 'semantic-ui-react';

import DropButton from '../DropButton';
import DropdownOptions from '../DropdownOptions';
import './style.css';

const DropdownSelect = (props: any) => (
  <DropdownOptions
    placeholder={props.placeholder}
    onChange={props[props.opt]}
    options={props.optionValues(props.opt)}
  />
);

const FlightDeck = (props: any) => {

  const LightsDrop = () => <DropdownSelect {...props} opt="lights" placeholder="Light" />;
  const ColorDrip = () => <DropdownSelect {...props} opt="rgbs" placeholder="Color" />;
  const TransitionDrop = () => <DropdownSelect {...props} opt="transitions" placeholder="Transition" />;

  // TODO Save Image feature.
  return (
    <div className="flight-deck-main">

      <Grid stackable columns="3">
        <Grid.Column width={4}>
          <DropButton {...props} />
        </Grid.Column>
        <Grid.Column width={8}>
          <Grid.Row>
            <LightsDrop />
          </Grid.Row>
          <Grid.Row>
            <ColorDrip />
          </Grid.Row>
          <Grid.Row>
            <TransitionDrop />
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
