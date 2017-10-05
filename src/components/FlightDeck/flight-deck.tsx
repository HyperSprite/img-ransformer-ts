import React from 'react';
import { Button, Dropdown, Grid, Icon } from 'semantic-ui-react';

import lib from '../../util/lib';
import './style.css';

const FlightDeck = () => (
  <div className="flight-deck-main">

    <Grid stackable columns="3">
      <Grid.Column width={4}>
        <Button primary fluid >Select Image</Button>
      </Grid.Column>
      <Grid.Column width={8}>
        <Grid.Row>
          <Dropdown fluid placeholder="Grayscale" selection options={lib.grayFilterValues()} />
        </Grid.Row>
        <Grid.Row>
          <Button fluid >{'Magic '}<Icon name="wizard" /></Button>
        </Grid.Row>
      </Grid.Column>
      <Grid.Column width={4}>
        <Button secondary disabled fluid >Save Image</Button>
      </Grid.Column>
    </Grid>

  </div>
);

export default FlightDeck;
