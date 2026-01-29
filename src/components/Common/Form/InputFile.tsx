import React from 'react';
import { Input, Label } from 'reactstrap';
import { FieldInputProps, FieldMetaProps } from 'formik';
import { translate } from '@@/locales/translate';

type FileInputProps = {
  label: string;
  validation: FieldInputProps<any>;
  metaProps: FieldMetaProps<any>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FileInput: React.FC<FileInputProps> = ({
  label,
  validation,
  metaProps,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    } else {
      const file = event.target.files && event.target.files[0];

      validation.onChange({
        target: {
          name: validation.name,
          value: file,
        },
      });
    }
  };

  return (
    <div>
      <Label for={validation.name}>{translate(label)}</Label>
      <Input
        type="file"
        name={validation.name}
        id={validation.name}
        onChange={handleChange}
      />
    </div>
  );
};

export default FileInput;
