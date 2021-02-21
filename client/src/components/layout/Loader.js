import React from 'react';
import loader from '../../img/loader.gif';

const Loader = () => {
  return (
    <div className="loader__container">
      <img className="loader__img" src={loader} alt="Loading..." />
    </div>
  );
};

export default Loader;
