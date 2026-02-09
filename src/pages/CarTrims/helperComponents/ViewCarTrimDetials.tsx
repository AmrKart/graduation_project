import FullScreenModal from "@@/components/Common/FullScreenModal";
import Loader from "@@/components/Common/Loader";
import InfoLabelValue from "@@/components/InfoLableValue";
import { buildShamcarRequest } from "@@/helpers/buildRequest";
import { translate } from "@@/locales/translate";
import { RootState } from "@@/store";
import { getCarTrimDetails } from "@@/store/actions";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "reactstrap";


type Props = {
    id: string;
    setOpen: (val?: any) => void;
}

const ViewCarTrimDetailsModal = ({ id,setOpen }: Props) => {


    const dispatch = useDispatch();    

    useEffect(() => {
        dispatch(getCarTrimDetails(buildShamcarRequest({ id })))        
    }, [id, dispatch]);


    const carTrim = useSelector((state: RootState) => state.CarTrims.singleCarTrim);

    return (
        <FullScreenModal
            isOpen={true}
            setOpen={setOpen}
            title={translate('carTrim.details')}
            closeButton
            fullScreen
        >
            <Loader loading={carTrim.loading}>
                <Row>
                    <Col xl={3} md={6} sm={12}>
                        <InfoLabelValue
                            title={translate('carTrim.name')}
                            value={carTrim.data?.name}
                        />                                                
                    </Col>                    
                    <Col xl={3} md={6} sm={12}>
                        <InfoLabelValue
                            title={translate('carModel.name')}
                            value={carTrim.data?.model_name}
                        />                                                
                    </Col>
                    <Col xl={3} md={6} sm={12}>
                        <InfoLabelValue
                            title={translate('carMake.name')}
                            value={carTrim.data?.make_name}
                        />                                                
                    </Col>
                    <Col xl={3} md={6} sm={12}>
                        <InfoLabelValue
                            title={translate('carTrim.bodyType')}
                            value={carTrim.data?.body_type}
                        />                                                
                    </Col>
                    <Col xl={3} md={6} sm={12}>
                        <InfoLabelValue
                            title={translate('carTrim.startProductionYear')}
                            value={carTrim.data?.start_production_year}
                        />                                                
                    </Col>
                    <Col xl={3} md={6} sm={12}>
                        <InfoLabelValue
                            title={translate('carTrim.endProductionYear')}
                            value={carTrim.data?.end_production_year}
                        />                                                
                    </Col>
                    <Col xl={3} md={6} sm={12}>
                        <InfoLabelValue
                            title={translate('carTrim.priceMin')}
                            value={carTrim.data?.price_min}
                        />                                                
                    </Col>
                    <Col xl={3} md={6} sm={12}>
                        <InfoLabelValue
                            title={translate('carTrim.priceMax')}
                            value={carTrim.data?.price_max}
                        />                                                
                    </Col>
                    <Col xl={3} md={6} sm={12}>
                        <InfoLabelValue
                            title={translate('carTrim.currency')}
                            value={carTrim.data?.currency}
                        />                                                
                    </Col>
                    <Col xl={3} md={6} sm={12}>
                        <InfoLabelValue
                            title={translate('carTrim.isPublished')}
                            value={carTrim.data?.is_published ? translate('yes') : translate('no')}
                        />                                                
                    </Col>
                    <Col xl={3} md={6} sm={12}>
                        <InfoLabelValue
                            title={translate('carTrim.description')}
                            value={carTrim.data?.description}
                        />                                                
                    </Col>
                    {/* <Col xl={3} md={6} sm={12}>
                        <InfoLabelValue
                            title={translate('carTrim.images')}
                            value={carTrim.data?.images}
                        />                                                
                    </Col>                                         */}
                </Row>
            </Loader>
        </FullScreenModal>
    )
}

export default ViewCarTrimDetailsModal;