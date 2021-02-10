import React from 'react';
import svgIcon from '../../img/sprite.svg';
import PropTypes from 'prop-types';

const SvgIcon = ({ name, color, width, height }) => {
  return (
    <svg
      className={`icon icon--${name}`}
      fill={color}
      width={width}
      height={height}
    >
      <use xlinkHref={`${svgIcon}#icon-${name}`}></use>
    </svg>
  );
};

SvgIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default SvgIcon;
