import { JObject } from '@@/common/types/json';
import { translate } from '@@/locales/translate';
import { FieldInputProps, FieldMetaProps } from 'formik';
import React from 'react';
import { Input, Label, FormGroup, FormFeedback, InputProps } from 'reactstrap';
export interface InputTextareaProps {
  size?: {
    xl?: number;
    md?: number;
    lg?: number;
    sm?: number;
  };
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validation: FieldInputProps<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metaProps: FieldMetaProps<any>;

  inputProps?: InputProps;
  required?: boolean;
  parentStyle?: JObject;
}

const InputTextarea = (props: InputTextareaProps) => {
  return (
    <div style={props?.parentStyle ?? {}}>
      <React.Fragment>
        <FormGroup>
          <Label>
            {`${translate(props.name)}`}
            <span className="text-danger">{props?.required ? '*' : ''}</span>
          </Label>
          <div className="mb-3">
            <Input type="textarea" {...props.validation} {...props.inputProps} />
          </div>
          {props.metaProps.error ? (
            <React.Fragment>
              <div style={{ color: 'red' }}>{props.metaProps.error}</div>
            </React.Fragment>
          ) : null}
        </FormGroup>
      </React.Fragment>
    </div>
  );
};
export default InputTextarea;
