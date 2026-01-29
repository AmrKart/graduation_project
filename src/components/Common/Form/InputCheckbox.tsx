import { translate } from '@@/locales/translate';
import { FieldInputProps, FieldMetaProps } from 'formik';
import React from 'react';
import { Input, Label, FormGroup, InputProps } from 'reactstrap';
export interface InputCheckboxProps {
  size?: {
    xl?: number;
    md?: number;
    lg?: number;
    sm?: number;
  };
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validation: FieldInputProps<any>;

  inputProps?: InputProps;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metaProps?: FieldMetaProps<any>;
}

const InputCheckbox = (props: InputCheckboxProps) => {
  return (
    <React.Fragment>
      <FormGroup>
        <Input
          type="checkbox"
          id={props.validation.name}
          checked={props.validation.value}
          {...props.validation}
          {...props.inputProps}
        />
        <Label for="number" className="ms-2">
          {translate(props?.label ?? "")}
        </Label>
      </FormGroup>
    </React.Fragment>
  );
};
export default InputCheckbox;
