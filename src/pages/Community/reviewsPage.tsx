import React, { useState, useRef, useEffect } from 'react';
import { Container } from 'reactstrap';
import DataTableContainer from '@@/components/Common/DataTableContainer';
import { translate } from '@@/locales/translate';
import { updateReviewStatus } from '@@/store/actions';
import { buildShamcarRequest } from '@@/helpers/buildRequest';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@@/store';
import { DataTableRef } from '@@/components/Common/DataTableContainer';
import { GET_ALL_REVIEWS, getEndPoint } from '@@/helpers/url_helper';
import ViewReviewDetails from './helperComponents/ViewReviewDetails';

const ReviewsPage = () => {

    const tableRef = useRef<DataTableRef>(null);
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const [tableKey, setTableKey] = useState(0);

    const getStatusConfig = (status: string) => {
        const statusLower = (status || '').toLowerCase();
        switch (statusLower) {
            case 'approved':
                return {
                    label: translate('approved') || 'Approved',
                    color: '#10b981',
                    bgColor: '#d1fae5',
                    icon: '✓'
                };
            case 'pending':
                return {
                    label: translate('pending') || 'Pending',
                    color: '#f59e0b',
                    bgColor: '#fef3c7',
                    icon: '⏳'
                };
            case 'rejected':
                return {
                    label: translate('rejected') || 'Rejected',
                    color: '#ef4444',
                    bgColor: '#fee2e2',
                    icon: '✗'
                };
            default:
                return {
                    label: status || 'Unknown',
                    color: '#6b7280',
                    bgColor: '#f3f4f6',
                    icon: '?'
                };
        }
    };

    const columns = [
        {
            title: "ID",
            data: "id",
        },
        {
            title: translate("comment"),
            data: "comment",
        },            
        {
            title: translate("userName"),
            data: "user_name",
        },            
        {
            title: translate("carName"),
            data: "car_name",
        },            
        {
            title: translate("status"),
            data: "status",
            orderable: false,
            searchable: false,
            render: (_data: any, _type: any, row: any) => {
                const currentStatus = row.status || 'pending';
                const statusConfig = getStatusConfig(currentStatus);
                
                return `
                    <div class="status-selector-wrapper" style="display: flex; justify-content: center; align-items: center;">
                        <div class="status-dropdown" data-review-id="${row.id}" data-current-status="${currentStatus}" style="position: relative; display: inline-block;">
                            <button 
                                type="button" 
                                class="status-button dt-status-button" 
                                data-review-id="${row.id}"
                                style="
                                    display: flex;
                                    align-items: center;
                                    gap: 8px;
                                    padding: 8px 16px;
                                    border: none;
                                    border-radius: 8px;
                                    background-color: ${statusConfig.bgColor};
                                    color: ${statusConfig.color};
                                    font-weight: 600;
                                    font-size: 14px;
                                    cursor: pointer;
                                    transition: all 0.2s ease;
                                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                                    min-width: 120px;
                                    justify-content: center;
                                "
                                onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 4px 8px rgba(0,0,0,0.15)'"
                                onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.1)'"
                            >
                                <span style="font-size: 16px;">${statusConfig.icon}</span>
                                <span>${statusConfig.label}</span>
                                <span style="font-size: 12px; margin-left: 4px;">▼</span>
                            </button>
                            <div 
                                class="status-dropdown-menu" 
                                data-review-id="${row.id}"
                                style="
                                    display: none;
                                    position: absolute;
                                    top: 100%;
                                    left: 50%;
                                    transform: translateX(-50%);
                                    margin-top: 4px;
                                    background: white;
                                    border-radius: 8px;
                                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                                    z-index: 1000;
                                    min-width: 140px;
                                    overflow: hidden;
                                    border: 1px solid #e5e7eb;
                                "
                            >
                                <button 
                                    type="button" 
                                    class="status-option dt-status-option" 
                                    data-review-id="${row.id}" 
                                    data-status="approved"
                                    style="
                                        width: 100%;
                                        padding: 12px 16px;
                                        border: none;
                                        background: ${currentStatus === 'approved' ? '#d1fae5' : 'white'};
                                        color: #10b981;
                                        text-align: left;
                                        cursor: pointer;
                                        font-weight: ${currentStatus === 'approved' ? '600' : '500'};
                                        display: flex;
                                        align-items: center;
                                        gap: 8px;
                                        transition: background 0.2s ease;
                                    "
                                    onmouseover="this.style.backgroundColor='#d1fae5'"
                                    onmouseout="this.style.backgroundColor='${currentStatus === 'approved' ? '#d1fae5' : 'white'}'"
                                >
                                    <span style="font-size: 16px;">✓</span>
                                    <span>${translate('approved') || 'Approved'}</span>
                                    ${currentStatus === 'approved' ? '<span style="margin-left: auto; font-size: 12px;">✓</span>' : ''}
                                </button>
                                <button 
                                    type="button" 
                                    class="status-option dt-status-option" 
                                    data-review-id="${row.id}" 
                                    data-status="pending"
                                    style="
                                        width: 100%;
                                        padding: 12px 16px;
                                        border: none;
                                        border-top: 1px solid #e5e7eb;
                                        border-bottom: 1px solid #e5e7eb;
                                        background: ${currentStatus === 'pending' ? '#fef3c7' : 'white'};
                                        color: #f59e0b;
                                        text-align: left;
                                        cursor: pointer;
                                        font-weight: ${currentStatus === 'pending' ? '600' : '500'};
                                        display: flex;
                                        align-items: center;
                                        gap: 8px;
                                        transition: background 0.2s ease;
                                    "
                                    onmouseover="this.style.backgroundColor='#fef3c7'"
                                    onmouseout="this.style.backgroundColor='${currentStatus === 'pending' ? '#fef3c7' : 'white'}'"
                                >
                                    <span style="font-size: 16px;">⏳</span>
                                    <span>${translate('pending') || 'Pending'}</span>
                                    ${currentStatus === 'pending' ? '<span style="margin-left: auto; font-size: 12px;">✓</span>' : ''}
                                </button>
                                <button 
                                    type="button" 
                                    class="status-option dt-status-option" 
                                    data-review-id="${row.id}" 
                                    data-status="rejected"
                                    style="
                                        width: 100%;
                                        padding: 12px 16px;
                                        border: none;
                                        background: ${currentStatus === 'rejected' ? '#fee2e2' : 'white'};
                                        color: #ef4444;
                                        text-align: left;
                                        cursor: pointer;
                                        font-weight: ${currentStatus === 'rejected' ? '600' : '500'};
                                        display: flex;
                                        align-items: center;
                                        gap: 8px;
                                        transition: background 0.2s ease;
                                    "
                                    onmouseover="this.style.backgroundColor='#fee2e2'"
                                    onmouseout="this.style.backgroundColor='${currentStatus === 'rejected' ? '#fee2e2' : 'white'}'"
                                >
                                    <span style="font-size: 16px;">✗</span>
                                    <span>${translate('rejected') || 'Rejected'}</span>
                                    ${currentStatus === 'rejected' ? '<span style="margin-left: auto; font-size: 12px;">✓</span>' : ''}
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }
        },                   
    ];

    const [component, setComponent] = useState<any>(undefined);    

    const dispatch = useDispatch();    
    const actionLoader = useSelector((state: RootState) => state.QAReducer.actionLoader);

    // Handle status dropdown clicks
    useEffect(() => {
        const container = tableContainerRef.current;
        if (!container) return;

        const handleStatusButtonClick = (e: Event) => {
            const target = e.target as HTMLElement;
            const button = target.closest('.dt-status-button') as HTMLButtonElement;
            
            if (!button) return;

            e.preventDefault();
            e.stopPropagation();

            const reviewId = button.getAttribute('data-review-id');
            if (!reviewId) return;

            // Toggle dropdown menu
            const dropdown = container.querySelector(`.status-dropdown-menu[data-review-id="${reviewId}"]`) as HTMLElement;
            if (dropdown) {
                // Close all other dropdowns
                container.querySelectorAll('.status-dropdown-menu').forEach((menu) => {
                    if (menu !== dropdown) {
                        (menu as HTMLElement).style.display = 'none';
                    }
                });
                
                dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
            }
        };

        const handleStatusOptionClick = (e: Event) => {
            const target = e.target as HTMLElement;
            const option = target.closest('.dt-status-option') as HTMLButtonElement;
            
            if (!option) return;

            e.preventDefault();
            e.stopPropagation();

            const reviewId = option.getAttribute('data-review-id');
            const newStatus = option.getAttribute('data-status');
            
            if (!reviewId || !newStatus) return;

            // Get current status
            const dropdown = container.querySelector(`.status-dropdown[data-review-id="${reviewId}"]`) as HTMLElement;
            const currentStatus = dropdown?.getAttribute('data-current-status') || '';

            // Don't update if status hasn't changed
            if (currentStatus.toLowerCase() === newStatus.toLowerCase()) {
                // Close dropdown
                const menu = container.querySelector(`.status-dropdown-menu[data-review-id="${reviewId}"]`) as HTMLElement;
                if (menu) menu.style.display = 'none';
                return;
            }

            // Prevent action if loader is active
            if (actionLoader) {
                return;
            }

            // Close dropdown
            const menu = container.querySelector(`.status-dropdown-menu[data-review-id="${reviewId}"]`) as HTMLElement;
            if (menu) menu.style.display = 'none';

            // Dispatch action to update status
            dispatch(updateReviewStatus(buildShamcarRequest(
                { id: reviewId, status: newStatus },
                null,
                null,
                null,
                [
                    {
                        isDispatch: false,
                        action: () => {
                            setTableKey((prev) => prev + 1);
                        },
                        data: null,
                    }
                ]
            )));
        };

        // Close dropdowns when clicking outside
        const handleClickOutside = (e: Event) => {
            const target = e.target as HTMLElement;
            if (!target.closest('.status-dropdown')) {
                container.querySelectorAll('.status-dropdown-menu').forEach((menu) => {
                    (menu as HTMLElement).style.display = 'none';
                });
            }
        };

        container.addEventListener('click', handleStatusButtonClick, true);
        container.addEventListener('click', handleStatusOptionClick, true);
        document.addEventListener('click', handleClickOutside);

        return () => {
            container.removeEventListener('click', handleStatusButtonClick, true);
            container.removeEventListener('click', handleStatusOptionClick, true);
            document.removeEventListener('click', handleClickOutside);
        };
    }, [dispatch, actionLoader]);
            

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
                            url: getEndPoint(GET_ALL_REVIEWS),
                            method: "GET",
                        }}
                        serverSide={true}
                        actions={{ enabled: true, renderHtml: null }}
                        rowId="id"
                        options={{
                            searching: true,
                        }}
                        onView={(row: any) => {
                            // prefer row.id, otherwise fallback to id
                            setComponent(
                                <ViewReviewDetails
                                    data={row}
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

export default ReviewsPage;