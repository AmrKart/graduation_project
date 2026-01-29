import { FieldInputProps, FieldMetaProps } from 'formik';
import moment from 'moment';
import React from 'react';
import { Label, FormGroup, InputProps, InputGroup } from 'reactstrap';
import 'flatpickr/dist/themes/material_blue.css';
import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect/index';
import 'flatpickr/dist/plugins/monthSelect/style.css';
import { Arabic } from 'flatpickr/dist/l10n/ar.js';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Flatpickr from 'react-flatpickr';
import { translate } from '@@/locales/translate';
import i18n from '@@/i18n';
import { convertDateToFromat } from '@@/common/helper';

export interface InputTextProps {
  isDateTime?: boolean;
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

  inputProps?: InputProps & {
    options?: any;
  };
  required?: boolean;
  isMonth?: boolean;
  title?: string;
  isonlyDate?: boolean;
}

const InputDate = (props: InputTextProps) => {
  const onChangeHandler = (data: any) => {
    if (data && data.length) {
      let value;
      if (props.isonlyDate) {
        // Return only the date in yyyy-MM-DD format without time
        value = moment(data[0]).format('YYYY-MM-DD');
      } else {
        value = moment(data[0]).toISOString();
      }

      props.validation.onChange({
        target: {
          name: props.validation.name,
          value: value,
        },
      });
    } else {
      props.validation.onChange({
        target: {
          name: props.validation.name,
          value: undefined,
        },
      });
    }
  };
  const arabicMonths = [
    'كانون الثاني',
    'شباط',
    'آذار',
    'نيسان',
    'أيار',
    'حزيران',
    'تموز',
    'آب',
    'أيلول',
    'تشرين الأول',
    'تشرين الثاني',
    'كانون الأول',
  ];
  const altFormat = props.isDateTime === true ? 'F j, Y - H:i' : 'F j, Y';
  return (
    <React.Fragment>
      <FormGroup>
        <Label>
          {props?.title
            ? translate(props?.title ?? '')
            : `${translate(props?.name ?? '')}`}
          <span className="text-danger">{props?.required ? '*' : ''}</span>
        </Label>{' '}
        <div className="mb-3">
          {!props.isMonth && (
            <Flatpickr
              className="form-control d-block"
              {...props.inputProps}
              onChange={(e: any) => {
                onChangeHandler(e);
              }}
              value={
                props.validation.value
                  ? moment(props.validation.value).toISOString()
                  : undefined
              }
              options={{
                ...(i18n.language == 'ar'
                  ? {
                      locale: {
                        ...Arabic,
                        months: {
                          ...Arabic.months,
                          shorthand: arabicMonths,
                          longhand: arabicMonths,
                        },
                      },
                      altInput: true,
                      shorthand: true, //defaults to false
                      // altFormat: 'F j, Y',
                      enableTime: props.isDateTime,
                      altFormat: altFormat,
                      // theme: "dark" // defaults to "light"
                    }
                  : {
                      altInput: true,
                      shorthand: true, //defaults to false
                      // altFormat: 'F j, Y',
                      enableTime: props.isDateTime,
                      altFormat: altFormat,
                    }),
                ...(props.inputProps?.options || {}),
              }}
            ></Flatpickr>
          )}
          {props.isMonth && (
            <InputGroup>
              <Flatpickr
                className="form-control d-block"
                // {...props.validation}
                onChange={(e: any) => {
                  onChangeHandler(e);
                }}
                value={
                  props.validation.value
                    ? moment(props.validation.value).toISOString()
                    : undefined
                }
                options={{
                  locale: {
                    ...Arabic,
                    months: {
                      ...Arabic.months,
                      shorthand: arabicMonths,
                      longhand: arabicMonths,
                    },
                  },
                  plugins: [
                    monthSelectPlugin({
                      shorthand: true, //defaults to false

                      altFormat: 'F Y', //defaults to "F Y"
                    }),
                  ],
                  altInput: true,
                  shorthand: true, //defaults to false

                  altFormat: 'F Y', //defaults to "F Y"
                  // theme: "dark" // defaults to "light"
                }}
              ></Flatpickr>
            </InputGroup>
          )}
        </div>
        {props.metaProps.error && (
          <React.Fragment>
            <div style={{ color: 'red' }}>{props.metaProps.error}</div>
          </React.Fragment>
        )}
      </FormGroup>
    </React.Fragment>
  );
};
export default InputDate;
