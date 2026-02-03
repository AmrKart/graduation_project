import React, { useState, useRef } from 'react';
import { Container } from 'reactstrap';
import DataTableContainer from '@@/components/Common/DataTableContainer';
import { translate } from '@@/locales/translate';
import { deleteQuestion } from '@@/store/actions';
import ConfirmModal from '@@/components/Modal/ConfirmModal';
import { buildShamcarRequest } from '@@/helpers/buildRequest';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@@/store';
import { DataTableRef } from '@@/components/Common/DataTableContainer';
import { GET_ALL_QUESTIONS, getEndPoint } from '@@/helpers/url_helper';
import ViewQuestionDetailsModal from './helperComponents/ViewQuestionDetails';

const QuestionsPage = () => {

    const tableRef = useRef<DataTableRef>(null);
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const [tableKey, setTableKey] = useState(0);

    const columns = [
        {
            title: "ID",
            data: "id",
        },
        {
            title: translate("questionTitle"),
            data: "title",
        },            
        {
            title: translate("userName"),
            data: "user_name",
        },            
        {
            title: translate("answersCount"),
            data: "answers_count",
        },            
    ];

    const [component, setComponent] = useState<any>(undefined);    

    const dispatch = useDispatch();    
    const actionLoader = useSelector((state: RootState) => state.QAReducer.actionLoader);
            

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
                            url: getEndPoint(GET_ALL_QUESTIONS),
                            method: "GET",
                        }}
                        serverSide={true}
                        actions={{ enabled: true, renderHtml: null }}
                        rowId="id"
                        options={{
                            searching: false,
                        }}
                        onView={(row: any) => {
                            // prefer row.id, otherwise fallback to id
                            setComponent(
                                <ViewQuestionDetailsModal
                                    data={row}
                                    setOpen={() => setComponent(undefined)}
                                />
                            );
                        }}                        
                        onDelete={(row: any, id: any) => {
                            const questionId = (row && row.id) ? row.id : id;
                            setComponent(
                                <ConfirmModal                                    
                                    isOpen={true}
                                    loading={actionLoader}
                                    onConfirm={() => {
                                        // Keep modal open to show loading state
                                        dispatch(deleteQuestion(buildShamcarRequest({ id: questionId }, null, null, null, [
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

export default QuestionsPage;