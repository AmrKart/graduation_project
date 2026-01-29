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
import { ICarMake } from "@@/interfaces/carMake";

interface Props {
    data?: ICarMake;
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
        (state: RootState) => state.CarMakes.actionLoader
    );

    const formik = useFormik({
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string().required(translate('required')),            
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
                <Col md="12">
                    <InputText
                        name={translate('carMake.name')}
                        validation={formik.getFieldProps('name')}
                        metaProps={formik.getFieldMeta('name')}
                        required
                    />
                </Col>                
            </Row>
        </FullScreenModal>
    );
}

export default AddOrUpdateModal;