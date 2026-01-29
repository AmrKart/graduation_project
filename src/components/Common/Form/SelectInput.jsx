import i18n from "@@/i18n";
import { translate } from "@@/locales/translate";
import i18next from "i18next";
import React from "react";
import { useSelector } from "react-redux";
import Select from "react-select"
import { FormGroup, Label } from "reactstrap";
const SelectInput = (props) => {

    let options = [];
    if (props.options) {
        options = props.options;
    }
    const getValue = () => {
        let data = props.value;

        let extractedObject = undefined;

        if (data)
            extractedObject = props.options.find(el => el.value == data)


        return extractedObject ?? null;
    }
    const customStyles = {
        menu: (provided) => ({
            ...provided,
            zIndex: 9999,

        }),
    };
    return (
        <React.Fragment>
            <FormGroup >

                <Label >{`${translate(props.name)}`}</Label>
                <Select
                    styles={customStyles}
                    {...props}
                    value={getValue()}
                    onChange={(e) => {
                        props.onChangeSelect(e);
                    }}
                    options={options}

                ></Select>

            </FormGroup>
        </React.Fragment>
    )

}
export default SelectInput