import { FieldInputProps, FieldMetaProps } from 'formik';
import Dropzone from 'react-dropzone';

import React, { useState } from 'react';
import { Col, FormGroup, InputProps, Row } from 'reactstrap';
import { translate } from '@@/locales/translate';
import upload from '@@/assets/images/icons/BiUpload.svg';
import ScannerComponent from '../ScannerComponent';
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

const InputFileDropWithCamera = (props: DargInputProps) => {
    const onDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles && acceptedFiles.length)
            props.onChangeFile(acceptedFiles[0] as File);
    };
    const [cmp, setCmp] = useState<any>(false);

    return (
        <React.Fragment>

            <FormGroup className="container">
                <Row>
                    <Col md="4">
                        <Dropzone
                            onDrop={(acceptedFiles) => {
                                onDrop(acceptedFiles);
                            }}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <React.Fragment>
                                    <div
                                        style={{ cursor: 'pointer' }}
                                        className=""
                                        {...getRootProps()}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexDirection: 'column',
                                                border: '1px dashed grey',
                                                borderRadius: '5px',
                                                minHeight: '198px',
                                                padding: '2rem',
                                                ...props?.customStyle,
                                            }}
                                        >
                                            <input {...getInputProps()} />
                                            <div className="text-center">
                                                <img
                                                    src={upload}
                                                    alt="upload"
                                                    style={{ textAlign: 'center' }}
                                                />
                                            </div>
                                            <p style={{ textAlign: 'center', fontSize: '10px' }}>
                                                {translate('drag_drop')}{' '}
                                                <span style={{ fontWeight: '600' }}>
                                                    {translate(props.name)}
                                                </span>{' '}
                                            </p>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )}
                        </Dropzone>
                    </Col>
                    <Col md="4">
                        <ScannerComponent
                            title={translate("files")}
                            onChange={(val) => {
                                props.onChangeFile(val)
                            }}

                        ></ScannerComponent>
                    </Col>
                    <Col md="4">

                        <div onClick={() => setCmp(<CameraModal open setOpen={setCmp} handleCapture={(val) => props.onChangeFile(val)}></CameraModal>)} className='d-flex justify-content-center align-items-center' style={{ border: '1px dashed grey', borderRadius: '5px', height: "100%", cursor: "pointer" }}>
                            <div className='text-center'>
                                <i style={{ fontSize: "50px", color: colors.secondary }} className='bx bx-camera'></i>
                                <p style={{ color: colors.secondary }}>{translate("capture.image")}</p>
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
export default InputFileDropWithCamera;
