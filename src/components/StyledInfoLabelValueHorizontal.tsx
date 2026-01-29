import i18n from '@@/i18n';
import React from 'react';
import { Col } from 'reactstrap';
import { translate, translationHelper } from '@@/locales/translate';
import { colors } from './Common/Colors';
import { Link } from 'react-router-dom';

interface InfoLabelValue {
    title: string;
    value?: any;
    sz?: number;
    szTitle?: number;
    szValue?: number;
    marked?: boolean;
    additionalStyle?: any;
    additionalValueStyle?: any;
    isLink?: boolean;
    linkTo?: string
    icon?: string;
}

const StyledInfoLabelValueHorizontal = (props: InfoLabelValue) => {
    let sz = props.sz;
    const { szTitle, szValue } = props;
    if (!sz) sz = 2;
    const customStyle = {
        ...props.additionalStyle,
    };
    const additionalValueStyle = {
        ...props.additionalValueStyle,
    };

    return (
        <React.Fragment>
            <Col style={customStyle} className={`w-100`} sm={szTitle || sz}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: i18n.language=='ar' ? 'right': 'left' }}>

                    <p style={{ color: '#3D628D' }}>
                        {props.icon && <img width={18} src={props.icon} alt="" className='me-2' />}{translate(props.title)} : </p>

                    {!props.isLink && <span
                        style={{
                            ...additionalValueStyle,
                            color: props.marked ? colors.success : '#2A3043',
                            fontWeight: '700',
                        }}
                    >
                        {props?.value
                            ? props?.value
                                : translationHelper('not_found')}
                    </span>}

                    {props.isLink &&
                        <Link to={props.linkTo!}>
                            <p
                                style={{
                                    ...additionalValueStyle,
                                    color: props.marked ? colors.success : colors.primary,
                                    fontWeight: '700',
                                }}
                            >
                                {props?.value
                                    ? props?.value
                                        : translationHelper('not_found')}
                            </p>
                        </Link>
                    }
                </div>
            </Col>
        </React.Fragment>
    );
};
export default StyledInfoLabelValueHorizontal;
