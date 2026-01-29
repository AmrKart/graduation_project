import FullScreenModal from "@@/components/Common/FullScreenModal";
import Loader from "@@/components/Common/Loader";
import InfoLabelValue from "@@/components/InfoLableValue";
import { buildShamcarRequest } from "@@/helpers/buildRequest";
import { translate } from "@@/locales/translate";
import { RootState } from "@@/store";
import { getCarModelDetails } from "@@/store/actions";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "reactstrap";


type Props = {
    id: string;
    setOpen: (val?: any) => void;
}

const ViewCarModelDetailsModal = ({ id,setOpen }: Props) => {


    const dispatch = useDispatch();    

    useEffect(() => {
        dispatch(getCarModelDetails(buildShamcarRequest({ id })))        
    }, [id, dispatch]);


    const carModel = useSelector((state: RootState) => state.CarModels.singleCarModel);

    return (
        <FullScreenModal
            isOpen={true}
            setOpen={setOpen}
            title={translate('details')}
            closeButton
        >
            <Loader loading={carModel.loading}>
                <Row>
                    <Col xl={3} md={6} sm={12}>
                        <InfoLabelValue
                            title={translate('carModel.name')}
                            value={carModel.data?.name}
                        />                                                
                    </Col>                    
                    <Col xl={3} md={6} sm={12}>
                        <InfoLabelValue
                            title={translate('carMake.id')}
                            value={carModel.data?.car_make}
                        />                                                
                    </Col>                    
                </Row>
            </Loader>
        </FullScreenModal>
    )
}

export default ViewCarModelDetailsModal;