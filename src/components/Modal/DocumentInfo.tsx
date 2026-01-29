import { translate } from '@@/locales/translate';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '@@/components/Common/Loader';
import { Button, Card, CardBody } from 'reactstrap';
import { colors } from '../Common/Colors';
import { Icons } from '../Common/Icons';
import { downloadFile } from '@@/store/actions';
import { buildShamcarRequest } from '@@/helpers/buildRequest';
import { RootState } from '@@/store';
import { previewFileGetMethod } from '@@/helpers/api_helper';
import { DOWNLOAD_FILE } from '@@/helpers/url_helper';
type Props = {
  preview?: string;
  handleClick?: () => void;
  label?: string;
  showDelete?: boolean;
  ind?: number;
  file?: File;
  downloadable?: boolean;
  loader?: boolean;
};

const DocumentInfo = ({
  ind,
  preview,
  file,
  handleClick,
  label,
  showDelete = true,
  downloadable = false,
  loader = false,
}: Props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.File.loading);

  const [blob, setBlob] = useState<any>(undefined);

  const getFileBlob = async () => {
    let result: any = null;
    if (downloadable) {
      const blb = await previewFileGetMethod(DOWNLOAD_FILE.replace(":id", preview ?? ""));
      if (blb && blb.type.startsWith("image/"))
        result = URL.createObjectURL(blb)
    }
    else if (file && file.type.startsWith("image/"))
      result = URL.createObjectURL(file);
    setBlob(result);
    return () => {
      if (result)
        URL.revokeObjectURL(result);
    }
  }
  useEffect(() => {
    getFileBlob()
  }, [])
  return (
    <Loader loading={loader ? loading : false}>
      <Card className="border border-2 mb-1">
        <CardBody>
          <div className="d-flex align-items-center justify-content-between">
            <p className="m-0" style={{ fontWeight: '700' }}>
              {blob &&
                <img
                  className="m-1"
                  style={{ borderRadius: '4px' }}
                  width={"50px"}
                  height={"50px"}
                  src={blob}
                  alt={file?.name}
                />}
              {file?.name || translate(label)} {ind !== undefined && ind + 1}
              { }
            </p>
            <div className="d-flex align-items-center gap-1">
              {downloadable ? (
                <Button
                  className="btn-soft-primary d-flex align-items-center justify-content-center"
                  style={{ width: '37px', height: '37px' }}
                  onClick={() =>
                    dispatch(downloadFile(buildShamcarRequest({ id: preview! })))
                  }
                >
                  <i className={Icons.show} style={{ fontSize: '1.3rem' }} />
                </Button>
              ) : (
                <a
                  href={preview!}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    textDecoration: 'null',
                    color: 'primary',
                    fontWeight: 'bold',
                  }}
                >
                  <i className={`${Icons.show} font-size-22`} />
                </a>
              )}

              {showDelete && (
                <a
                  style={{
                    textDecoration: 'null',
                    color: 'primary',
                    fontWeight: 'bold',
                  }}
                >
                  <i
                    className={`${Icons.delete} font-size-22`}
                    style={{ color: colors.danger }}
                    onClick={handleClick}
                  />
                </a>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </Loader>
  );
};

export default DocumentInfo;
