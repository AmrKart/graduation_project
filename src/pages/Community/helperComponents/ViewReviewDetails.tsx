import FullScreenModal from "@@/components/Common/FullScreenModal";
import InfoLabelValue from "@@/components/InfoLableValue";
import { IReview } from "@@/interfaces/Q&A";
import { translate } from "@@/locales/translate";
import React from "react";
import { Col, Row } from "reactstrap";


type Props = {
    data: IReview;
    setOpen: (val?: any) => void;
}

const ViewReviewDetails = ({ data,setOpen }: Props) => {



    return (
        <FullScreenModal
            isOpen={true}
            setOpen={setOpen}
            title={translate('details')}
            closeButton
        >            
                <Row>
                    <Col xl={3} md={6} sm={12}>
                        <InfoLabelValue
                            title={translate('rating')}
                            value={data?.rating}
                        />                                                
                    </Col>                    
                    <Col xl={3} md={6} sm={12}>
                        <InfoLabelValue
                            title={translate('comment')}
                            value={data?.comment}
                        />
                    </Col>
                    <Col xl={3} md={6} sm={12}>
                        <InfoLabelValue
                            title={translate('status')}
                            value={data?.status}
                        />
                    </Col>
                    <Col xl={3} md={6} sm={12}>
                        <InfoLabelValue
                            title={translate('userName')}
                            value={data?.user_name}
                        />
                    </Col>
                    <Col xl={3} md={6} sm={12}>
                        <InfoLabelValue
                            title={translate('carName')}
                            value={data?.car_name}
                        />
                    </Col>
                    <Col xl={3} md={6} sm={12}>
                        <InfoLabelValue
                            title={translate('trim_name')}
                            value={data?.trim_name}
                        />
                    </Col>
                    <Col xl={3} md={6} sm={12}>
                        <InfoLabelValue
                            title={translate('createdAt')}
                            value={data?.created_at}
                        />
                    </Col>
                </Row>
            </FullScreenModal>
        )
    }

    export default ViewReviewDetails;