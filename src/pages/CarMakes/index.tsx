import React, { useState, useRef } from 'react';
import { Container } from 'reactstrap';
import DataTableContainer from '@@/components/Common/DataTableContainer';
import { translate } from '@@/locales/translate';
import CustomeCardTitle from '@@/components/Common/Card/CustomeCardTitle';
import { addCarMake, deleteCarMake, updateCarMake } from '@@/store/actions';
import { Icons } from '@@/components/Common/Icons';
import ConfirmModal from '@@/components/Modal/ConfirmModal';
import { buildShamcarRequest } from '@@/helpers/buildRequest';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@@/store';
import { DataTableRef } from '@@/components/Common/DataTableContainer';
import { GET_CAR_MAKES, getEndPoint } from '@@/helpers/url_helper';
import AddOrUpdateModal from './helperComponents/AddOrUpdateModal';
import ViewCarMakeDetailsModal from './helperComponents/ViewCarMakeDetails';

const CarMakesPage = () => {

    const tableRef = useRef<DataTableRef>(null);
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const [tableKey, setTableKey] = useState(0);

    const columns = [
        {
            title: "ID",
            data: "id",
        },
        {
            title: translate("carMake.name"),
            data: "name",            
        },            
    ];

    const [component, setComponent] = useState<any>(undefined);    

    const dispatch = useDispatch();    
    const actionLoader = useSelector((state: RootState) => state.CarMakes.actionLoader);
            

    return (
        <React.Fragment>
            <div className="page-content">

                <Container fluid>
                    <CustomeCardTitle
                        title={''}                        
                        actions={[
                            {
                                title: translate('carMake.add'),
                                icon: Icons.add,
                                onClick: () => setComponent(<AddOrUpdateModal
                                    data={undefined}
                                    open={true}
                                    setOpen={() => setComponent(undefined)}
                                    action={addCarMake}
                                    title={translate('carMake.add')}
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
                            url: getEndPoint(GET_CAR_MAKES),
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
                            const carMakeId = (row && row.id) ? row.id : id;
                            setComponent(
                                <ViewCarMakeDetailsModal
                                    id={String(carMakeId)}
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
                                    action={updateCarMake}
                                    title={translate('carMake.update')}
                                    setReloadTrigger={setTableKey}
                                />
                            );
                        }}
                        onDelete={(row: any, id: any) => {
                            const carMakeId = (row && row.id) ? row.id : id;
                            setComponent(
                                <ConfirmModal                                    
                                    isOpen={true}
                                    loading={actionLoader}
                                    onConfirm={() => {
                                        // Keep modal open to show loading state
                                        dispatch(deleteCarMake(buildShamcarRequest({ id: carMakeId }, null, null, null, [
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

export default CarMakesPage;