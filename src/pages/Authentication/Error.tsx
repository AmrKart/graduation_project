import React from "react"
import { Container, Row, Col } from "reactstrap"

//Import Images
import error from "../../assets/images/error-img.png"
import { translate, translationHelper } from "@@/locales/translate"

const ErrorPage = () => {
    //meta title
    return (
        <React.Fragment>
            <div className="account-pages my-5 pt-5">
                <Container>
                    <Row>
                        <Col lg="12">
                            <div className="text-center mb-5">

                                <h4 className="text-uppercase">{translate("response.error.wrong")}</h4>
                                <div className="mt-5 text-center">
                                    <a
                                        className="btn btn-primary "
                                        href="/dashboard"
                                    >
                                        {translate("back.home")}
                                    </a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col md="8" xl="6">
                            <div>
                                <img src={error} alt="" className="img-fluid" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default ErrorPage
