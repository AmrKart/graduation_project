import React from 'react';
import { Button, Spinner } from 'reactstrap';
import PropTypes from 'prop-types';

const LoadingButton = ({
  disabled = false,
  isLoading = false,
  color = 'primary',

  ...props
}) => {
  return (
    <Button color={color} disabled={isLoading || disabled} {...props}>
      <span>{props.children}</span>
      {isLoading ? (
        <Spinner style={{ marginInline: '10px' }} size="sm" />
      ) : props?.icon ? (
        <i className={`mx-1  font-size-18 ${props.icon}`}></i>
      ) : null}
    </Button>
  );
};

LoadingButton.propTypes = {
  isLoading: PropTypes.bool,
};

export { LoadingButton };
