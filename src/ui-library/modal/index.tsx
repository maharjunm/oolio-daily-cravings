import { useRef } from "react";
import { ModalOverlay } from "./styles";

export const Modal = ({
  isVisible,
  onClose,
  children,
}: {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  const overlayRef = useRef(null);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <ModalOverlay
      ref={overlayRef}
      className={isVisible ? "visible" : ""}
      onClick={handleOverlayClick}
    >
      {children}
    </ModalOverlay>
  );
};
