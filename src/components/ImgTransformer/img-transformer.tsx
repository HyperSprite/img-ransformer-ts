import React from 'react';
import { Container, Grid, Image } from 'semantic-ui-react';

import HeaderBlock from '../HeaderBlock';
import FlightDeck from '../FlightDeck';

import './style.css';

class ImgTransformer extends React.Component {

  render() {
    return (
      <div>
        <HeaderBlock />
        <div className="it-main">
          <Grid stackable columns={2} >
            <Grid.Column>
              <Container textAlign="center">
                <Image src="/assets/image.png" />
                Original
              </Container>
            </Grid.Column>
            <Grid.Column>
              <Container textAlign="center">
                <Image src="/assets/image.png" />
                Transformed
              </Container>
            </Grid.Column>
          </Grid>
          <Grid>
            <Grid.Row>
              <Grid.Column width={2} />
              <Grid.Column width={12}>
                <FlightDeck />
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
