import { Flex } from "../../ui-library/flex";
import { BaseText } from "../../ui-library/typography";
import { theme } from "../../assets/styles/theme";
import { Input } from "../../ui-library/input";
import { Button } from "../../ui-library/button";
import { observer } from "mobx-react";
import useStores from "../../stores/useStores";
import { useCoupon } from "../../hooks/useCoupon";

export const CartCouponCode = observer(() => {
  const { applyDiscount } = useCoupon();
  const {
    cartStore: { coupon, updateMessage },
  } = useStores();
  const { errorMessage, code, successMessage } = coupon;

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
