import { JObject } from '../../common/types/json';
import { translate } from '@@/locales/translate';
import React from 'react';
import { Button } from 'reactstrap';
import { colors } from '../Common/Colors';

export interface props {
  title: string;
  icon?: string;
  fontColor?: string;
  onClick: () => void;
  color?: string;
  customeStyle?: JObject;
  customeProps?: JObject;
}
const TextButton = (props: props) => {
  return (
    <>
      <Button
        color={props.color ?? 'white'}
        onClick={props.onClick}
        {...props.customeProps}
        style={props.customeStyle ? { ...props.customeStyle } : {}}
      >
        {props.icon && (
          <i
            className={`mx-1 align-middle ${props.icon} `}
            style={{
              color: props.fontColor ?? colors.primary,
              fontWeight: 'bold',
              marginBottom: '2px',
            }}
          ></i>
        )}

        <span
          style={{
            fontWeight: 'bold',
            color: props.fontColor ?? colors.primary,
          }}
        >
          {translate(props.title)}
        </span>
      </Button>
    </>
  );
};
export default TextButton;
