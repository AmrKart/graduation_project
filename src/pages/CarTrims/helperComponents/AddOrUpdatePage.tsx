import InputText from "@@/components/Common/Form/InputText";
import { Icons } from "@@/components/Common/Icons";
import { buildShamcarRequest } from "@@/helpers/buildRequest";
import { translate } from "@@/locales/translate";
import { RootState } from "@@/store";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardTitle, Col, Collapse, Container, Row } from "reactstrap";
import * as Yup from 'yup';
import AsyncSelect from "@@/components/Common/Form/AsyncSelect";
import { GET_CAR_MAKES, GET_CAR_MODELS, GET_CAR_TYPES } from "@@/helpers/url_helper";
import InputNumber from "@@/components/Common/Form/InputNumber";
import InputCheckbox from "@@/components/Common/Form/InputCheckbox";
import InputSelect from "@@/components/Common/Form/InputSelect";
import CustomeCardTitle from "@@/components/Common/Card/CustomeCardTitle";
import { useNavigate, useParams } from "react-router-dom";
import { addCarTrim, getCarSpecifications, getCarTrimDetails, updateCarTrim } from "@@/store/actions";
import Loader from "@@/components/Common/Loader";

const AddOrUpdatePage = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            dispatch(getCarTrimDetails(buildShamcarRequest({ id: id })));
        }
    }, [id]);

    const { data,loading } = useSelector((state: RootState) => state.CarTrims.singleCarTrim);

    const [open, setOpen] = useState(false);


    const formik = useFormik({
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string().required(translate('required')),
            car_model_id: Yup.number().required(translate('required')),
            car_make_id: Yup.number().required(translate('required')),
            car_type_id: Yup.number().required(translate('required')),
            start_production_year: Yup.number().min(1900).max(2100).nullable(),
            end_production_year: Yup.number().min(1900).max(2100).nullable(),
            price_min: Yup.number().nullable(),
            price_max: Yup.number().nullable(),
            currency: Yup.string().nullable(),
            is_published: Yup.boolean().nullable(),
            description: Yup.string().nullable(),
            specifications: Yup.array().min(1, translate('required')).of(Yup.object({
                car_specification_id: Yup.number().required(translate('required')),
                value: Yup.string().required(translate('required')),
                unit: Yup.string().nullable(),
            })).required(translate('required')),
        }),
        initialValues: { ...(data || {}), is_published: data?.is_published ?? false, specifications: data?.specifications ?? [] },
        onSubmit: (values: any) => {            
            if (id) {
                dispatch(updateCarTrim(buildShamcarRequest(values, null, null, null, [])));
            } else {
                dispatch(addCarTrim(buildShamcarRequest(values, null, null, null, [])));
            }
        },
        validateOnChange: false,
        validateOnBlur: false,
    });

    useEffect(() => {
        if (formik.getFieldProps('car_type_id').value) {
            dispatch(getCarSpecifications(buildShamcarRequest({ car_type_id: formik.getFieldProps('car_type_id').value })));
        }
    }, [formik.getFieldProps('car_type_id').value]);

    const carSpecifications = useSelector((state: RootState) => state.CarTrims.carSpecifications);


    const [showMessage, setShowMessage] = useState(false);

    const actionLoader = useSelector((state: RootState) => state.CarTrims.actionLoader);

    return (
        <React.Fragment>
            <div className="page-content">
                <Loader loading={loading || carSpecifications?.loading || actionLoader}>
                    <Container fluid>
                        <CustomeCardTitle
                            title={id ? translate('carTrim.update') : translate('carTrim.add')}
                            actions={[
                                {
                                    title: translate('save'),
                                    icon: Icons.check,
                                    onClick: () => formik.handleSubmit(),
                                },
                                {
                                    title: translate('close'),
                                    icon: Icons.close,
                                    onClick: () => navigate(-1),
                                }

                            ]}
                        />
                        <Row>
                            <Col md="6">
                                <InputText
                                    name={translate('carTrim.name')}
                                    validation={formik.getFieldProps('name')}
                                    metaProps={formik.getFieldMeta('name')}
                                    required
                                />
                            </Col>
                            <Col md="6">
                                <InputText
                                    name={translate('carTrim.description')}
                                    validation={formik.getFieldProps('description')}
                                    metaProps={formik.getFieldMeta('description')}
                                />
                            </Col>
                            <Col md="12">
                                <InputCheckbox
                                    size={{ xl: 6 }}
                                    label="carTrim.isPublished"
                                    validation={formik.getFieldProps('is_published')}
                                    metaProps={formik.getFieldMeta('is_published')}
                                    inputProps={{
                                        placeholder: '',
                                        onChange: (e => {
                                            formik.setFieldValue('is_published', e.target.checked);
                                        })
                                    }}
                                />
                            </Col>
                            <Col md="6">
                                <AsyncSelect
                                    url={GET_CAR_MAKES}
                                    required
                                    filterKey={'name'}
                                    label={'name'}
                                    name={translate('carMake.name')}
                                    inputProps={{ isDisabled: false }}
                                    validation={formik.getFieldProps('car_make_id')}
                                    metaProps={formik.getFieldMeta('car_make_id')}
                                    onChangeSelect={(val: any) =>
                                        formik.setFieldValue('car_make_id', val.value)
                                    }
                                ></AsyncSelect>
                            </Col>
                            <Col md="6">
                                {formik.getFieldProps('car_make_id').value ? <AsyncSelect
                                    url={GET_CAR_MODELS}
                                    required
                                    preFilter={{ car_make_id: formik.getFieldProps('car_make_id').value }}
                                    filterKey={'name'}
                                    label={'name'}
                                    name={translate('carModel.name')}
                                    inputProps={{ isDisabled: formik.getFieldProps('car_make_id').value ? false : true }}
                                    validation={formik.getFieldProps('car_model_id')}
                                    metaProps={formik.getFieldMeta('car_model_id')}
                                    onChangeSelect={(val: any) =>
                                        formik.setFieldValue('car_model_id', val.value)
                                    }
                                ></AsyncSelect> : <InputSelect name={translate('carModel.name')} required options={[]} inputProps={{ isDisabled: true }} />}
                            </Col>
                            <Col md="6">
                                <AsyncSelect
                                    url={GET_CAR_TYPES}
                                    required
                                    filterKey={'name'}
                                    label={'name'}
                                    name={translate('carType.name')}
                                    inputProps={{ isDisabled: false }}
                                    validation={formik.getFieldProps('car_type_id')}
                                    metaProps={formik.getFieldMeta('car_type_id')}
                                    onChangeSelect={(val: any) => {
                                        formik.setFieldValue('car_type_id', val.value);
                                        setShowMessage(false);
                                        carSpecifications?.data?.forEach((specification: any, index: number) => {
                                            formik.setFieldValue(`specifications[${index}].car_specification_id`, specification.id);
                                            formik.setFieldValue(`specifications[${index}].unit`, specification.unit);
                                        });
                                    }
                                    }
                                ></AsyncSelect>
                            </Col>
                            <Col md="6">
                                <InputText
                                    name={translate('carTrim.currency')}
                                    validation={formik.getFieldProps('currency')}
                                    metaProps={formik.getFieldMeta('currency')}
                                    inputProps={{ maxLength: 3 }}
                                />
                            </Col>
                            <Col md="6">
                                <InputNumber
                                    name={translate('carTrim.startProductionYear')}
                                    validation={formik.getFieldProps('start_production_year')}
                                    metaProps={formik.getFieldMeta('start_production_year')}
                                    inputProps={{ min: 1900, max: 2100 }}
                                />
                            </Col>
                            <Col md="6">
                                <InputNumber
                                    name={translate('carTrim.endProductionYear')}
                                    validation={formik.getFieldProps('end_production_year')}
                                    metaProps={formik.getFieldMeta('end_production_year')}
                                    inputProps={{ min: 1900, max: 2100 }}
                                />
                            </Col>
                            <Col md="6">
                                <InputNumber
                                    name={translate('carTrim.priceMin')}
                                    validation={formik.getFieldProps('price_min')}
                                    metaProps={formik.getFieldMeta('price_min')}
                                />
                            </Col>
                            <Col md="6">
                                <InputNumber
                                    name={translate('carTrim.priceMax')}
                                    validation={formik.getFieldProps('price_max')}
                                    metaProps={formik.getFieldMeta('price_max')}
                                />
                            </Col>
                        </Row>
                    </Container>
                    <CardTitle
                        className="p-1 "
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            if (!formik.getFieldProps('car_type_id').value) {
                                setShowMessage(true);
                                return;
                            }
                            setOpen(!open);
                        }}
                    >
                        {`${open ? '▼' : '◄'} ${translate('carTrim.add.specifications')}`} <p style={{ display: 'inline-block', marginLeft: '10px', color: 'red' }}>{'*'}</p>
                        {formik.touched.specifications && formik.errors.specifications && <p style={{ display: 'inline-block', marginLeft: '10px', color: 'red' }}>{translate('required')}</p>}
                        {showMessage && <p style={{ display: 'inline-block', marginLeft: '10px', color: 'red' }}>{translate('carTrim.add.specifications.message')}</p>}
                    </CardTitle>
                    <Collapse
                        isOpen={open}
                    >
                        <Row>
                            {carSpecifications.data?.map((specification: any, index: number) =>
                                <Col md="4" key={specification.id}>
                                    <InputText
                                        name={specification.name}
                                        validation={formik.getFieldProps(`specifications[${index}].value`)}
                                        metaProps={formik.getFieldMeta(`specifications[${index}].value`)}
                                        inputProps={{
                                            placeholder: specification.unit,
                                        }}
                                        required
                                    />
                                </Col>
                            )}
                        </Row>
                    </Collapse>
                </Loader>
            </div>
        </React.Fragment>
    );
};

export default AddOrUpdatePage;