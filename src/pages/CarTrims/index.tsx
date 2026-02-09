import React, { useState, useRef, useEffect } from 'react';
import { Container } from 'reactstrap';
import DataTableContainer from '@@/components/Common/DataTableContainer';
import { translate } from '@@/locales/translate';
import CustomeCardTitle from '@@/components/Common/Card/CustomeCardTitle';
import { deleteCarTrim, updateCarTrimPublished } from '@@/store/actions';
import { Icons } from '@@/components/Common/Icons';
import ConfirmModal from '@@/components/Modal/ConfirmModal';
import { buildShamcarRequest } from '@@/helpers/buildRequest';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@@/store';
import { DataTableRef } from '@@/components/Common/DataTableContainer';
import { GET_CAR_TRIMS, getEndPoint } from '@@/helpers/url_helper';
import ViewCarTrimDetailsModal from './helperComponents/ViewCarTrimDetials';
import { ShamcarRoutes } from '@@/routes/routeEnum';
import { useNavigate } from 'react-router-dom';

const CarTrimsPage = () => {

    const tableRef = useRef<DataTableRef>(null);
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const [tableKey, setTableKey] = useState(0);

    const columns = [
        {
            title: "ID",
            data: "id",
        },
        {
            title: translate("carTrim.name"),
            data: "name",
        },
        {
            title: translate("carModel.name"),
            data: "model_name",
        },
        {
            title: translate("carMake.name"),
            data: "make_name",
        },
        {
            title: translate("carTrim.bodyType"),
            data: "type_name",
        },
        {
            title: translate("carTrim.startProductionYear"),
            data: "start_production_year",
        },
        {
            title: translate("carTrim.isPublished"),
            data: "is_published",
            orderable: false,
            searchable: false,
            render: (_data: any, _type: any, row: any) => {
                const isPublished = row.is_published === true || row.is_published === 1;
                return `
                    <div style="display: flex; justify-content: center; align-items: center;">
                        <input 
                            type="checkbox" 
                            switch="bool" 
                            id="switch-${row.id}" 
                            class="dt-active-switch" 
                            data-car-trim-id="${row.id}"
                            data-is-published="${isPublished}"
                            ${isPublished ? 'checked' : ''}
                        />
                        <label 
                            for="switch-${row.id}" 
                            data-on-label="" 
                            data-off-label=""
                            style="margin: 0;"
                        ></label>
                    </div>
                `;
            }
        },

    ];

    const [component, setComponent] = useState<any>(undefined);

    const dispatch = useDispatch();
    const actionLoader = useSelector((state: RootState) => state.CarTrims.actionLoader);
    const navigate = useNavigate();


    // Handle switch toggle clicks
    useEffect(() => {
        const container = tableContainerRef.current;
        if (!container) return;

        const handleSwitchClick = (e: Event) => {
            const target = e.target as HTMLElement;
            const switchInput = target.closest('dt-active-switch') as HTMLInputElement;
            const label = target.closest('label[for^="switch-"]') as HTMLLabelElement;
                        
            if (!switchInput && !label) return;

            const input = switchInput || (label ? container.querySelector(`#${label.getAttribute('for')}`) as HTMLInputElement : null);
            
            if (!input || !input.classList.contains('dt-active-switch')) return;

            e.preventDefault();
            e.stopPropagation();

            const carTrimId = input.getAttribute('data-car-trim-id');
            const currentIsActive = input.getAttribute('data-is-active') === 'true';
            const newIsActive = !currentIsActive;

            if (!carTrimId) return;

            // Prevent toggle if action is in progress
            if (actionLoader) {
                input.checked = currentIsActive;
                return;
            }

            // Show confirm modal when deactivating
            if (!newIsActive) {                
                setComponent(
                    <ConfirmModal
                        isOpen={true}
                        loading={actionLoader}
                        onConfirm={() => {
                            // Keep modal open to show loading state
                            dispatch(updateCarTrimPublished(buildShamcarRequest({ id: carTrimId }, null, null, null, [
                                {
                                    isDispatch: false,
                                    action: () => {
                                        setTableKey((prev) => prev+1);
                                    },
                                    data: null,
                                }
                            ])));                            
                        }}
                        setOpen={() => {
                            // Revert switch state if cancelled
                            input.checked = currentIsActive;                            
                            input.setAttribute('data-is-active', String(currentIsActive));                            
                            setComponent(undefined);                            
                        }}
                    />
                );
            } else {
                

                setComponent(
                    <ConfirmModal
                        isOpen={true}
                        loading={actionLoader}
                        onConfirm={() => {
                            // Keep modal open to show loading state
                            dispatch(updateCarTrimPublished(buildShamcarRequest({ id: carTrimId }, null, null, null, [
                                {
                                    isDispatch: false,
                                    action: () => {
                                        setTableKey((prev) => prev+1);
                                    },
                                    data: null,
                                }
                            ])));                            
                        }}
                        setOpen={() => {                                                        
                            setComponent(undefined);                            
                        }}
                    />
                );                                
            }
        };

        container.addEventListener('click', handleSwitchClick, true);

        return () => {
            container.removeEventListener('click', handleSwitchClick, true);
        };
    }, [dispatch, actionLoader]);


    return (
        <React.Fragment>
            <div className="page-content">

                <Container fluid>
                    <CustomeCardTitle
                        title={''}
                        actions={[
                            {
                                title: translate('carTrim.add'),
                                icon: Icons.add,
                                onClick: () => {
                                    navigate(ShamcarRoutes.ADD_CAR_TRIM);
                                }
                            }
                        ]}  
                    />
                    <div ref={tableContainerRef}>
                        <DataTableContainer
                            ref={tableRef}
                            columns={columns}
                            key={tableKey}
                            ajax={{
                                url: getEndPoint(GET_CAR_TRIMS),
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
                                const carTrimId = (row && row.id) ? row.id : id;
                                setComponent(
                                    <ViewCarTrimDetailsModal
                                        id={String(carTrimId)}
                                        setOpen={() => setComponent(undefined)}
                                    />
                                );
                            }}

                            onEdit={(row: any) => {
                                navigate(ShamcarRoutes.UPDATE_CAR_TRIM.replace(':id', row.id));
                            }}
                            onDelete={(row: any, id: any) => {
                                const carTrimId = (row && row.id) ? row.id : id;
                                setComponent(
                                    <ConfirmModal
                                        isOpen={true}
                                        loading={actionLoader}
                                        onConfirm={() => {
                                            // Keep modal open to show loading state
                                            dispatch(deleteCarTrim(buildShamcarRequest({ id: carTrimId }, null, null, null, [
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

export default CarTrimsPage;