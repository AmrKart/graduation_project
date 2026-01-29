import React from 'react';
import { Container } from 'reactstrap';
import DataTableContainer from '@@/components/Common/DataTableContainer';
import { translate } from '@@/locales/translate';
import * as url from "@@/helpers/url_helper"

const AdminsPage = () => {
        

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
                            disabled
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
                            style="margin: 0; pointer-events: none; cursor: not-allowed; opacity: 0.6;"
                        ></label>
                    </div>
                `;
            }
        },
    ];            

    return (
        <React.Fragment>
            <div className="page-content">

                <Container fluid>                    
                <div>
                    <DataTableContainer                        
                        columns={columns}                        
                        ajax={{
                            url: url.getEndPoint(url.GET_ADMINS),
                            method: "GET",
                        }}
                        serverSide={true}
                        actions={{ enabled: false, renderHtml: null }}
                        rowId="id"
                        options={{
                            searching: false,
                        }}                        
                    />
                </div>                
            </Container>
        </div>
        </React.Fragment >
    );
}

export default AdminsPage;