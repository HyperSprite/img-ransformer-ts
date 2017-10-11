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

// TODO build 'rejected' handler
// Check file mime type, no sense letting people try loading an exe. 
const DropButton: React.StatelessComponent<Props | {}> = ({
  dropped,
}: Props) => (
  <div>
    
    <Dropzone
      className="dropzone"
      maxSize={9900000}
      multiple={false}
      ref={(node) => { dropzoneRef = node; }}
      onDrop={(accepted, rejected) => {dropped(accepted); }}
    >
      <Button primary fluid >Select Image</Button>
    </Dropzone>
  </div>
);

export default DropButton;
