import useStores from "../../../stores/useStores";
import { useEffect, useState } from "react";
import { OrderConfirmation } from "..";

export const useOrderConfirmation = () => {
  const [showModal, setShowModal] = useState(false);
  const {
    orderStore: { orderPreview },
  } = useStores();
  useEffect(() => {
    if (orderPreview === "loaded") {
      setShowModal(true);
    }
  }, [orderPreview]);

  return {
    showModal,
    setShowModal,
    modal: showModal ? (
      <OrderConfirmation onClose={() => setShowModal(false)} />
    ) : null,
  };
};
