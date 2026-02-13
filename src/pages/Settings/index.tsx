import React, { useState, useRef } from 'react';
import { Container } from 'reactstrap';
import DataTableContainer from '@@/components/Common/DataTableContainer';
import { translate } from '@@/locales/translate';
import { DataTableRef } from '@@/components/Common/DataTableContainer';
import { GET_ALL_SETTINGS, getEndPoint } from '@@/helpers/url_helper';
import { updateSettings } from '@@/store/actions';
import UpdateModal from './helperComponents/UpdateModal';

const SettingsPage = () => {

    const tableRef = useRef<DataTableRef>(null);
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const [tableKey, setTableKey] = useState(0);

    const columns = [
        {
            title: "ID",
            data: "id",
        },
        {
            title: translate("settings.key"),
            data: "key",
        },            
        {
            title: translate("type"),
            data: "type",
        },            
        {
            title: translate("title"),
            data: "title",
        },            
        {
            title: translate("value"),
            data: "value",
        },            
    ];

    const [component, setComponent] = useState<any>(undefined);    
            

    return (
        <React.Fragment>
            <div className="page-content">

                <Container fluid>                    
                <div ref={tableContainerRef}>
                    <DataTableContainer
                        ref={tableRef}
                        columns={columns}
                        key={tableKey}
                        ajax={{
                            url: getEndPoint(GET_ALL_SETTINGS),
                            method: "GET",
                        }}
                        serverSide={true}
                        actions={{ enabled: true, renderHtml: null }}
                        rowId="id"
                        options={{
                            searching: true,
                        }}
                        onEdit={(row:any) => {
                            setComponent(
                                <UpdateModal
                                    data={row}
                                    open={true}
                                    setOpen={() => setComponent(undefined)}
                                    action={updateSettings}
                                    title={translate('update')}
                                    setReloadTrigger={setTableKey}
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

export default SettingsPage;