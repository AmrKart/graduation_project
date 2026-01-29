import i18n from "@@/i18n";
import { translate } from "@@/locales/translate";
import i18next from "i18next";
import React from "react";
import { useSelector } from "react-redux";
import Select from "react-select"
import { FormGroup, Label } from "reactstrap";
const CustomInputSelect = (props) => {

    const state = useSelector((state) => state.Constants.data);
    let options = [];
    if (props.options) {
        options = props.options;
    }
    const getValue = () => {
        let data = props.validation;
        let extractedObject = undefined;


        extractedObject = props.options.find(el => el.value == data.value)


        return extractedObject ?? null;
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

            }
        },
    };
    return (
        <React.Fragment>
            <FormGroup >

                <Label  >{`${translate(props.name)}`}<span className="text-danger">{props?.required ? "*" : ""}</span></Label>

                <Select
                    styles={customStyles}
                    placeholder=""
                    {...props.validation}
                    value={getValue()}
                    {...props.inputProps}
                    onChange={(e) => {
                        props.onChangeSelect(e);
                    }}
                    options={options}
                ></Select>

                {props?.metaProps?.error ? (
                    <React.Fragment>
                        <div style={{ color: 'red' }}>{props?.metaProps?.error}</div>
                    </React.Fragment>
                ) : null}

            </FormGroup>
        </React.Fragment>
    )

}
export default CustomInputSelect