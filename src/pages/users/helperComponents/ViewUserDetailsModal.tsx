import FullScreenModal from "@@/components/Common/FullScreenModal";
import Loader from "@@/components/Common/Loader";
import InfoLabelValue from "@@/components/InfoLableValue";
import { buildShamcarRequest } from "@@/helpers/buildRequest";
import { translate } from "@@/locales/translate";
import { RootState } from "@@/store";
import { getSingleUser, getSingleUserCleanup } from "@@/store/actions";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "reactstrap";


type Props = {
    userId: string;
    setOpen: (val?: any) => void;
}

const ViewUserDetailsModal = ({ userId,setOpen }: Props) => {


    const dispatch = useDispatch();    

    useEffect(() => {
        dispatch(getSingleUser(buildShamcarRequest({ id: userId })))
        return () => { getSingleUserCleanup() };
    }, [userId, dispatch]);


    const user = useSelector((state: RootState) => state.Users.singleUser);

    return (
        <FullScreenModal
            isOpen={true}
            setOpen={setOpen}
            title={translate('details')}
            closeButton
        >
            <Loader loading={user.loading}>
                <Row>
                    <Col xl={3} md={6} sm={12}>
                        <InfoLabelValue
                            title={translate('userName')}
                            value={user.data?.name}
                        />                                                
                    </Col>
                    <Col xl={3} md={6} sm={12}>
                        <InfoLabelValue
                            title={translate('email')}
                            value={user.data?.email}
                        />
                    </Col>
                    <Col xl={3} md={6} sm={12}>
                        <InfoLabelValue
                            title={translate('phoneNumber')}
                            value={user.data?.phone}
                        />
                    </Col>
                    <Col xl={3} md={6} sm={12}>
                        <InfoLabelValue
                            title={translate('active')}
                            value={user.data?.is_active ? translate('yes') : translate('no')}
                        />
                    </Col>
                </Row>
            </Loader>
        </FullScreenModal>
    )
}

export default ViewUserDetailsModal;