import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const DropdownOptions = (props: any) => (
  <Dropdown
    fluid
    upward
    selection
    placeholder={props.placeholder}
    onChange={props.onChange}
    options={props.options}
  />
);

export default DropdownOptions;
