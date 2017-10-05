import React from 'react';
import { Container, Image } from 'semantic-ui-react';

export interface Props {
  /** Incoming image file */
  droppedFile: File | undefined;
}

const defaultProps = {
  droppedFile: undefined,
};

const CanvasFile: React.StatelessComponent<Props | {}> = ({
  droppedFile,
}: Props) => (
  <Container textAlign="center">
    {droppedFile ? (
      <h3>{droppedFile.name}</h3>
    ) : (
      <Image src="/assets/image.png" />
    )}
    Original
  </Container>
);

CanvasFile.defaultProps = defaultProps;

export default CanvasFile;
