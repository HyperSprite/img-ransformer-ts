import React from 'react';
import Dropzone from 'react-dropzone';
import { Button } from 'semantic-ui-react';

import './style.css';

export interface Props {
  /** function to handle file dropping */
  dropped: any;
}

// TODO: research this type.
let dropzoneRef: any;

const DropButton: React.StatelessComponent<Props | {}> = ({
  dropped,
}: Props) => (
  <div>
    <Button primary fluid onClick={() => { dropzoneRef.open(); }}>Select Image</Button>
    <Dropzone
      className="dropzone"
      multiple={false}
      ref={(node) => { dropzoneRef = node; }}
      onDrop={(accepted, rejected) => { dropped(accepted); }}
    />
  </div>
);

export default DropButton;
