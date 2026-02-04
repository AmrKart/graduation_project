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
import InputTextarea from "@@/components/Common/Form/InputTextarea";

interface Props {
    id?: string;
    open: boolean;
    setOpen: (val: boolean) => void;
    action: any;
    title: string;
    setReloadTrigger: (val: any) => void;
}

const AddAnswer = (
    {
        id,
        open,
        setOpen,
        action,
        title,
        setReloadTrigger
    }: Props) => {
    

    const loading = useSelector(
        (state: RootState) => state.QAReducer.actionLoader
    );

    const dispatch = useDispatch();

    

    const formik = useFormik({
        enableReinitialize: true,
        validationSchema: Yup.object({
            body: Yup.string().required(translate('required')),            
        }),
        initialValues: {},
        onSubmit: (values: any) => {
            console.log("val = ", values);
            dispatch(
                action(
                    buildShamcarRequest({...values,id}, null, null, null, [
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
                    <InputTextarea
                        name={translate('answer.body')}
                        validation={formik.getFieldProps('body')}
                        metaProps={formik.getFieldMeta('body')}                        
                        required
                    />
                </Col>                                          
            </Row>
        </FullScreenModal>
    );
}

export default AddAnswer;