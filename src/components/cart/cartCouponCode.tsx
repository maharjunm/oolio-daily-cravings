import { Flex } from "../../ui-library/flex";
import { BaseText } from "../../ui-library/typography";
import { theme } from "../../assets/styles/theme";
import { Input } from "../../ui-library/input";
import { Button } from "../../ui-library/button";
import { observer } from "mobx-react";
import useStores from "../../stores/useStores";
import { COUPON_CODES } from "../../stores/cartStore";

export const CartCouponCode = observer(() => {
  const {
    cartStore: {
      coupon,
      updateMessage,
      applyCoupon,
      totalCartItems,
      discountedProduct,
    },
  } = useStores();
  const { errorMessage, code, successMessage } = coupon;
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

  return (
    <Flex flexDirection="column" alignSelfCenter>
      <BaseText color={theme.colorTextPrimary}>Have a coupon code?</BaseText>
      <Flex alignItemsCenter className="input-group" gap="0.5rem">
        <Input
          placeholder="Enter coupon code"
          value={code}
          updateValue={(value) => updateMessage("code", value)}
        />
        <Button
          onClick={applyDiscount}
          borderRadius="8px"
          name="Apply"
          height="30px"
          width="100px"
          isPrimary
        />
      </Flex>
      {errorMessage && <BaseText color="red">{errorMessage}</BaseText>}
      {successMessage && <BaseText color="green">{successMessage}</BaseText>}
    </Flex>
  );
});
