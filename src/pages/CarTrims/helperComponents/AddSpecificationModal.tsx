import InputSelect from "@@/components/Common/Form/InputSelect";
import InputText from "@@/components/Common/Form/InputText";
import FullScreenModal from "@@/components/Common/FullScreenModal";
import { Icons } from "@@/components/Common/Icons";
import { buildShamcarRequest } from "@@/helpers/buildRequest";
import { translate } from "@@/locales/translate";
import { RootState } from "@@/store";
import { getCarSpecifications } from "@@/store/carTrims/actions";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import * as Yup from 'yup';
interface Props {

    formik: any;
    open: boolean;
    setOpen: (val: boolean) => void;
    title: string;
    onAdd: (values: any) => void;
}
const AddSpecificationModal = ({ formik, open, setOpen, title, onAdd }: Props) => {

    const dispatch = useDispatch();

    const carSpecifications = useSelector((state: RootState) => state.CarTrims.carSpecifications);

    useEffect(() => {
        dispatch(getCarSpecifications(buildShamcarRequest({car_type_id: formik.getFieldProps('car_type_id').value})));
    }, [formik.getFieldProps('car_type_id').value]);    
    
    
    const form = useFormik({
        enableReinitialize: true,
        validationSchema: Yup.object({
            car_specification_id: Yup.number().required(translate('required')),
            value: Yup.string().required(translate('required')),
            unit: Yup.number().required(translate('required')),
        }),
        initialValues: {
            car_specification_id: null,
            value: null,
            unit: null,
        },
        onSubmit: (values: any) => {
            onAdd(values);
        },
        validateOnChange: false,
        validateOnBlur: false,
    });    

    return (
        <FullScreenModal
            isOpen={open}
            setOpen={setOpen}
            title={title}
            closeButton
            action={form.handleSubmit}
            actionIcon={Icons.add}
            modalSize='lg'
        >
            <Row>
                <Col md="6">
                    <InputSelect
                        name={translate('carSpecification.carSpecificationId')}
                        required
                        validation={form.getFieldProps('car_specification_id')}
                        metaProps={form.getFieldMeta('car_specification_id')}
                        options={carSpecifications.data?.map((specification: any) => ({
                            label: specification.name,
                            value: specification.id,
                            unit: specification.unit,
                        }))}
                        inputProps={{ menuPosition: 'fixed' }}
                        onChangeSelect={(val: any) => {
                            form.setFieldValue('car_specification_id', val.value);
                            form.setFieldValue('unit', val.unit);
                        }}
                    />                    
                </Col>
                <Col md="6">
                    <InputText
                        name={translate('carSpecification.value')}
                        validation={form.getFieldProps('value')}
                        metaProps={form.getFieldMeta('value')}
                        required
                    />
                </Col>
                <Col md="12">
                    <InputText
                        name={translate('carSpecification.unit')}
                        validation={form.getFieldProps('unit')}
                        metaProps={form.getFieldMeta('unit')}
                        inputProps={{ disabled: true }}
                        required
                    />
                </Col>
            </Row>


        </FullScreenModal>
    );
};

export default AddSpecificationModal;