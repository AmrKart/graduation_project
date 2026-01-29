import { translate } from '@@/locales/translate';
import { FieldInputProps, FieldMetaProps } from 'formik';
import React from 'react';
import { Input, Label, FormGroup, InputProps } from 'reactstrap';
export interface InputPasswordProps {
  size?: {
    xl?: string;
    md?: string;
    lg?: string;
    sm?: string;
  };
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validation: FieldInputProps<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metaProps: FieldMetaProps<any>;

  inputProps?: InputProps;
  required?: boolean;
}

const InputPassword = (props: InputPasswordProps) => {
  return (
    <React.Fragment>
      <FormGroup>
        <Label>
          {`${translate(props?.name ?? "")}`}
          <span className="text-danger">{props?.required ? '*' : ''}</span>
        </Label>{' '}
        <div className="mb-1">
          <Input type="password" {...props.validation} {...props.inputProps} />
        </div>
        {props.metaProps.error ? (
          <React.Fragment>
            <div style={{ color: 'red' }}>{props.metaProps.error}</div>
          </React.Fragment>
        ) : null}
      </FormGroup>
    </React.Fragment>
  );
};
export default InputPassword;
