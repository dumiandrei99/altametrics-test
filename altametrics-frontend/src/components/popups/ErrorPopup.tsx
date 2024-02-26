// src/components/ErrorPopup.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { clearError } from '../../state/slices/errorSlice';

const ErrorPopup: React.FC = () => {
  const errorMessage = useSelector((state: RootState) => state.error.message);
  const dispatch = useDispatch<AppDispatch>();

  if (!errorMessage) return null;

  const handleClose = () => {
    dispatch(clearError());
  };

  return (
    <div className="error-popup">
      <h3>Error</h3>
      <p>Message: {errorMessage}</p>
      <button onClick={handleClose}>Close</button>
    </div>
  );
};

export default ErrorPopup;
