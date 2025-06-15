import { useState, useEffect, useRef, useCallback } from "react";
import {
  CloseButton,
  DrawerContainer,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
} from "./styles";
import { Cart } from "../../components/cart";


export const ResponsiveOrderSummaryDrawer = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [animationClass, setAnimationClass] = useState("");
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setAnimationClass("visible");
      document.body.classList.add("drawer-open");
    } else {
      setAnimationClass("hidden");
      const timer = setTimeout(() => {
        document.body.classList.remove("drawer-open");
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleOverlayClick = useCallback(
    (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOverlayClick);
    } else {
      document.removeEventListener("mousedown", handleOverlayClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOverlayClick);
    };
  }, [isOpen, handleOverlayClick]);

  return (
    <>
      <DrawerOverlay isVisible={isOpen} />

      <DrawerContainer ref={drawerRef} className={animationClass}>
        <DrawerHeader>
          <DrawerTitle>Order Summary</DrawerTitle>
          <CloseButton onClick={onClose}>x</CloseButton>
        </DrawerHeader>
        <DrawerContent>
          <Cart />
        </DrawerContent>
      </DrawerContainer>
    </>
  );
};
