import {
  FieldInputProps,
  FieldMetaProps,
  FormikProps,
  useFormikContext,
} from 'formik';
import React from 'react';
import OtpInput from 'react-otp-input';

type Props = {
  name: string;
  number: number;
  validation: FieldInputProps<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metaProps: FieldMetaProps<any>;
};

export default function InputOtp({
  name,
  number,
  metaProps,
  validation,
}: Props) {
  return (
    <div>
      <OtpInput
        containerStyle={{
          direction: 'ltr',
        }}
        {...validation}
        onChange={(otpValue: string) => {
          validation.onChange({
            target: {
              name: name,
              value: otpValue === '' ? undefined : otpValue,
            },
          });
        }}
        numInputs={number}
        renderInput={(props) => (
          <div className="position-relative mx-1">
            <input
              {...props}
              className={`form-control bg-white ${
                metaProps?.error && metaProps?.touched
                  ? 'border border-danger'
                  : ''
              }`}
              style={{
                width: '60px',
                height: '60px',
                textAlign: 'center',
                fontSize: '24px',
                borderRadius: '8px',
                outline: 'none',
                position: 'relative',
                zIndex: 1,
              }}
            />
            <div
              className="position-absolute start-50 translate-middle-x"
              style={{
                bottom: '12px',
                width: '24px',
                height: '2px',
                backgroundColor: '#ced4da',
                zIndex: 2,
              }}
            />
          </div>
        )}
      />

      {metaProps?.error ? (
        <React.Fragment>
          <div style={{ color: 'red' }}>{metaProps?.error}</div>
        </React.Fragment>
      ) : null}
    </div>
  );
}
