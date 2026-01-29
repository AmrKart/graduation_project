import { translate } from "@@/locales/translate";
import React from "react";
import Select from "react-select";
import { FormGroup, Label } from "reactstrap";

const InputSelect = (props) => {
    // Normalize options so component accepts either ["a","b"] or [{value,label},...]
    let options = props.options ?? [];
    const normalizedOptions = options.map(opt =>
        typeof opt === "string" ? { value: opt, label: opt } : opt
    );

    const getValue = () => {
        const data = props.validation; // formik getFieldProps('field') object
        if (!data) return null;
        const found = normalizedOptions.find(el => el.value === data.value);
        return found ?? null;
    };

    const getBorderColor = () => {
        if (props?.inputProps?.style) return { ...props.inputProps.style };
        return {};
    };

    const customStyles = {
        menu: (provided) => ({
            ...provided,
            zIndex: 9999,
            backgroundColor: props?.color ?? '#1a1f2e',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#2a3441' : props?.color ?? '#1a1f2e',
            color: state.isFocused ? '#fff' : provided.color,
            cursor: 'pointer',
        }),
        control: (base, state) => ({
            ...base,
            background: state.isDisabled ? '#EFF2F7' : null,
            ...getBorderColor()
        }),
        input: (provided) => ({ ...provided, color: '#1a1f2e' }),
        singleValue: (provided, state) => ({
            ...provided,
            color: state.isDisabled ? '#495057' : '#1a1f2e',
            fontSize: '13px',
        }),
    };

    // handleChange: prefer props.onChangeSelect but fallback to Formik event style
    const handleChange = (option) => {
        if (props.onChangeSelect) {
            props.onChangeSelect(option);
            return;
        }
        // If a Formik-style handler was passed via validation.onChange (getFieldProps),
        // synthesize a fake event so Formik's handler works.
        if (props.validation?.onChange && props.validation?.name) {
            const fakeEvent = {
                target: {
                    name: props.validation.name,
                    value: option?.value ?? '',
                }
            };
            props.validation.onChange(fakeEvent);
            return;
        }
        // otherwise do nothing
    };

    return (
        <div style={props?.parentStyle ?? {}}>
            <FormGroup>
                {props?.noName ? null :
                    <Label>{`${translate(props?.name ?? "")}`}<span className="text-danger">{props?.required ? "*" : ""}</span></Label>
                }

                <Select
                    styles={{ ...customStyles }}
                    placeholder=""
                    // don't spread props.validation (it may conflict with react-select)
                    // pass name so Formik can identify the field if needed
                    name={props.validation?.name}
                    value={getValue()}
                    {...props.inputProps}
                    onChange={handleChange}
                    options={normalizedOptions}
                />

                {props?.metaProps?.error ? (
                    <div style={{ color: 'red' }}>{props?.metaProps?.error}</div>
                ) : null}
            </FormGroup>
        </div>
    );
};

export default InputSelect;
