import FullScreenModal from "@@/components/Common/FullScreenModal";
import InfoLabelValue from "@@/components/InfoLableValue";
import { IAnswer } from "@@/interfaces/Q&A";
import { translate } from "@@/locales/translate";
import React from "react";
import { Col, Row } from "reactstrap";


type Props = {
    data: IAnswer;
    setOpen: (val?: any) => void;
}

const ViewAnswerDetails = ({ data,setOpen }: Props) => {



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
                            title={translate('userName')}
                            value={data?.user_name}
                        />                                                
                    </Col>                    
                    <Col xl={3} md={6} sm={12}>
                        <InfoLabelValue
                            title={translate('answer.body')}
                            value={data?.body}
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

    export default ViewAnswerDetails;