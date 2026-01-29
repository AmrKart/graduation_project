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
import { IUser, UserRoles } from "@@/interfaces/user";
import InputSelect from "@@/components/Common/Form/InputSelect";

interface Props {
    data?: IUser;
    open: boolean;
    setOpen: (val: boolean) => void;
    action: any;
    title: string;
    setReloadTrigger: (val: any) => void;
}

const AddOrUpdateModal = (
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
        (state: RootState) => state.Users.actionLoader
    );

    const formik = useFormik({
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string().required(translate('required')),
            email: Yup.string().email(translate('email.valid')).required(translate('required')),
            phone: Yup.string().required(translate('required')),
            password: Yup.string().min(8, translate('password.min')).required(translate('required')),
            role: Yup.string().required(translate('required')),
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
                <Col md="4">
                    <InputText
                        name={translate('name')}
                        validation={formik.getFieldProps('name')}
                        metaProps={formik.getFieldMeta('name')}
                        required
                    />
                </Col>
                <Col md="4">
                    <InputText
                        name={translate('email')}
                        validation={formik.getFieldProps('email')}
                        metaProps={formik.getFieldMeta('email')}
                        required
                    />
                </Col>
                <Col md="4">
                    <InputText
                        name={translate('phoneNumber')}
                        validation={formik.getFieldProps('phone')}
                        metaProps={formik.getFieldMeta('phone')}
                        inputProps={{ defaultValue: '' }}
                        required
                    />
                </Col>
                <Col md="6">
                    <InputText
                        name={translate('login.password')}
                        validation={formik.getFieldProps('password')}
                        metaProps={formik.getFieldMeta('password')}
                        inputProps={{ defaultValue: '' }}
                        required
                    />
                </Col>
                <Col md="6">
                    <InputSelect
                        name={translate('role')}
                        validation={formik.getFieldProps('role')}
                        metaProps={formik.getFieldMeta('role')}
                        inputProps={{ menuPosition: 'fixed' }}
                        options={Object.values(UserRoles).map(role => ({
                            label: translate(role),
                            value: role,
                        }))}
                        onChangeSelect={(e: any) => {
                            formik.setFieldValue('role', e.value);
                        }}
                        required
                    >
                    </InputSelect>
                </Col>
            </Row>
        </FullScreenModal>
    );
}

export default AddOrUpdateModal;