import i18n from "@@/i18n";
import { translate } from "@@/locales/translate";
import i18next from "i18next";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select"
import { FormGroup, Label, Spinner } from "reactstrap";

const CustomInputAsyncSelect = (props) => {

  const dispatch = useDispatch();






  const getValue = () => {
    let data = props.validation;
    let extractedObject = undefined;


    extractedObject = props.options.find(el => el.value == data.value)


    return extractedObject;
  }
  const customStyles = {
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,

    }),
  };

  const loadOptions = async (inputValue, callback) => {
    callback(props.options);
  }

  return (
    <React.Fragment>
      <FormGroup>
        <Label>{`${translate(props.name)}`}</Label>
        <Select
          styles={customStyles}
          placeholder=""
          {...props.validation}
          value={getValue()}
          {...props.inputProps}
          onInputChange={(e) => props.onInputChange(e)}
          onChange={(e) => {
            props.onChangeSelect(e);
          }}

          options={props.options}
          isLoading={props.isLoading} // add the isLoading prop
          components={{ DropdownIndicator: CustomDropdownIndicator }} // use a custom DropdownIndicator component
        />
      </FormGroup>
    </React.Fragment>
  )
}

// Define a custom DropdownIndicator component that shows the spinner when loading
const CustomDropdownIndicator = (props) => {
  return (
    <div>
      {props.isLoading ? (
        <Spinner color="primary" className=" mr-2 h-5 w-5" />
      ) : null}
      <span {...props.innerProps} />
    </div>
  );
};

export default CustomInputAsyncSelect;