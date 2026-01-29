import DragFileInput from '@@/components/Common/Form/InputFileDrop';
import { translate } from '@@/locales/translate';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import {

    Col,

    Row,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@@/store';
import Loader from '@@/components/Common/Loader';
import DocumentInfo from './DocumentInfo';
import { MoiRequest } from '@@/common/types/axiosRequest';
import { ExecuteActionDto } from '@@/dtos/executeAction';
import FullScreenModal from '../Common/FullScreenModal';
import { Icons } from '../Common/Icons';
import { JObject } from '@@/common/types/json';

type Props = {

    action: (data: MoiRequest<ExecuteActionDto>) => any;
    onClose: () => void;
    additionalInputs?: Array<JObject>


};

export default function UploadDocument({ action, onClose }: Props) {
    const dispatch = useDispatch();

    const { actionLoading } = useSelector((state: RootState) => ({
        actionLoading: state.Request.actionLoader
    }));

    const form = useFormik({
        enableReinitialize: true,
        initialValues: {
            files: [],
        },
        validationSchema: Yup.object({
            files: Yup.mixed().required(translate("requried")),
        }),
        validateOnChange: false,
        validateOnBlur: false,


        onSubmit: (values: JObject) => {
            ""
        },
    });


    return (
        <>
            <FullScreenModal modalSize={"md"} isOpen={true} setOpen={onClose} title={translate("attachment.add")} closeButton actionIcon={Icons.add} action={() => { form.handleSubmit() }} actionTitle='save'>
                <Loader loading={actionLoading}>


                    <Row xl={12} lg={12} md={12} sm={12} xs={12}>

                        <Col>
                            <DragFileInput
                                name="files"
                                validation={form.getFieldProps('files')}
                                metaProps={form.getFieldMeta('files')}
                                onChangeFile={(val: File) => {
                                    const newArr = [
                                        ...form.getFieldProps('files').value,
                                        val,
                                    ];
                                    form.getFieldProps('files').onChange({
                                        target: {
                                            name: 'files',
                                            value: newArr,
                                        },
                                    });
                                }}
                            />
                        </Col>
                        {/* <Col>
                                            <ScannerComponent
                                                title={translationHelper('files')}
                                                onChange={(val: File) => {
                                                    const newArr = [
                                                        ...formik.getFieldProps('files').value,
                                                        val,
                                                    ];
                                                    formik.getFieldProps('files').onChange({
                                                        target: {
                                                            name: 'files',
                                                            value: newArr,
                                                        },
                                                    });
                                                }}
                                            />
                                        </Col> */}
                    </Row>
                    {form.getFieldProps('files').value.length > 0 &&
                        form
                            .getFieldProps('files')
                            .value.map((ele: File, ind: number) => (
                                <DocumentInfo
                                    key={ind}
                                    ind={ind}
                                    file={ele}
                                    preview={URL.createObjectURL(ele)}
                                    handleClick={() => {
                                        const newArr = [
                                            ...form.getFieldProps('files').value,
                                        ];
                                        newArr.splice(ind, 1);
                                        form.setFieldValue('files', newArr);
                                    }}
                                    label="file"
                                />
                            ))}

                </Loader>
            </FullScreenModal>
        </>
    );
}
