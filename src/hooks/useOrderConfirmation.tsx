
import { useEffect, useState } from "react";
import { OrderConfirmation } from "../components/orders";
import useStores from "../stores/useStores";

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
