import FullScreenModal from "@@/components/Common/FullScreenModal";
import Loader from "@@/components/Common/Loader";
import InfoLabelValue from "@@/components/InfoLableValue";
import { buildShamcarRequest } from "@@/helpers/buildRequest";
import { translate } from "@@/locales/translate";
import { RootState } from "@@/store";
import { getCarMakeDetails } from "@@/store/actions";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "reactstrap";


type Props = {
    id: string;
    setOpen: (val?: any) => void;
}

const ViewCarMakeDetailsModal = ({ id,setOpen }: Props) => {


    const dispatch = useDispatch();    

    useEffect(() => {
        dispatch(getCarMakeDetails(buildShamcarRequest({ id })))        
    }, [id, dispatch]);


    const carMake = useSelector((state: RootState) => state.CarMakes.singleCarMake);

    return (
        <FullScreenModal
            isOpen={true}
            setOpen={setOpen}
            title={translate('details')}
            closeButton
        >
            <Loader loading={carMake.loading}>
                <Row>
                    <Col xl={3} md={6} sm={12}>
                        <InfoLabelValue
                            title={translate('carMake.name')}
                            value={carMake.data?.name}
                        />                                                
                    </Col>                    
                </Row>
            </Loader>
        </FullScreenModal>
    )
}

export default ViewCarMakeDetailsModal;