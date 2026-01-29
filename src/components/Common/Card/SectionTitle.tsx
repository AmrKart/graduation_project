import { JObject } from '@@/common/types/json';
import TextButton from '@@/components/Button/TextButton';
import { translate } from '@@/locales/translate';
import React, { ReactNode } from 'react';

export interface props {
    title: string;
    color?: string;
    bgColor?: string;
    additionalStyle?: JObject
    isHeader?: boolean,
}
export const SectionTitle = (props: props) => {
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: props.bgColor ? props.bgColor : '#FFFFFFFF',
                    padding: "10px",
                    ...props.additionalStyle,
                    ...props.isHeader ? { fontSize: "16px" } : {}


                }}
            >
                <p style={{ fontWeight: "600", color: props.color ?? '', margin: "3px" }}>
                    {translate(props.title)}
                </p>
            </div >
        </>
    );
};
export default SectionTitle;
