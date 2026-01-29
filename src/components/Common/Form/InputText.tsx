import { JObject } from '@@/common/types/json';
import { translate } from '@@/locales/translate';
import { FieldInputProps, FieldMetaProps } from 'formik';
import React from 'react';
import { Input, Label, FormGroup, InputProps } from 'reactstrap';
import { InputType } from 'reactstrap/types/lib/Input';

export interface InputTextProps {
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
  onlyName?: boolean;
  isNumber?: boolean;
  isArabicNum?: boolean;
  title?: string;
  type?: InputType;
  parentStyle?: JObject;
  customRegex?: RegExp;
  regx?: RegExp;
}

const InputText = (props: InputTextProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    // Always allow empty values
    if (value === '') {
      props.validation.onChange({
        ...e,
        target: {
          name: props.validation.name,
          value: undefined,
        },
      });
      return;
    }

    // Sanitize the value based on custom regex if provided
    if (props.customRegex || props.regx) {
      const regex = props.customRegex || props.regx;
      // Remove all characters that don't match the regex pattern
      const sanitizedValue = value
        .split('')
        .filter((char) => regex!.test(char))
        .join('');

      // Update the input field with sanitized value
      e.target.value = sanitizedValue;

      // If sanitization removed all characters, treat as empty
      if (sanitizedValue === '') {
        props.validation.onChange({
          ...e,
          target: {
            name: props.validation.name,
            value: undefined,
          },
        });
        return;
      }

      // Update form with sanitized value
      props.validation.onChange({
        ...e,
        target: {
          name: props.validation.name,
          value: sanitizedValue,
        },
      });
      return;
    }

    if (props?.onlyName) {
      const sanitizedValue = value.replace(/[^a-zA-Z\u0600-\u064A\s]/g, '');

      e.target.value = sanitizedValue;
    } else if (props?.isNumber) {
      const sanitizedValue = value.replace(/[^0-9]/g, '');

      e.target.value = sanitizedValue;
    } else if (props?.isArabicNum) {
      const sanitizedValue = value.replace(/[^\u0660-\u0669.\u066B]/g, '');

      e.target.value = sanitizedValue;
    }

    props.validation.onChange({
      ...e,
      target: {
        name: props.validation.name,
        value: e.target.value,
      },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow: backspace, delete, tab, escape, enter, navigation keys
    if ([8, 9, 27, 13, 46, 37, 38, 39, 40].includes(e.keyCode)) {
      return;
    }

    // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
    if (e.ctrlKey && [65, 67, 86, 88].includes(e.keyCode)) {
      return;
    }

    // Custom regex validation for keypress
    if (props.customRegex) {
      const char = String.fromCharCode(e.keyCode);
      const currentValue = e.currentTarget.value;
      const newValue =
        currentValue.slice(0, e.currentTarget.selectionStart!) +
        char +
        currentValue.slice(e.currentTarget.selectionEnd!);

      if (!props.customRegex.test(newValue)) {
        e.preventDefault();
        return;
      }
    }
  };

  return (
    <div style={props?.parentStyle ?? {}}>
      <React.Fragment>
        <FormGroup>
          <Label>
            {props?.title
              ? translate(props?.title ?? '')
              : `${translate(props?.name ?? '')}`}
            <span className="text-danger">{props?.required ? '*' : ''}</span>
          </Label>{' '}
          <div className="mb-1">
            <Input
              type={props?.type ?? 'text'}
              {...props.validation}
              {...props.inputProps}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              style={{ color: '#1a1f2e' }}
            />
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

export default InputText;
