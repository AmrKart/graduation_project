import { FieldInputProps, FieldMetaProps } from 'formik';
import React from 'react';
import { Mention, MentionsInput } from 'react-mentions';
import classNames from './InputMentions.module.css';

import { Input, Label, FormGroup, FormFeedback, InputProps } from 'reactstrap';
import { translate } from '@@/locales/translate';
export interface InputMentionsProps {
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
  data: any;

  inputProps?: InputProps;
  required?: boolean;
}

const InputMentions = (props: InputMentionsProps) => {
  return (
    <React.Fragment>
      <FormGroup>
        <Label>
          {`${translate(props?.name ?? "")}`}
          <span className="text-danger">{props?.required ? '*' : ''}</span>
        </Label>
        <div className="mb-3">
          <MentionsInput
            value={props.validation.value}
            onChange={(t: any) => {
              props.validation.onChange({
                target: {
                  name: props.validation.name,
                  value: t.target.value.replace('{', '').replace('}', ''),
                },
              });
            }}
            className="mentions"
            classNames={classNames}
          >
            <Mention
              markup="{__display__}"
              trigger="@"
              className={classNames.mentions__mention}
              style={{
                // Customize suggestion styles here
                backgroundColor: '#f5f5f5',
                padding: '5px 10px',
                borderRadius: '3px',
                cursor: 'pointer',
              }}
              data={props.data}
            />
          </MentionsInput>
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
export default InputMentions;
