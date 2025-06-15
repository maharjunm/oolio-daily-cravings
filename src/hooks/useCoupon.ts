import { COUPON_CODES } from "../stores/cartStore";
import useStores from "../stores/useStores";

export const useCoupon = () => {
  const {
    cartStore: {
      coupon,
      updateMessage,
      applyCoupon,
      totalCartItems,
      discountedProduct,
    },
  } = useStores();
  const applyDiscount = () => {
    applyCoupon();
    switch (coupon.code.toUpperCase()) {
      case COUPON_CODES.HAPPYHOURS:
        updateMessage(
          "successMessage",
          `Coupon code ${COUPON_CODES.HAPPYHOURS} applied: 18% off!`
        );
        updateMessage("errorMessage", "");
        break;
      case COUPON_CODES.BUYGETONE:
        if (totalCartItems < 2) {
          updateMessage(
            "errorMessage",
            `Add at least two items to use ${COUPON_CODES.BUYGETONE}`
          );
          updateMessage("successMessage", "");
          return;
        }
        updateMessage(
          "successMessage",
          `Coupon code ${COUPON_CODES.BUYGETONE} applied: ${discountedProduct?.name} is free!`
        );
        updateMessage("errorMessage", "");
        break;
      default:
        updateMessage("errorMessage", "Invalid Coupon Code");
        updateMessage("successMessage", "");
        break;
    }
  };
  return {
    applyDiscount,
  };
};
