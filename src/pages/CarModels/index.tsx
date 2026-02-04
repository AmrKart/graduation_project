import React, { useState, useRef } from 'react';
import { Container } from 'reactstrap';
import DataTableContainer from '@@/components/Common/DataTableContainer';
import { translate } from '@@/locales/translate';
import CustomeCardTitle from '@@/components/Common/Card/CustomeCardTitle';
import {addCarModel, deleteCarModel, updateCarModel } from '@@/store/actions';
import { Icons } from '@@/components/Common/Icons';
import ConfirmModal from '@@/components/Modal/ConfirmModal';
import { buildShamcarRequest } from '@@/helpers/buildRequest';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@@/store';
import { DataTableRef } from '@@/components/Common/DataTableContainer';
import { GET_CAR_MODELS, getEndPoint } from '@@/helpers/url_helper';
import AddOrUpdateModal from './helperComponents/AddOrUpdateModal';
import ViewCarModelDetailsModal from './helperComponents/ViewCarModelDetails';

const CarModelPage = () => {

    const tableRef = useRef<DataTableRef>(null);
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const [tableKey, setTableKey] = useState(0);

    const columns = [
        {
            title: "ID",
            data: "id",
        },
        {
            title: translate("carModel.name"),
            data: "name",
        },            
        {
            title: translate("carMake.id"),
            data: "car_make",
        },            
    ];

    const [component, setComponent] = useState<any>(undefined);    

    const dispatch = useDispatch();    
    const actionLoader = useSelector((state: RootState) => state.CarModels.actionLoader);
            

    return (
        <React.Fragment>
            <div className="page-content">

                <Container fluid>
                    <CustomeCardTitle
                        title={''}                        
                        actions={[
                            {
                                title: translate('carModel.add'),
                                icon: Icons.add,
                                onClick: () => setComponent(<AddOrUpdateModal
                                    data={undefined}
                                    open={true}
                                    setOpen={() => setComponent(undefined)}
                                    action={addCarModel}
                                    title={translate('carModel.add')}
                                    setReloadTrigger={setTableKey}
                                />)
                            }
                        ]}
                    />
                <div ref={tableContainerRef}>
                    <DataTableContainer
                        ref={tableRef}
                        columns={columns}
                        key={tableKey}
                        ajax={{
                            url: getEndPoint(GET_CAR_MODELS),
                            method: "GET",
                        }}
                        serverSide={true}
                        actions={{ enabled: true, renderHtml: null }}
                        rowId="id"
                        options={{
                            searching: true,
                        }}
                        onView={(row: any, id: any) => {
                            // prefer row.id, otherwise fallback to id
                            const carModelId = (row && row.id) ? row.id : id;
                            setComponent(
                                <ViewCarModelDetailsModal
                                    id={String(carModelId)}
                                    setOpen={() => setComponent(undefined)}
                                />
                            );
                        }}

                        onEdit={(row:any) => {
                            setComponent(
                                <AddOrUpdateModal
                                    data={row}
                                    open={true}
                                    setOpen={() => setComponent(undefined)}
                                    action={updateCarModel}
                                    title={translate('carModel.update')}
                                    setReloadTrigger={setTableKey}
                                />
                            );
                        }}
                        onDelete={(row: any, id: any) => {
                            const carModelId = (row && row.id) ? row.id : id;
                            setComponent(
                                <ConfirmModal                                    
                                    isOpen={true}
                                    loading={actionLoader}
                                    onConfirm={() => {
                                        // Keep modal open to show loading state
                                        dispatch(deleteCarModel(buildShamcarRequest({ id: carModelId }, null, null, null, [
                                            {
                                                isDispatch: false,
                                                action: () => {
                                                    setTableKey(tableKey + 1);
                                                },
                                                data: null,
                                            }
                                        ])));                                        
                                    }}
                                    setOpen={() => setComponent(undefined)}
                                />
                            );
                        }}
                    />
                </div>
                {component}
            </Container>
        </div>
        </React.Fragment >
    );
}

export default CarModelPage;