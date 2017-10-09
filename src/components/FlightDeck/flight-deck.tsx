import React from 'react';
import { Button, Dropdown, Grid, Icon } from 'semantic-ui-react';

import DropButton from '../DropButton';
import libRGB from '../../util/lib-rgb-filter';
import './style.css';

const FlightDeck = (props: any) => {

  const SetupDropdown = () => (
    <Dropdown
    fluid
    selection
    placeholder="Color Filter"
    onChange={props.rgbFilterOnChange}
    options={libRGB.rgbFilterValues()}
    />
  );

  return (
    <div className="flight-deck-main">

      <Grid stackable columns="3">
        <Grid.Column width={4}>
          <DropButton {...props} />
        </Grid.Column>
        <Grid.Column width={8}>
          <Grid.Row>
            <SetupDropdown />
          </Grid.Row>
          <Grid.Row>
            <Button
              fluid
              onClick={props.magicOnClick}
            >
              {'Magic '}<Icon name="wizard" />
            </Button>
          </Grid.Row>
        </Grid.Column>
        <Grid.Column width={4}>
          <Button
            positive={!props.pristine}
            disabled={props.pristine}
            fluid
          >
            Save Image
          </Button>
        </Grid.Column>
      </Grid>

    </div>
  );
};

export default FlightDeck;
