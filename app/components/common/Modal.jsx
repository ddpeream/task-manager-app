// src/components/common/Modal.jsx
import { ModalContainer, FormContainer } from './style/Modal.styles';

const Modal = ({ children, isOpen, onClose }) => {
  console.log('El modal se abrió:', isOpen);
  if (!isOpen) return null;

  return (
    <ModalContainer onClick={onClose}>
      <FormContainer onClick={(e) => e.stopPropagation()}>
        {children}
      </FormContainer>
    </ModalContainer>
  );
};

export default Modal;