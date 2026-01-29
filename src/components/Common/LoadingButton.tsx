import React from 'react';
import { Button, Spinner } from 'reactstrap';
import PropTypes from 'prop-types';

const LoadingButton = ({ disabled = false, isLoading = false, ...props }) => {
  return (
    <Button color="primary" disabled={isLoading || disabled} {...props}>
      <span>{props.children}</span>
      {isLoading ? (
        <Spinner style={{ marginInline: '10px' }} size="sm" />
      ) : null}
    </Button>
  );
};

LoadingButton.propTypes = {
  isLoading: PropTypes.bool,
};

export { LoadingButton };
