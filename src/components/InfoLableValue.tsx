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
  isLink?: boolean;
  linkTo?: string;
}

const InfoLabelValue = (props: InfoLabelValue) => {
  let sz = props.sz;
  const { szTitle, szValue } = props;
  if (!sz) sz = 2;
  const customStyle = {
    padding: '0.3rem',
    borderRight: i18n.language === 'ar' ? '1px solid #D5E1F2' : 'none',
    borderLeft: i18n.language === 'en' ? '1px solid #D5E1F2' : 'none',
    ...props.additionalStyle,
  };  

  return (
    <React.Fragment>
      <Col style={customStyle} className={`w-100`} sm={szTitle || sz}>
        <div>
          <p style={{ color: 'rgb(255 255 255 / 80%)', marginBottom: '0.3rem' }}>
            {' '}
            {translate(props.title)}
          </p>
          {!props.isLink && (
            <p
              style={{
                color: props.marked ? colors.success : 'white',
                fontWeight: '700',
                marginBottom: '0.5rem',
              }}
            >
              {props?.value
                ? props?.value
                : props?.value === 0
                  ? 0
                  : translationHelper('not_found')}
            </p>
          )}
          {props.isLink && (
            <Link to={props.linkTo!}>
              <p
                style={{
                  color: props.marked ? colors.success : colors.primary,
                  fontWeight: '700',
                  marginBottom: '0.5rem',
                }}
              >
                {props?.value
                  ? props?.value
                  : translationHelper('not_found')}
              </p>
            </Link>
          )}
        </div>
      </Col>
    </React.Fragment>
  );
};
export default InfoLabelValue;
