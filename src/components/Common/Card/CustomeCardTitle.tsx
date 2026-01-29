import TextButton from '../../Button/TextButton';
import { translate } from '@@/locales/translate';
import { RootState } from '@@/store';
import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';

export interface props {
  title: string;
  color?: string;
  noMargin?: boolean;
  actions?: Array<{
    title: string;
    icon?: string;
    disabled?: boolean;
    onClick: () => void;
    hide?: boolean;
    roles?: Array<string>;
  }>;
  content?: ReactNode;
}
export const CustomeCardTitle = (props: props) => {
  const profile = useSelector((state: RootState) => state.Authentication.user);
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <p
          style={{
            fontWeight: '700',
            margin: props?.noMargin ? '0' : '',
            color: props.color ?? '',
          }}
        >
          {translate(props.title)}
        </p>
        <div>
          {props?.content || null}

          {props.actions &&
            props.actions.map((el, idx) => {
              if (el?.hide === true) {
                return null;
              }
              if (el.roles) {
                const userRoles = profile?.user?.roles ?? [];
                const actionRoles = el.roles ?? [];
                if (
                  !userRoles.some((el1: any) =>
                    actionRoles.some((el2) => el2 == el1)
                  )
                ) {
                  return null;
                }
              }
              return (
                <TextButton
                  key={idx}
                  title={el.title}
                  customeStyle={{
                    marginBottom: props?.noMargin ? '0rem' : '1rem',
                    border: 'none',
                  }}
                  fontColor='white'
                  icon={el.icon}
                  onClick={el.onClick}
                  customeProps={{ disabled: el?.disabled }}
                ></TextButton>
              );
            })}
        </div>
      </div>
    </>
  );
};
export default CustomeCardTitle;
