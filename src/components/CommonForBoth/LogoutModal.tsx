import { buildShamcarRequest } from '@@/helpers/buildRequest';
import { getAuthObject } from '@@/helpers/jwt-token-access/auth-token-header';
import { translate } from '@@/locales/translate';
import { RootState } from '@@/store';
import { logout } from '@@/store/actions';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import TextButton from '../Button/TextButton';

type Props = {
  open: boolean;
  setOpen: any;
};

export default function LogoutModal({ open, setOpen }: Props) {
  const getAuth = async () => {
    try {
      const data = await getAuthObject();
      if (data !== null) {
        return data;
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  };
  const dispatch = useDispatch();

  const handleSingleLogoutClick = async () => {
    const authObject = await getAuth();
    dispatch(
      logout(
        buildShamcarRequest({
          logoutOtherSessions: false,
          refreshToken: authObject?.refreshToken,
        })
      )
    );
  };
  const handleAllLogoutClick = async () => {
    const authObject = await getAuth();
    dispatch(
      logout(
        buildShamcarRequest({
          logoutOtherSessions: true,
          refreshToken: authObject?.refreshToken,
        })
      )
    );
  };

  return (
    <Modal isOpen={open} toggle={() => setOpen()}>
      <ModalHeader>{translate('logout')}</ModalHeader>
      <ModalBody>{translate('logoutFromAllSession')}</ModalBody>
      <ModalFooter>
        <div className="d-flex align-items-center justify-content-end gap-1">
          <TextButton
            onClick={() => handleSingleLogoutClick()}
            title={translate('no')}
          />
          <TextButton
            onClick={() => handleAllLogoutClick()}
            title={translate('yes')}
          />
        </div>
      </ModalFooter>
    </Modal>
  );
}
