import { translate } from '@@/locales/translate';

import React from 'react';

import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import DocumentInfo from './DocumentInfo';
import { IFile } from '@@/interfaces/file';

type Props = {
    close: () => void;
    files: Array<IFile>;
    title?: string;
};

function ShowFiles({
    files,
    close,
    title,
}: Props) {
    return (
        <Modal centered isOpen={true} size="lg">
            <div className="w-100 d-flex align-items-center justify-content-between px-3 py-2 border border-bottom">
                <p
                    style={{
                        margin: '0px',
                        fontWeight: '700',
                        fontSize: '16px',
                        color: '#2A3043',
                    }}
                >
                    {title ?? translate("files")}
                </p>
            </div>
            <ModalBody>
                {files?.map((ele, ind) => (
                    <DocumentInfo
                        downloadable={true}
                        ind={ind}
                        key={ele.digitizationReference}
                        showDelete={false}
                        preview={ele.id}
                        label="file"
                    />
                ))}
            </ModalBody>
            <ModalFooter>
                <Button
                    className="m-0 mx-2 btn"
                    color="white"
                    onClick={() => close()}
                >
                    <span style={{ color: '#1B4376', fontWeight: 'bold' }}>
                        {translate('close')}
                    </span>
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default ShowFiles;
