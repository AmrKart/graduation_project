import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

const Loader = (props: { loading: boolean; children?: any }) => {
  return (
    <Row>
      <Col>
        <div style={{ position: 'relative' }}>
          {!!props.loading && (
            <div
              className="d-flex align-items-center justify-content-center loader"
              style={{
                position: 'absolute',
                left: '0',
                right: '0',
                top: '0',
                bottom: '0',
                background: '#eff2f799',
                zIndex: '1',
              }}
            >
              <i
                className="bx bx-loader bx-spin"
                style={{ fontSize: '25px' }}
              ></i>
            </div>
          )}
          {props.children}
        </div>
      </Col>
    </Row>
  );
};

export default Loader;
