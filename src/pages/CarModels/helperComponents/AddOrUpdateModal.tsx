import InputText from "@@/components/Common/Form/InputText";
import FullScreenModal from "@@/components/Common/FullScreenModal";
import { Icons } from "@@/components/Common/Icons";
import { buildShamcarRequest } from "@@/helpers/buildRequest";
import { translate } from "@@/locales/translate";
import { RootState } from "@@/store";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import * as Yup from 'yup';
import { getCarMakes } from "@@/store/actions";
import InputSelect from "@@/components/Common/Form/InputSelect";
import { ICarModel } from "@@/interfaces/carModel";

interface Props {
    data?: ICarModel;
    open: boolean;
    setOpen: (val: boolean) => void;
    action: any;
    title: string;
    setReloadTrigger: (val: any) => void;
}

const AddOrUpdateModal = (
    {
        data,
        open,
        setOpen,
        action,
        title,
        setReloadTrigger
    }: Props) => {

    const dispatch = useDispatch();

    const loading = useSelector(
        (state: RootState) => state.CarModels.actionLoader
    );

    const carMakes = useSelector((state : RootState) => state.CarMakes.carMakes.data);

    useEffect(() => {
        dispatch(getCarMakes(buildShamcarRequest({})));
    }, []);

    console.log("carMakes = ",carMakes);

    const formik = useFormik({
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string().required(translate('required')),
            car_make_id: Yup.number().required(translate('required')),
        }),
        initialValues: { 
            ...data,
            car_make_id: data?.car_make ?? null,
         },
        onSubmit: (values: any) => {
            dispatch(
                action(
                    buildShamcarRequest(values, null, null, null, [
                        {
                            action: setOpen,
                            isDispatch: false,
                            data: false,
                        },
                        {
                            action: ()=>{
                                setReloadTrigger((prev : number) => prev+1);
                            },
                            isDispatch: false,
                            data: false,
                        }

                    ])
                )
            );
        },
        validateOnChange: false,
        validateOnBlur: false,
    });

    return (
        <FullScreenModal
            isOpen={open}
            setOpen={setOpen}
            title={title}
            loading={loading}
            closeButton
            action={formik.handleSubmit}
            actionIcon={Icons.add}
            modalSize='lg'            
        >
            <Row>
                <Col md="6">
                    <InputText
                        name={translate('carModel.name')}
                        validation={formik.getFieldProps('name')}
                        metaProps={formik.getFieldMeta('name')}
                        required
                    />
                </Col>                
                <Col md="6">
                    <InputSelect
                        required
                        name={translate('carMake.name')}
                        validation={formik.getFieldProps('car_make_id')}
                        metaProps={formik.getFieldMeta('car_make_id')}
                        options={carMakes.map((el : any) => ({ value: el.id, label: el.name }))}
                        onChangeSelect={(option : any) => {
                            // option is { value, label } or null
                            formik.setFieldValue('car_make_id', option?.value ?? null);
                          }}
                    />
                </Col>                
            </Row>
        </FullScreenModal>
    );
}

export default AddOrUpdateModal;