import React, { useEffect, useMemo } from 'react';
import {
  IDynamicAttachment,
  IDynamicAttachmentSubType,
  IDynamicAttachmentType,
} from '@@/interfaces/dynamicAttachment';
import { DynamicForm, DynamicInputType } from '@@/interfaces/DynamicForm';
import { FormikProps } from 'formik';
import InputSelect from '../InputSelect';
import { Col } from 'reactstrap';
import InputText from '../InputText';
import { AttachmentFieldTypeRequireLevelEnum } from '@@/common/types/constantEnum';
import InputDate from '../InputDate';
import { translate } from '@@/locales/translate';
import * as Yup from 'yup';
import { JObject } from '@@/common/types/json';
import GenerateDynamicForm from './GenerateDynamicForm';
import { isNumericKey } from '@@/common/helper';
interface Props {
  data: IDynamicAttachment;
  form: FormikProps<any>;
  baseKey: string;
  subKey: string;
  filesName?: string;
  setValidationSchema: (schema: any) => void;
  validationSchema: any;
}
const DynamicAttachmentForm = ({
  data,
  form,
  baseKey,
  subKey,
  validationSchema,
  setValidationSchema,
  filesName = 'files',
}: Props) => {
  console.log(form.values);
  useEffect(() => {
    const validation: JObject = {};
    validation[baseKey] = Yup.number().required(translate('required'));

    if (form.values[baseKey]) {
      const type = data.types.find((item) => item.id == form.values[baseKey]);
      if (type?.hasSubTypes) {
        validation[subKey] = Yup.number().required(translate('required'));
      }
      if (type?.expiryDate == AttachmentFieldTypeRequireLevelEnum.Mandatory) {
        validation['expiryDate'] = Yup.string().required(translate('required'));
      }
      if (type?.issuingDate == AttachmentFieldTypeRequireLevelEnum.Mandatory) {
        validation['issuingDate'] = Yup.string().required(
          translate('required')
        );
      }
      if (
        type?.documentNumber == AttachmentFieldTypeRequireLevelEnum.Mandatory
      ) {
        validation['documentNumber'] = Yup.string().required(
          translate('required')
        );
      }
      if (type?.title == AttachmentFieldTypeRequireLevelEnum.Mandatory) {
        validation['title'] = Yup.string().required(translate('required'));
      }
      if (type?.issuingPlace == AttachmentFieldTypeRequireLevelEnum.Mandatory) {
        validation['issuingPlace'] = Yup.string().required(
          translate('required')
        );
      }
      if (type && type.numberOfFiles > 0) {
        validation[filesName] = Yup.array()
          .of(Yup.mixed().required(translate('required')))
          .min(type?.numberOfFiles ?? 0, translate('required'));
      }
      for (const field of type?.fieldTypes ?? []) {
        if (
          field.requireLevel == AttachmentFieldTypeRequireLevelEnum.Mandatory
        ) {
          validation['' + field.id] = Yup.mixed().required(
            translate('required')
          );
        }
      }
      if (form.values[subKey]) {
        const subType = data.subTypes.find(
          (item) => item.id == form.values[subKey]
        );
        for (const field of subType?.fieldTypes ?? []) {
          if (
            field.requireLevel == AttachmentFieldTypeRequireLevelEnum.Mandatory
          ) {
            validation['' + field.id] = Yup.mixed().required(
              translate('required')
            );
          }
        }
      }
    }
    setValidationSchema({ ...validationSchema, ...validation });
    const currentValues: JObject = {};
    for (const key in form.values) {
      if (!isNumericKey(key)) {
        currentValues[key] = form.values[key];
      }
    }
    form.setValues({
      ...currentValues,
      title: '',
      documentNumber: '',
      issuingDate: '',
      expiryDate: '',
      issuingPlace: '',
      [filesName]: [],
      // Add any other fields that need to be reset
    });
  }, [form.values[baseKey], form.values[subKey]]);
  const showSubType = useMemo(() => {
    if (!form.values[baseKey]) {
      return false;
    }
    const type = data.types.find((item) => item.id == form.values[baseKey]);
    return type?.hasSubTypes ?? false;
  }, [form.values[baseKey]]);

  const showBaseFields = useMemo(() => {
    if (!form.values[baseKey]) {
      return [];
    }
    const content: Array<React.ReactNode> = [];
    const type = data.types.find((item) => item.id == form.values[baseKey]);
    if (type?.title !== AttachmentFieldTypeRequireLevelEnum.None) {
      content.push(
        <Col key={'title'} md={12}>
          <InputText
            name="document.title"
            validation={form.getFieldProps('title')}
            metaProps={form.getFieldMeta('title')}
            required={
              type?.title === AttachmentFieldTypeRequireLevelEnum.Mandatory
            }
          />
        </Col>
      );
    }
    if (type?.documentNumber !== AttachmentFieldTypeRequireLevelEnum.None) {
      content.push(
        <Col key={'documentNumber'} md={12}>
          <InputText
            required={
              type?.documentNumber ===
              AttachmentFieldTypeRequireLevelEnum.Mandatory
            }
            name="documentNumber"
            validation={form.getFieldProps('documentNumber')}
            metaProps={form.getFieldMeta('documentNumber')}
          />
        </Col>
      );
    }
    if (type?.issuingDate !== AttachmentFieldTypeRequireLevelEnum.None) {
      content.push(
        <Col key={'issuingDate'} md={12}>
          <InputDate
            required={
              type?.issuingDate ===
              AttachmentFieldTypeRequireLevelEnum.Mandatory
            }
            name="document.issuedAt"
            isonlyDate
            validation={form.getFieldProps('issuingDate')}
            metaProps={form.getFieldMeta('issuingDate')}
          />
        </Col>
      );
    }
    if (type?.expiryDate !== AttachmentFieldTypeRequireLevelEnum.None) {
      content.push(
        <Col key={'expiryDate'} md={12}>
          <InputDate
            required={
              type?.expiryDate === AttachmentFieldTypeRequireLevelEnum.Mandatory
            }
            name="document.expiresAt"
            isonlyDate
            validation={form.getFieldProps('expiryDate')}
            metaProps={form.getFieldMeta('expiryDate')}
          />
        </Col>
      );
    }

    if (type?.issuingPlace !== AttachmentFieldTypeRequireLevelEnum.None) {
      content.push(
        <Col key={'issuingPlace'} md={12}>
          <InputText
            required={
              type?.issuingPlace ===
              AttachmentFieldTypeRequireLevelEnum.Mandatory
            }
            name="issuingPlace"
            validation={form.getFieldProps('issuingPlace')}
            metaProps={form.getFieldMeta('issuingPlace')}
          />
        </Col>
      );
    }
    return content;
  }, [form.values, form.errors]);

  const getDynamicTypeFields = useMemo(() => {
    if (!form.values[baseKey]) {
      return [];
    }
    const type = data.types.find((item) => item.id == form.values[baseKey]);
    const fiedls: Array<DynamicForm> = [];
    for (const field of type?.fieldTypes ?? []) {
      fiedls.push({
        title: field.label,
        key: '' + field.id,
        type: field.dataType,
        lookupName: field.metadata ?? undefined,
        required:
          field.requireLevel == AttachmentFieldTypeRequireLevelEnum.Mandatory,
      });
    }
    if (form.values[subKey]) {
      const subType = data.subTypes.find(
        (item) => item.id == form.values[subKey]
      );
      for (const field of subType?.fieldTypes ?? []) {
        fiedls.push({
          title: field.label,
          key: '' + field.id,
          type: field.dataType,
          lookupName: field.metadata ?? undefined,
          required:
            field.requireLevel == AttachmentFieldTypeRequireLevelEnum.Mandatory,
        });
      }
    }
    fiedls.push({
      title: 'attachmentFiles',
      key: filesName,
      type: DynamicInputType.File,
      required: true,
    });
    return fiedls;
  }, [form.values, form.errors]);

  return (
    <>
      <Col md={12}>
        <InputSelect
          size={{ xl: 6 }}
          required
          name="attachment.type"
          validation={form.getFieldProps(baseKey)}
          metaProps={form.getFieldMeta(baseKey)}
          inputProps={{ placeholder: '', menuPosition: 'fixed' }}
          options={data.types.map((item) => ({
            label: item.label,
            value: item.id,
          }))}
          onChangeSelect={(val: any) => {
            form.setFieldValue(baseKey, val.value);
            form.setFieldValue(subKey, undefined);
          }}
        ></InputSelect>
      </Col>
      {showSubType && (
        <Col xl="12">
          <InputSelect
            size={{ xl: 6 }}
            required
            name={'attachment.subType'}
            validation={form.getFieldProps(subKey)}
            metaProps={form.getFieldMeta(subKey)}
            inputProps={{
              placeholder: '',
              menuPosition: 'fixed',
              isDisabled: !form.getFieldMeta(baseKey).value,
            }}
            options={data.subTypes
              .filter((item) => item.typeId == form.getFieldMeta(baseKey).value)
              .map((item) => ({
                label: item.label,
                value: item.id,
              }))}
            onChangeSelect={(val: any) => {
              form.setFieldValue(subKey, val.value);
            }}
          ></InputSelect>
        </Col>
      )}
      {showBaseFields}
      <GenerateDynamicForm form={form} fields={getDynamicTypeFields} />
    </>
  );
};
export default DynamicAttachmentForm;
