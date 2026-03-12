import React from 'react';

const LoadingSpinner = ({ size = 'medium' }) => {
  return <div className={`spinner spinner-${size}`} aria-label="Loading" />;
};

export default LoadingSpinner;

