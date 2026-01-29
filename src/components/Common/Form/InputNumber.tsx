import { JObject } from '@@/common/types/json';
import { translate } from '@@/locales/translate';
import { FieldInputProps, FieldMetaProps } from 'formik';
import React from 'react';
import { Input, Label, FormGroup, InputProps } from 'reactstrap';

export interface InputNumberProps {
  size?: {
    xl?: number;
    md?: number;
    lg?: number;
    sm?: number;
  };
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validation: FieldInputProps<any>;
  inputProps?: InputProps;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metaProps?: FieldMetaProps<any>;
  required?: boolean;
  title?: string;
  parentStyle?: JObject;
  customRegex?: RegExp;
}

const InputNumber = (props: InputNumberProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    // Check if maxLength is specified in inputProps
    const maxLength = props.inputProps?.maxLength;
    if (maxLength && value.length > maxLength) {
      // If input exceeds maxLength, truncate it
      const truncatedValue = value.slice(0, maxLength);
      e.target.value = truncatedValue;
      handleValueChange(truncatedValue);
    } else {
      handleValueChange(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow: backspace, delete, tab, escape, enter, navigation keys
    if ([8, 9, 27, 13, 46, 37, 38, 39, 40].includes(e.keyCode)) {
      return;
    }

    const char = String.fromCharCode(e.keyCode);

    // Use custom regex if provided, otherwise use default regex for positive integers
    const validationRegex = props.customRegex || /^[0-9]+$/;

    // Regex validation for keypress
    const currentValue = e.currentTarget.value;
    const newValue =
      currentValue.slice(0, e.currentTarget.selectionStart!) +
      char +
      currentValue.slice(e.currentTarget.selectionEnd!);

    if (!validationRegex.test(newValue)) {
      e.preventDefault();
      return;
    }

    // Only allow numbers and specific characters
    if (!/[0-9.-]/.test(char)) {
      e.preventDefault();
      return;
    }
  };

  const handleValueChange = (value: string) => {
    // Handle empty value
    if (value === '' || value === '-') {
      props.validation.onChange({
        target: {
          name: props.validation.name,
          value: undefined,
        },
      });
      return;
    }

    // Use custom regex if provided, otherwise use default regex for positive integers
    const validationRegex = props.customRegex || /^[0-9]+$/;

    if (!validationRegex.test(value)) {
      return; // Don't update if validation fails
    }

    // Convert to number
    const numericValue = parseFloat(value);

    // Check if it's a valid number
    if (isNaN(numericValue)) {
      return;
    }

    // Update the form value
    props.validation.onChange({
      target: {
        name: props.validation.name,
        value: numericValue,
      },
    });
  };

  return (
    <div style={props?.parentStyle ?? {}}>
      <React.Fragment>
        <FormGroup>
          <Label>
            {`${
              props?.title
                ? translate(props?.title)
                : translate(props?.name ?? '')
            }`}
            <span className="text-danger">{props?.required ? '*' : ''}</span>
          </Label>
          <Input
            onWheel={(e) => {
              e.currentTarget.blur();
            }}
            onKeyDown={handleKeyDown}
            type="number"
            {...props.validation}
            {...props.inputProps}
            onChange={handleInputChange}
          />
          {props.metaProps?.error && (
            <div style={{ color: 'red' }}>{props.metaProps.error}</div>
          )}
        </FormGroup>
      </React.Fragment>
    </div>
  );
};

export default InputNumber;
