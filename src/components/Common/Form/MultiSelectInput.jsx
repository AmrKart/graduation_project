import i18n from "@@/i18n";
import { translate } from "@@/locales/translate";
import React from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { FormGroup, Label } from "reactstrap";

const MultiSelectInput = (props) => {
  const state = useSelector((state) => state.Constant.lookups);
  let options = [];
  if (props.options)
    options = props.options;
  else if (props.lookup && state.some(el => el.name == props.lookup)) {
    const items = state.find(el => el.name == props.lookup).items ?? [];
    options = items.map(el => {
      return {
        label: i18n.language == "en" ? el.titleEn : el.titleAr,
        value: el.id,
        obj: el,
      }
    })
  }

  const getValues = () => {
    const { value } = props.validation;
    const extractedObjects = [];
    if (value) {

      if (props.lookup) {
        value.forEach((val) => {
          let extractedObject = state.find((el) => el.name === props.lookup)?.items ?? [];
          extractedObject = extractedObject?.find(el => el.id == val) ?? null;
          if (extractedObject) {
            extractedObjects.push({
              label: extractedObject[i18n.language === "ar" ? "titleAr" : "titleEn"],
              value: extractedObject.id,
            });
          }
        });
      } else {
        value.forEach((val) => {
          const extractedObject = props.options.find((el) => el.value === val);
          if (extractedObject) {
            extractedObjects.push(extractedObject);
          }
        });
      }
    }

    return extractedObjects;
  };

  const getBorderColor = () => {
    if (props?.inputProps?.style) {
      return { ...props?.inputProps?.style }
    }
    return {};
  }
  const customStyles = {
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
    control: (base, state) => {
      return {
        ...base,


        // Removes weird border around container
        background: state.isDisabled ? '#EFF2F7' : null,
        ...getBorderColor()

      }
    },
    singleValue: provided => ({
      ...provided,
      color: state.isDisabled ? '#495057' : null
    })
  };

  return (
    <React.Fragment>
      <FormGroup>
        <Label>{`${translate(props.name)}`}<span className="text-danger">{props?.required ? "*" : ""}</span></Label>
        <Select
          styles={customStyles}
          placeholder=""
          {...props.validation}
          value={getValues()}
          {...props.inputProps}
          onChange={(selectedOptions) => {
            const values = selectedOptions ? selectedOptions.map((option) => option.value) : [];
            props.onChangeSelect({
              ...props.validation,
              value: values,
            });
          }}
          options={options}
          isMulti // Enable multi-select
        />
        {props?.metaProps?.error && (
          <div style={{ color: "red" }}>{props?.metaProps?.error}</div>
        )}
      </FormGroup>
    </React.Fragment>
  );
};

export default MultiSelectInput;