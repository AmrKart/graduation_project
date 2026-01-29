import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import withRouter from "../../components/Common/withRouter";

//redux
import { useSelector, useDispatch } from "react-redux";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
  Button,
} from "reactstrap";

// actions
import { login, loginFailed, } from "../../store/actions";

// import images
import profile from "../../assets/images/profile-img.png";
import logo from "../../assets/images/logo.svg";
import { translate } from "@@/locales/translate";
import Loader from "@@/components/Common/Loader";
import { buildShamcarRequest } from "@@/helpers/buildRequest";
import { LoadingButton } from "@@/components/Button/LoadingButton";
import { ShamcarRoutes } from "@@/routes/routeEnum";

const Login = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required(translate("login.username.required")),
      password: Yup.string().required(translate("login.passwrod.required")),
    }),
    onSubmit: (values) => {
      dispatch(loginFailed(''))
      dispatch(login(buildShamcarRequest({ ...values }, props.router.navigate)));
    },
  });

  const { error, loading } = useSelector((state) => ({
    error: state.Authentication.error,
    loading: state.Authentication.loading,
  }));

  useEffect(() => {
    return () => { dispatch(loginFailed('')); };
  }, []);


  return (
    <React.Fragment>

      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">


            <Col md={8} lg={6} xl={5}>

              <Card className="overflow-hidden">
                <div className="bg-dark">
                  <Row>
                    <Col xs={7}>
                      <div className="p-4">
                        <h5 className="">{translate("login.welcome")}</h5>
                        <p>{translate("login.signin")}</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0 bg-dark">
                  <div>
                    <Link to="/" className="auth-logo-light">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      {error ? <Alert color="danger">{error}</Alert> : null}

                      <div className="mb-3">
                        <Label className="form-label">{translate("login.username")}</Label>
                        <Input
                          name="email"
                          className="form-control"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email
                              ? true
                              : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">
                            {validation.errors.email}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">{translate("login.password")}</Label>
                        <Input
                          name="password"
                          value={validation.values.password || ""}
                          type="password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.password &&
                              validation.errors.password
                              ? true
                              : false
                          }
                        />
                        {validation.touched.password &&
                          validation.errors.password ? (
                          <FormFeedback type="invalid">
                            {validation.errors.password}
                          </FormFeedback>
                        ) : null}
                      </div>


                      <div className="mt-3 d-grid">
                        {/* <Button
                            className="btn btn-primary btn-block"
                            type="submit"
                            color="primary"
                          >
                            {translate("login.button")}

                          </Button> */}
                        <LoadingButton isLoading={loading} type="submit"> {translate("login.button")}</LoadingButton>
                        <Button style={{color: 'white', backgroundColor: '#1a1f2e'}} onClick={() => {

                          console.log("123123")
                          navigate(ShamcarRoutes.REGISTER)
                        }} className="my-3 btn-soft-primary"> {translate("register")}</Button>


                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>


            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Login);

Login.propTypes = {
  history: PropTypes.object,
};
