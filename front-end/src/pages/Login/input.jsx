import PropTypes from 'prop-types';
import React from 'react';

function Input({ className, type, id, onChange, value }) {
  return (
    <label htmlFor={ id }>
      <input
        className={ className }
        type={ type }
        id={ id }
        data-testid={ id }
        onChange={ onChange }
        value={ value }
      />
    </label>
  );
}

Input.propTypes = {
  className: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Input;
