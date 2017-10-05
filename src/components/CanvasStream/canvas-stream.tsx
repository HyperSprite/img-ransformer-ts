import React from 'react';
import { Container, Image } from 'semantic-ui-react';

export interface Props {
  /** Incoming image file */
  streamedFile: File | undefined;
}

const defaultProps = {
  streamedFile: undefined,
};

const CanvasFile: React.StatelessComponent<Props | {}> = ({
  streamedFile,
}: Props) => (
  <Container textAlign="center">
    {streamedFile ? (
      <h3>{streamedFile.name}</h3>
    ) : (
      <Image src="/assets/image.png" />
    )}
    Original
  </Container>
);

CanvasFile.defaultProps = defaultProps;

export default CanvasFile;
