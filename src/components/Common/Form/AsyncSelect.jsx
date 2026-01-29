import React, { useEffect, useState } from "react";
import Select from "react-select"
import { FormGroup, Label } from "reactstrap";
import * as axios from "@@/helpers/api_helper"
import { getErrorMessage } from "@@/helpers/errorResponse";
import Loader from "../Loader";
import { ErrorMode, SuccessMode } from "@@/common/types/axiosRequest";
import { translate } from "@@/locales/translate";

const AsyncSelect = (props) => {
    const [options, setOptions] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [getData, setGetData] = useState(false);
    const [inputValue, setInputValue] = useState(props.validation?.value ?? undefined);

    useEffect(() => {
        const t = setTimeout(() => {
            setGetData(!getData);
        }, 500);
        return () => clearTimeout(t);
    }, [inputValue]);

    useEffect(() => {
        setLoading(true);

        axios.get(props.url, { error: ErrorMode.message, success: SuccessMode.none }, { params: { pageNumber: 1, pageSize: 1000000000, ...props.preFilter } }).then((response) => {
            const options = (response?.data?.items ?? []).map((ele) => {
                return {
                    label: ele[props.label],
                    value: props.valueKey ? ele[props.valueKey] : ele.id,
                    data: ele,
                };
            });
            if (props.sortCategoryId) {
                options.sort((a, b) => a.data.categoryId - b.data.categoryId);
            }

            setOptions(options);

            if (props.initialSelect) {
                const firstOption = options[0];
                if (firstOption) {
                    props.onChangeSelect(firstOption);
                }
            }

            setLoading(false);
        }).catch((err) => {
            getErrorMessage(err, true);
            setLoading(false);
        });
    }, []);




    const getValue = () => {
        let data = props.validation;
        let extractedObject = undefined;

        extractedObject = options?.find(el => el.value == data.value);


        return extractedObject ?? null;
    }
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
        singleValue: (provided, state) => ({
            ...provided,
            color: state.isDisabled ? '#495057' : null
        })
    };
    return (
        <React.Fragment>
            <FormGroup >

                <Label  >{`${translate(props.name)}`}<span className="text-danger">{props?.required ? "*" : ""}</span></Label>
                <Loader loading={loading}>

                    <Select
                        placeholder=""

                        styles={customStyles}

                        {...props.inputProps}
                        value={getValue()}
                        onInputChange={(e) => {
                            setInputValue(e);

                        }}
                        onChange={(e) => {
                            props.onChangeSelect({ ...e });
                        }}
                        options={options}

                    ></Select>
                    {props?.metaProps?.error ? (
                        <React.Fragment>
                            <div style={{ color: 'red' }}>{props?.metaProps?.error}</div>
                        </React.Fragment>
                    ) : null}
                </Loader>

            </FormGroup>
        </React.Fragment>
    )

}
export default AsyncSelect