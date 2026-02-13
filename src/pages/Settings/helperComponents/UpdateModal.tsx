import InputText from "@@/components/Common/Form/InputText";
import FullScreenModal from "@@/components/Common/FullScreenModal";
import { Icons } from "@@/components/Common/Icons";
import { buildShamcarRequest } from "@@/helpers/buildRequest";
import { translate } from "@@/locales/translate";
import { RootState } from "@@/store";
import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import * as Yup from 'yup';
import { ISettings } from "@@/interfaces/setting";

interface Props {
    data?: ISettings;
    open: boolean;
    setOpen: (val: boolean) => void;
    action: any;
    title: string;
    setReloadTrigger: (val: any) => void;
}

const UpdateModal = (
    {
        data,
        open,
        setOpen,
        action,
        title,
        setReloadTrigger
    }: Props) => {

    const dispatch = useDispatch();

    const loading = useSelector(
        (state: RootState) => state.Settings.actionLoader
    );

    const formik = useFormik({
        enableReinitialize: true,
        validationSchema: Yup.object({
           key: Yup.string().required(translate('required')),
           value: Yup.string().required(translate('required')),
        }),
        initialValues: { ...data },
        onSubmit: (values: any) => {
            dispatch(
                action(
                    buildShamcarRequest(values, null, null, null, [
                        {
                            action: setOpen,
                            isDispatch: false,
                            data: false,
                        },
                        {
                            action: ()=>{
                                setReloadTrigger((prev : number) => prev+1);
                            },
                            isDispatch: false,
                            data: false,
                        }

                    ])
                )
            );
        },
        validateOnChange: false,
        validateOnBlur: false,
    });

    return (
        <FullScreenModal
            isOpen={open}
            setOpen={setOpen}
            title={title}
            loading={loading}
            closeButton
            action={formik.handleSubmit}
            actionIcon={Icons.add}
            modalSize='lg'            
        >
            <Row>
                <Col md="6">
                    <InputText
                        name={translate('settings.key')}
                        validation={formik.getFieldProps('key')}
                        metaProps={formik.getFieldMeta('key')}
                        required
                    />
                </Col>
                <Col md="6">
                    <InputText
                        name={translate('value')}
                        validation={formik.getFieldProps('value')}
                        metaProps={formik.getFieldMeta('value')}
                        required
                    />
                </Col>               
            </Row>
        </FullScreenModal>
    );
}

export default UpdateModal;