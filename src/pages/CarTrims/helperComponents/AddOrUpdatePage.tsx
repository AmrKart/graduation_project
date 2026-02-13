import InputText from '@@/components/Common/Form/InputText';
import { Icons } from '@@/components/Common/Icons';
import { buildShamcarRequest } from '@@/helpers/buildRequest';
import { translate } from '@@/locales/translate';
import { RootState } from '@@/store';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardTitle, Col, Collapse, Container, Row } from 'reactstrap';
import * as Yup from 'yup';
import AsyncSelect from '@@/components/Common/Form/AsyncSelect';
import {
  GET_CAR_MAKES,
  GET_CAR_MODELS,
  GET_CAR_TYPES,
} from '@@/helpers/url_helper';
import InputNumber from '@@/components/Common/Form/InputNumber';
import InputCheckbox from '@@/components/Common/Form/InputCheckbox';
import InputSelect from '@@/components/Common/Form/InputSelect';
import CustomeCardTitle from '@@/components/Common/Card/CustomeCardTitle';
import Dropzone from 'react-dropzone';
import upload from '@@/assets/images/icons/BiUpload.svg';
import { useNavigate, useParams } from 'react-router-dom';
import {
  addCarTrim,
  getCarSpecifications,
  getCarTrimDetails,
  getCarTrimDetailsCleanUp,
  updateCarTrim,
} from '@@/store/actions';
import Loader from '@@/components/Common/Loader';
/**
 * Simple image drag/import component (single image)
 */
type ImageDropInputProps = {
  label: string;
  onFileSelected: (file: File | null) => void;
};

const ImageDropInput: React.FC<ImageDropInputProps> = ({
  label,
  onFileSelected,
}) => {
  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length) {
      onFileSelected(acceptedFiles[0] as File);
    }
  };

  return (
    <Dropzone
      onDrop={handleDrop}
      accept={{ 'image/*': [] }}
      multiple={false}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          style={{ cursor: 'pointer' }}
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
              <span style={{ fontWeight: '600' }}>{label}</span>
            </p>
          </div>
        </div>
      )}
    </Dropzone>
  );
};

/**
 * Simple image preview card with small thumbnail + view + remove
 */
type ImagePreviewCardProps = {
  file: File;
  onRemove: () => void;
};

const ImagePreviewCard: React.FC<ImagePreviewCardProps> = ({
  file,
  onRemove,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  return (
    <Card className="border border-2 mb-1" style={{ backgroundColor: "#1a1f2e"}}>
      <CardBody>
        <div className="d-flex align-items-center justify-content-between" style={{ backgroundColor: "#1a1f2e"}}>
          <p className="m-0" style={{ fontWeight: 700 }}>
            {previewUrl && (
              <img
                className="m-1"
                style={{ borderRadius: '4px' }}
                width="50"
                height="50"
                src={previewUrl}
                alt={file.name}
              />
            )}
            {file.name}
          </p>
          <div className="d-flex align-items-center gap-1">
            {previewUrl && (
              <a
                href={previewUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: 'none',
                  fontWeight: 'bold',
                }}
              >
                <i className="bx bx-show" style={{ fontSize: '1.3rem', color: 'white' }} />
              </a>
            )}
            <button
              type="button"
              className="btn btn-link p-0"
              style={{
                textDecoration: 'none',
                fontWeight: 'bold',
              }}
              onClick={onRemove}
            >
              <i
                className={`${Icons.delete} font-size-22 text-danger`}
              />
            </button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

const AddOrUpdatePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getCarTrimDetails(buildShamcarRequest({ id: id })));
    }
    return () => {
      dispatch(getCarTrimDetailsCleanUp());
    };
  }, [id, dispatch]);

  const { data, loading } = useSelector(
    (state: RootState) => state.CarTrims.singleCarTrim
  );

  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

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
      specifications: Yup.array()
        .min(1, translate('required'))
        .of(
          Yup.object({
            car_specification_id: Yup.number().required(translate('required')),
            value: Yup.string().required(translate('required')),
            unit: Yup.string().nullable(),
          })
        )
        .required(translate('required')),
    }),
    initialValues: {
      ...(data || {}),
      is_published: data?.is_published ?? 0,
      specifications: data?.specifications ?? [],
    },
    onSubmit: (values: any) => {
      const payload = {
        ...values,
        imageFile,
      };
      if (id) {
        dispatch(
          updateCarTrim(buildShamcarRequest(payload, null, null, null, []))
        );
      } else {
        dispatch(
          addCarTrim(buildShamcarRequest(payload, null, null, null, []))
        );
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  useEffect(() => {
    if (formik.getFieldProps('car_type_id').value) {
      dispatch(
        getCarSpecifications(
          buildShamcarRequest({
            car_type_id: formik.getFieldProps('car_type_id').value,
          })
        )
      );
    }
  }, [formik.getFieldProps('car_type_id').value]);

  const carSpecifications = useSelector(
    (state: RootState) => state.CarTrims.carSpecifications
  );

  const [showMessage, setShowMessage] = useState(false);

  const actionLoader = useSelector(
    (state: RootState) => state.CarTrims.actionLoader
  );

  console.log("values = ", formik.values);
  console.log("errors = ", formik.errors);

  return (
    <React.Fragment>
      <div className="page-content">
        <Loader loading={loading || carSpecifications?.loading || actionLoader}>
          <Container fluid>
            <CustomeCardTitle
              title={
                id ? translate('carTrim.update') : translate('carTrim.add')
              }
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
                },
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
                    onChange: (e) => {
                      formik.setFieldValue('is_published', e.target.checked ? 1 : 0);
                    },
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
                {formik.getFieldProps('car_make_id').value ? (
                  <AsyncSelect
                    url={GET_CAR_MODELS}
                    required
                    preFilter={{
                      car_make_id: formik.getFieldProps('car_make_id').value,
                    }}
                    filterKey={'name'}
                    label={'name'}
                    name={translate('carModel.name')}
                    inputProps={{
                      isDisabled: formik.getFieldProps('car_make_id').value
                        ? false
                        : true,
                    }}
                    validation={formik.getFieldProps('car_model_id')}
                    metaProps={formik.getFieldMeta('car_model_id')}
                    onChangeSelect={(val: any) =>
                      formik.setFieldValue('car_model_id', val.value)
                    }
                  ></AsyncSelect>
                ) : (
                  <InputSelect
                    name={translate('carModel.name')}
                    required
                    options={[]}
                    inputProps={{ isDisabled: true }}
                  />
                )}
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
                    carSpecifications?.data?.forEach(
                      (specification: any, index: number) => {
                        formik.setFieldValue(
                          `specifications[${index}].car_specification_id`,
                          specification.id
                        );
                        formik.setFieldValue(
                          `specifications[${index}].unit`,
                          specification.unit
                        );
                      }
                    );
                  }}
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
              <Col md="12" className="mt-3">
                <ImageDropInput
                  label={translate('carTrim.image')}
                  onFileSelected={(file) => setImageFile(file)}
                />
              </Col>
              {imageFile && (
                <Col md="12">
                  <ImagePreviewCard
                    file={imageFile}
                    onRemove={() => setImageFile(null)}
                  />
                </Col>
              )}
              
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
            {`${open ? '▼' : '◄'} ${translate('carTrim.add.specifications')}`}{' '}
            <p
              style={{
                display: 'inline-block',
                marginLeft: '10px',
                color: 'red',
              }}
            >
              {'*'}
            </p>
            {formik.touched.specifications && formik.errors.specifications && (
              <p
                style={{
                  display: 'inline-block',
                  marginLeft: '10px',
                  color: 'red',
                }}
              >
                {translate('required')}
              </p>
            )}
            {showMessage && (
              <p
                style={{
                  display: 'inline-block',
                  marginLeft: '10px',
                  color: 'red',
                }}
              >
                {translate('carTrim.add.specifications.message')}
              </p>
            )}
          </CardTitle>
          <Collapse isOpen={open}>
            <Row>
              {carSpecifications.data?.map(
                (specification: any, index: number) => (
                  <Col md="4" key={specification.id}>
                    <InputText
                      name={specification.name}
                      validation={formik.getFieldProps(
                        `specifications[${index}].value`
                      )}
                      metaProps={formik.getFieldMeta(
                        `specifications[${index}].value`
                      )}
                      inputProps={{
                        placeholder: specification.unit,
                      }}
                      required
                    />
                  </Col>
                )
              )}
            </Row>
          </Collapse>
        </Loader>
      </div>
    </React.Fragment>
  );
};

export default AddOrUpdatePage;
