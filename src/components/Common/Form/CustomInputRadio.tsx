import { translate, translationHelper } from '@@/locales/translate';
import { FieldInputProps, FieldMetaProps } from 'formik';
import React from 'react';
import { FormGroup, Input, Label, InputProps } from 'reactstrap';

export interface InputRadioProps {
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
  labelOne: string;
  labelTwo: string;
}

const InputRadio = (props: InputRadioProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.id.endsWith('-true');
    props.validation.onChange({
      target: {
        name: props.validation.name,
        value,
      },
    });
  };
  return (
    <FormGroup tag="fieldset">
      <p>{translate(props.label)}</p>
      <div style={{ display: 'flex', gap: '15px' }}>
        <FormGroup check style={{}}>
          <Label check>
            <Input
              type="radio"
              id={`${props.validation.name}-true`}
              checked={props.validation.value === true}
              onChange={handleChange}
              onBlur={props.validation.onBlur}
              {...props.inputProps}
            />
            {props.labelOne}
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              type="radio"
              id={`${props.validation.name}-false`}
              checked={props.validation.value === false}
              onChange={handleChange}
              onBlur={props.validation.onBlur}
              {...props.inputProps}
            />
            {props.labelTwo}
          </Label>
        </FormGroup>
      </div>
    </FormGroup>
  );
};

export default InputRadio
