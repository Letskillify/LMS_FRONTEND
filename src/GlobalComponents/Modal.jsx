import React from 'react';

const Modal = ({ children, onClose }) => {
  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg" role="document">
        {children}
      </div>
    </div>
  );
};

export default Modal; 