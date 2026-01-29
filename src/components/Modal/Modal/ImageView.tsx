import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '@@/components/Common/Loader';
import { Card, CardBody } from 'reactstrap';
import { translate } from '@@/locales/translate';

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

const ImageView = ({
  preview,
  file,
  downloadable = false,
  loader = false,
}: Props) => {
  const loading = useSelector((state: RootState) => state.File.loading);

  const [blob, setBlob] = useState<any>(undefined);

  const getFileBlob = async () => {
    let result: any = null;
    if (downloadable) {
      const blb = await previewFileGetMethod(
        DOWNLOAD_FILE.replace(':id', preview ?? '')
      );
      if (blb && blb.type.startsWith('image/'))
        result = URL.createObjectURL(blb);
    } else if (file && file.type.startsWith('image/'))
      result = URL.createObjectURL(file);
    setBlob(result);
    return () => {
      if (result) URL.revokeObjectURL(result);
    };
  };
  useEffect(() => {
    getFileBlob();
  }, []);
  return (
    <Loader loading={loader ? loading : false}>
      <Card
        className="border border-2 mb-1 rounded-3"
        style={{ display: 'inline-block', width: 'fit-content' }}
      >
        <div className="d-flex align-items-center justify-content-center">
          {blob ? (
            <img
              className="m-1"
              style={{
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out',
              }}
              width={'130px'}
              height={'180px'}
              src={blob}
              alt={file?.name}
              onClick={() => window.open(blob, '_blank')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
              title={translate('image.preview')}
            />
          ) : (
            <div
              className="m-1 d-flex flex-column align-items-center justify-content-center position-relative"
              style={{
                width: '130px',
                height: '180px',
                borderRadius: '8px',
                backgroundColor: '#f8f9fa',
                border: '2px dashed #e9ecef',
                overflow: 'hidden',
              }}
            >
              {/* Animated loading background */}
              <div
                className="position-absolute w-100 h-100"
                style={{
                  background:
                    'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'loading 1.5s infinite',
                  opacity: 0.6,
                }}
              />

              {/* Icon and text container */}
              <div
                className="text-center position-relative"
                style={{ zIndex: 1 }}
              >
                <div
                  className="mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}
                >
                  <i
                    className="fas fa-image text-muted"
                    style={{ fontSize: '20px' }}
                  />
                </div>
                <div
                  className="text-muted fw-medium"
                  style={{ fontSize: '12px', lineHeight: '1.2' }}
                >
                  {translate('image.loading')}
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* CSS Animation */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `,
        }}
      />
    </Loader>
  );
};

export default ImageView;
