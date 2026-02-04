import React, { useState, useEffect, useRef } from 'react';
import { Container } from 'reactstrap';
import DataTableContainer from '@@/components/Common/DataTableContainer';
import { translate } from '@@/locales/translate';
import ViewUserDetailsModal from './helperComponents/ViewUserDetailsModal';
import CustomeCardTitle from '@@/components/Common/Card/CustomeCardTitle';
import AddOrUpdateModal from './helperComponents/AddOrUpdateModal';
import { activateUser, createUser, deactivateUser, deleteUser, updateUser } from '@@/store/actions';
import { Icons } from '@@/components/Common/Icons';
import ConfirmModal from '@@/components/Modal/ConfirmModal';
import { buildShamcarRequest } from '@@/helpers/buildRequest';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@@/store';
import { DataTableRef } from '@@/components/Common/DataTableContainer';
import { GET_USERS, getEndPoint } from '@@/helpers/url_helper';

const UsersPage = () => {

    const tableRef = useRef<DataTableRef>(null);
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const [tableKey, setTableKey] = useState(0);

    const columns = [
        {
            title: "ID",
            data: "id",
        },
        {
            title: translate("userName"),
            data: "name",
        },
        {
            title: translate("email"),
            data: "email",
        },
        {
            title: translate("phoneNumber"),
            data: "phone",
        },
        {
            title: translate("active") || "Active",
            data: "is_active",
            orderable: false,
            searchable: false,
            render: (_data: any, _type: any, row: any) => {
                const isActive = row.is_active === true || row.is_active === 1;
                return `
                    <div style="display: flex; justify-content: center; align-items: center;">
                        <input 
                            type="checkbox" 
                            switch="bool" 
                            id="switch-${row.id}" 
                            class="dt-active-switch" 
                            data-user-id="${row.id}"
                            data-is-active="${isActive}"
                            ${isActive ? 'checked' : ''}
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
    const actionLoader = useSelector((state: RootState) => state.Users.actionLoader);
    

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

            const userId = input.getAttribute('data-user-id');
            const currentIsActive = input.getAttribute('data-is-active') === 'true';
            const newIsActive = !currentIsActive;

            if (!userId) return;

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
                            dispatch(deactivateUser(buildShamcarRequest({ id: userId }, null, null, null, [
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
                            dispatch(activateUser(buildShamcarRequest({ id: userId }, null, null, null, [
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
                                title: translate('add.user'),
                                icon: Icons.add,
                                onClick: () => setComponent(<AddOrUpdateModal
                                    data={undefined}
                                    open={true}
                                    setOpen={() => setComponent(undefined)}
                                    action={createUser}
                                    title={translate('add.user')}
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
                            url: getEndPoint(GET_USERS),
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
                            const userId = (row && row.id) ? row.id : id;
                            
                            setComponent(
                                <ViewUserDetailsModal
                                    userId={String(userId)}
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
                                    action={updateUser}
                                    title={translate('update.user')}
                                    setReloadTrigger={setTableKey}
                                />
                            );
                        }}
                        onDelete={(row: any, id: any) => {
                            const userId = (row && row.id) ? row.id : id;
                            setComponent(
                                <ConfirmModal                                    
                                    isOpen={true}
                                    loading={actionLoader}
                                    onConfirm={() => {
                                        // Keep modal open to show loading state
                                        dispatch(deleteUser(buildShamcarRequest({ id: userId }, null, null, null, [
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

export default UsersPage;