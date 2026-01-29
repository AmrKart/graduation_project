import { DynamicForm, DynamicInputType } from '@@/interfaces/DynamicForm';
import { FormikProps } from 'formik';
import React from 'react';
import { Col } from 'reactstrap';
import InputText from '../InputText';
import InputDate from '../InputDate';
import InputSelect from '../InputSelect';
import DragFileInput from '../InputFileDrop';
import DocumentInfo from '@@/components/Modal/DocumentInfo';
import InputCheckbox from '../InputCheckbox';
import InputTextarea from '../InputTextarea';
import InputNumber from '../InputNumber';
import SignatureInput from '../SignatureInput';
export interface props {
  form: FormikProps<any>;
  fields: Array<DynamicForm>;
}
const GenerateDynamicForm = (props: props) => {
  const { form, fields } = props;

  const getField = (item: DynamicForm) => {
    switch (item.type) {
      case DynamicInputType.String:
        if (item.required) {
          // props.setValidationSchema((prev: JObject) => ({ ...prev, [item.key]: Yup.number().required(translate("required")) }))
        }
        return (
          <Col key={item.key} xl={item.size ?? '12'}>
            <InputText
              required={item.required}
              name={item.title}
              validation={form.getFieldProps(item.key)}
              metaProps={form.getFieldMeta(item.key)}
            ></InputText>
          </Col>
        );
      case DynamicInputType.TextArea:
        return (
          <Col key={item.key} xl={item.size ?? '12'}>
            <InputTextarea
              required={item.required}
              name={item.title}
              validation={form.getFieldProps(item.key)}
              metaProps={form.getFieldMeta(item.key)}
            ></InputTextarea>
          </Col>
        );
      case DynamicInputType.DateTime:
        return (
          <Col key={item.key} xl={item.size ?? '12'}>
            <InputDate
              isDateTime
              required={item.required}
              name={item.title}
              validation={form.getFieldProps(item.key)}
              metaProps={form.getFieldMeta(item.key)}
            >
            </InputDate>
          </Col>
        );
      case DynamicInputType.Date:
        return (
          <Col key={item.key} xl={item.size ?? '12'}>
            <InputDate
              isonlyDate
              required={item.required}
              name={item.title}
              validation={form.getFieldProps(item.key)}
              metaProps={form.getFieldMeta(item.key)}
            ></InputDate>
          </Col>
        );
      case DynamicInputType.Number:
        return (
          <Col key={item.key} xl={item.size ?? '12'}>
            <InputNumber
              required={item.required}
              name={item.title}
              validation={form.getFieldProps(item.key)}
              metaProps={form.getFieldMeta(item.key)}
            ></InputNumber>
          </Col>
        );

      case DynamicInputType.Lookup:
        return (
          <Col key={item.key} xl={item.size ?? '12'}>
            <InputSelect
              required={item.required}
              name={item.title}
              validation={form.getFieldProps(item.key)}
              metaProps={form.getFieldMeta(item.key)}
              inputProps={{ menuPosition: "fixed" }}
              lookup={item.lookupName}
              onChangeSelect={(val: any) => {
                form.setFieldValue(item.key, val.value);
              }}
            ></InputSelect>
          </Col>
        );
      case DynamicInputType.Select:
        return (
          <Col key={item.key} xl={item.size ?? '12'}>
            <InputSelect
              required={item.required}
              name={item.title}
              validation={form.getFieldProps(item.key)}
              metaProps={form.getFieldMeta(item.key)}
              options={item.options}
              onChangeSelect={(val: any) => {
                form.setFieldValue(item.key, val.value);
              }}
            ></InputSelect>
          </Col>
        );
      case DynamicInputType.Boolean:
        return (
          <Col key={item.key} xl={item.size ?? '12'}>
            <InputCheckbox
              label={item.title}
              inputProps={{ alignItems: 'end' }}
              validation={form.getFieldProps(item.key)}
              metaProps={form.getFieldMeta(item.key)}
            ></InputCheckbox>
          </Col>
        );
      case DynamicInputType.File:
        return (
          <Col key={item.key} xl={item.size ?? '12'}>
            <DragFileInput
              name={item.title}
              validation={form.getFieldProps(item.key)}
              metaProps={form.getFieldMeta(item.key)}
              onChangeFile={(val: File) => {
                const newArr = [
                  ...(form.getFieldProps(item.key)?.value ?? []),
                  val,
                ];
                form.getFieldProps(item.key).onChange({
                  target: {
                    name: item.key,
                    value: newArr,
                  },
                });
              }}

            />
            {form.getFieldProps(item.key)?.value?.length > 0 &&
              form
                .getFieldProps(item.key)
                .value.map((ele: File, ind: number) => (
                  <DocumentInfo
                    key={ind}
                    ind={ind}
                    file={ele}
                    preview={URL.createObjectURL(ele)}
                    handleClick={() => {
                      const newArr = [
                        ...form.getFieldProps(item.key).value,
                      ];
                      newArr.splice(ind, 1);
                      form.setFieldValue(item.key, newArr);
                    }}
                    label="file"
                  />
                ))}
          </Col>
        );
      case DynamicInputType.FileWithSignature:
        return (
          <Col key={item.key} xl={item.size ?? '12'}>
            <SignatureInput
              name={item.title}
              validation={form.getFieldProps(item.key)}
              metaProps={form.getFieldMeta(item.key)}
              onChangeFile={(val: File) => {
                const newArr = [
                  ...(form.getFieldProps(item.key)?.value ?? []),
                  val,
                ];
                form.getFieldProps(item.key).onChange({
                  target: {
                    name: item.key,
                    value: newArr,
                  },
                });
              }}

            />
            {form.getFieldProps(item.key)?.value?.length > 0 &&
              form
                .getFieldProps(item.key)
                .value.map((ele: File, ind: number) => (
                  <DocumentInfo
                    key={ind}
                    ind={ind}
                    file={ele}
                    preview={URL.createObjectURL(ele)}
                    handleClick={() => {
                      const newArr = [
                        ...form.getFieldProps(item.key).value,
                      ];
                      newArr.splice(ind, 1);
                      form.setFieldValue(item.key, newArr);
                    }}
                    label="file"
                  />
                ))}
          </Col>
        );

      default:
        return <></>;
    }
  };

  return <React.Fragment>{fields.map((el) => getField(el))}</React.Fragment>;
};
export default GenerateDynamicForm;
