import { LoadingButton } from '@@/components/Button/LoadingButton';
import CustomeCardTitle from '@@/components/Common/Card/CustomeCardTitle';
import InputText from '@@/components/Common/Form/InputText';
import { buildShamcarRequest } from '@@/helpers/buildRequest';
import { translate } from '@@/locales/translate';
import { RootState } from '@@/store';
import { changePassword } from '@@/store/actions';
import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import * as Yup from 'yup';

const ChangePasswordPage = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: Yup.object({
      current_password: Yup.string().required(translate('required')),
      password: Yup.string().required(translate('required')),
    }),
    initialValues: {
      current_password: '',
      password: '',
    },
    onSubmit: (values: any) => {
      dispatch(
        changePassword(buildShamcarRequest(values, null, null, null, []))
      );
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  const loading = useSelector((state : RootState) => state.Authentication.actionLoading);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Card style={{backgroundColor: "#1a1f2e"}}>
            <CardBody>
              <CustomeCardTitle title="changePassword"></CustomeCardTitle>

              <Row>
                <Col md="12">
                  <InputText
                    name={translate('currentPassword')}
                    validation={formik.getFieldProps('current_password')}
                    metaProps={formik.getFieldMeta('current_password')}
                    type='password'
                    required
                  />
                </Col>

                <Col md="12">
                  <InputText
                    name={translate('newPassword')}
                    validation={formik.getFieldProps('password')}
                    metaProps={formik.getFieldMeta('password')}
                    type='password'
                    required
                  />
                </Col>
              </Row>
              <LoadingButton
                isLoading={loading}
                className="m-0 mx-2 btn"
                color="success"
                onClick={() => formik.handleSubmit()}
              >
                <span style={{}}>{translate('confirm')}</span>
              </LoadingButton>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ChangePasswordPage;
