import React from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { translate } from '@@/locales/translate';
import { LoadingButton } from '../Button/LoadingButton';

type Props = {
  isOpen: boolean;
  setOpen: (val: any) => void;
  children?: any;
  title?: string;
  onConfirm: () => void;
  loading?: boolean;
};

export default function ConfirmModal({
  isOpen,
  setOpen,
  title,
  children,
  loading,
  onConfirm,
}: Props) {
  return (
    <Modal
      scrollable
      centered
      isOpen={isOpen}
      size={'md'}
      toggle={() => setOpen(false)}
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
          {title ? translate(title) : translate('confirm.modal.title')}
        </p>
      </div>

      <ModalBody style={{ minHeight: '100px' }}>
        {children ? children : translate('confirm.modal')}
      </ModalBody>
      <ModalFooter className="justify-content-end px-3 py-2">
        <Button
          className="m-1 mx-2 btn btn-danger"
          color="white"
          onClick={() => setOpen(false)}
        >
          <span style={{ color: 'white', fontWeight: 'bold' }}>
            {translate('closeModal')}
          </span>
        </Button>

        <LoadingButton
          isLoading={loading}
          className="m-0 mx-2 btn btn-success"

          color="success"
          onClick={() => {
            onConfirm();
            setOpen(undefined);
          }}
        >
          <span style={{fontWeight: 'bold'}}>{translate('confirm')}</span>
        </LoadingButton>
      </ModalFooter>
    </Modal>
  );
}
