import FullScreenModal from "@@/components/Common/FullScreenModal";
import InfoLabelValue from "@@/components/InfoLableValue";
import { IQuestion } from "@@/interfaces/Q&A";
import { translate } from "@@/locales/translate";
import React from "react";
import { Col, Row } from "reactstrap";


type Props = {
    data: IQuestion;
    setOpen: (val?: any) => void;
}

const ViewQuestionDetailsModal = ({ data,setOpen }: Props) => {



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
                            title={translate('questionTitle')}
                            value={data?.title}
                        />                                                
                    </Col>                    
                    <Col xl={3} md={6} sm={12}>
                        <InfoLabelValue
                            title={translate('questionBody')}
                            value={data?.body}
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
                            title={translate('carModel.name')}
                            value={data?.car_model_name}
                        />
                    </Col>
                    <Col xl={3} md={6} sm={12}>
                        <InfoLabelValue
                            title={translate('answersCount')}
                            value={data?.answers_count}
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

    export default ViewQuestionDetailsModal;