import { Modal } from 'bootstrap';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

Modal = ({ show, onClose, children, title }) => {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    const handleCloseClick = (e) => {
        e.preventDefault();
        onClose();
    };

    const modalContent = show ? (
        <div className="StyledModalOverlay">
            <div className="StyledModal">
                <div className="StyledModalHeader">
                    <a href="#" onClick={handleCloseClick}>
                        x
                    </a>
                </div>
                {title && <div className="StyledModalTitle">{title}</div>}
                <div className="StyledModalBody">{children}</div>
            </div>
        </div>
    ) : null;

    if (isBrowser) {
        return ReactDOM.createPortal(
            modalContent,
            document.getElementById('modal-root')
        );
    } else {
        return null;
    }
};

export default Modal;
