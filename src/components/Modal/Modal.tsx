import React from 'react';
import ReactDOM from 'react-dom';

import './Modal.styles.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div
            className='modal-container'
            onClick={onClose}>
            <div
                className='modal-panel'
                onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    className='modal-close'>
                    &times;
                </button>
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Modal;