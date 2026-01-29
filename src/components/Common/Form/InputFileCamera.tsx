import { FieldInputProps, FieldMetaProps } from 'formik';
import React, { useState } from 'react';
import { Col, FormGroup, InputProps, Row } from 'reactstrap';
import { translate } from '@@/locales/translate';
import CameraModal from '../CameraModel';
import { colors } from '../Colors';
export interface DargInputProps {
  size?: {
    xl?: string;
    md?: string;
    lg?: string;
    sm?: string;
  };
  customStyle?: any;
  onChangeFile: (val: File) => void;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validation: FieldInputProps<any>;

  inputProps?: InputProps;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metaProps?: FieldMetaProps<any>;
  disabled?: boolean;
}

const InputFileCamera = (props: DargInputProps) => {
  const [cmp, setCmp] = useState<any>(false);

  return (
    <React.Fragment>
      <FormGroup className="container">
        <Row>
          <Col md="12">
            <div
              onClick={() =>
                setCmp(
                  <CameraModal
                    open
                    setOpen={setCmp}
                    handleCapture={(val) => props.onChangeFile(val)}
                  ></CameraModal>
                )
              }
              className="d-flex justify-content-center align-items-center"
              style={{
                border: '1px dashed grey',
                borderRadius: '5px',
                height: '100%',
                cursor: 'pointer',
                minHeight: '200px',
              }}
            >
              <div className="text-center">
                <i
                  style={{ fontSize: '50px', color: colors.secondary }}
                  className="bx bx-camera"
                ></i>
                <p style={{ color: colors.secondary }}>
                  {translate('capture.image')}
                </p>
              </div>
            </div>
          </Col>
          {props.metaProps?.error ? (
            <React.Fragment>
              <div style={{ color: 'red' }}>{props.metaProps.error}</div>
            </React.Fragment>
          ) : null}
        </Row>
      </FormGroup>

      {cmp}
    </React.Fragment>
  );
};
export default InputFileCamera;
