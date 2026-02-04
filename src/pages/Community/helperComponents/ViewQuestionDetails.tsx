import FullScreenModal from "@@/components/Common/FullScreenModal";
import InfoLabelValue from "@@/components/InfoLableValue";
import { IQuestion } from "@@/interfaces/Q&A";
import { translate } from "@@/locales/translate";
import React from "react";
import { useRef } from "react";
import { Col, Row } from "reactstrap";
import { useState } from "react";
import DataTableContainer from "@@/components/Common/DataTableContainer";
import { GET_ALL_ANSWERS, getEndPoint } from "@@/helpers/url_helper";
import { useDispatch, useSelector } from "react-redux";
import ConfirmModal from "@@/components/Modal/ConfirmModal";
import { RootState } from "@@/store";
import { addAnswer, deleteAnswer } from "@@/store/actions";
import { buildShamcarRequest } from "@@/helpers/buildRequest";
import { DataTableRef } from '@@/components/Common/DataTableContainer';
import ViewAnswerDetails from "./ViewAnswerDetails";
import CustomeCardTitle from "@@/components/Common/Card/CustomeCardTitle";
import AddAnswer from "./AddAnswer";


type Props = {
    data: IQuestion;
    setOpen: (val?: any) => void;
}

const ViewQuestionDetailsModal = ({ data,setOpen }: Props) => {

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
            data: "user_name",
        },            
        {
            title: translate("createdAt"),
            data: "created_at",
        },            
    ];

    const [component,setComponent] = useState<any>(undefined);
    const dispatch = useDispatch();

    const actionLoader = useSelector((state : RootState) => state.QAReducer.actionLoader);

    return (
        <FullScreenModal
            isOpen={true}
            setOpen={setOpen}
            title={translate('details')}
            closeButton
            fullScreen
        >            
                <Row>
                    <Col xl={3} md={6} sm={12}>
                        <InfoLabelValue
                            title={translate('questionTitle')}
                            value={data?.title}
                        />                                                
                    </Col>                    
                    <Col xl={3} md={6} sm={12}>
                        <InfoLabelValue
                            title={translate('questionBody')}
                            value={data?.body}
                        />
                    </Col>
                    <Col xl={3} md={6} sm={12}>
                        <InfoLabelValue
                            title={translate('userName')}
                            value={data?.user_name}
                        />
                    </Col>
                    <Col xl={3} md={6} sm={12}>
                        <InfoLabelValue
                            title={translate('carModel.name')}
                            value={data?.car_model_name}
                        />
                    </Col>
                    <Col xl={3} md={6} sm={12}>
                        <InfoLabelValue
                            title={translate('answersCount')}
                            value={data?.answers_count}
                        />
                    </Col>
                    <Col xl={3} md={6} sm={12}>
                        <InfoLabelValue
                            title={translate('createdAt')}
                            value={data?.created_at}
                        />
                    </Col>
                </Row>
                <CustomeCardTitle
                title="answers"
                actions={[
                    {
                        title: translate('add.answer'),
                        onClick: () => {
                            setComponent(
                                <AddAnswer
                                 id={data.id}
                                 action={addAnswer}
                                 open={true}
                                 setOpen={setComponent}
                                 setReloadTrigger={setTableKey}
                                 title="add.answer"
                                 />
                            );
                        }
                    }
                ]}
                ></CustomeCardTitle>
                <div ref={tableContainerRef}>
                    <DataTableContainer
                        ref={tableRef}
                        columns={columns}
                        key={tableKey}
                        ajax={{
                            url: getEndPoint(GET_ALL_ANSWERS.replace(":id",data?.id ?? '')),
                            method: "GET",
                        }}
                        serverSide={true}
                        showItemsPerPage={false}
                        actions={{ enabled: true, renderHtml: null }}
                        rowId="id"
                        options={{
                            searching: false,
                        }}
                        onView={(row: any) => {
                            // prefer row.id, otherwise fallback to id
                            setComponent(
                                <ViewAnswerDetails
                                    data={row}
                                    setOpen={() => setComponent(undefined)}
                                />
                            );
                        }}                        
                        onDelete={(row: any, id: any) => {
                            const answerId = (row && row.id) ? row.id : id;
                            setComponent(
                                <ConfirmModal                                    
                                    isOpen={true}
                                    loading={actionLoader}
                                    onConfirm={() => {
                                        // Keep modal open to show loading state
                                        dispatch(deleteAnswer(buildShamcarRequest({ id: answerId }, null, null, null, [
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
            </FullScreenModal>
        )
    }

    export default ViewQuestionDetailsModal;