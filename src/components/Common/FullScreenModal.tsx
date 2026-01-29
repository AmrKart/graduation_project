import React, { ReactNode, useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { translate, translationHelper } from '@@/locales/translate';
import { LoadingButton } from './LoadingButton';

type Props = {
  isOpen: boolean;
  setOpen: (val: any) => void;
  children: any;
  title?: string;
  action?: any;
  actionIcon?: string;
  closeButton?: boolean;
  loading?: boolean;
  actionTitle?: string;
  actiondisabled?: boolean;
  modalSize?: 'md' | 'lg' | 'xl' | 'xxl';
  otherActions?: ReactNode;
  minHeight?: string;
  fullScreen?: boolean;
};

export default function FullScreenModal({
  isOpen,
  setOpen,
  title,
  children,
  action,
  closeButton,
  loading,
  actionTitle,
  actiondisabled,
  modalSize,
  otherActions,
  actionIcon,
  minHeight,
  fullScreen,
}: Props) {
  const [size, setSize] = useState(fullScreen ? 'xxl' : 'xl');
  return (
    <Modal
      scrollable
      fullscreen={size == 'xl' ? false : true}
      centered
      isOpen={isOpen}
      size={modalSize ?? size}
      // toggle={() => setOpen(false)}
    >
      <div className="w-100 d-flex align-items-center justify-content-between px-3 py-2 border border-bottom">
        <p
          style={{
            margin: '0px',
            fontWeight: '700',
            fontSize: '16px',
            color: 'white',
          }}
        >
          {translate(title) ?? ''}
        </p>
        <Button
          color="primary"
          className="d-flex align-items-center justify-content-center m-0 p-2"
          onClick={() => setSize((prev) => (prev == 'xl' ? 'xxl' : 'xl'))}
        >
          <i
            className={` font-size-20 effect ${
              size == 'xl' ? 'bx bx-expand' : 'bx bx-exit-fullscreen'
            }`}
            style={{ color: 'White', fontWeight: '400' }}
          ></i>
        </Button>
      </div>

      <ModalBody style={{ minHeight: minHeight ? minHeight : '250px' }}>
        {children}
      </ModalBody>

      {closeButton || action ? (
        <ModalFooter className="justify-content-end px-3 py-2">
          {closeButton ? (
            <Button
              className="m-1 mx-2 btn btn-danger"
              color="danger"
              onClick={() => setOpen(false)}
            >
              <span style={{ color: 'white', fontWeight: 'bold' }}>
                {translationHelper('close')}
              </span>
            </Button>
          ) : null}
          {otherActions ?? undefined}
          {action ? (
            <LoadingButton
              disabled={actiondisabled}
              isLoading={loading ?? false}
              className="m-0 mx-2 btn-primary"
              color="success"
              onClick={action}
            >
              <span style={{fontWeight: 'bold'}}>{translate(actionTitle ?? 'save')}</span>
              {actionIcon && (
                <i
                  className={'align-middle font-size-18 mx-1 ' + actionIcon}
                  style={{}}
                ></i>
              )}
            </LoadingButton>
          ) : null}
        </ModalFooter>
      ) : null}
    </Modal>
  );
}
