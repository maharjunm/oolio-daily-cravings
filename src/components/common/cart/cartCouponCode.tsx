import { useState } from "react";
import { BaseText } from "../../../ui-library/typography";
import { theme } from "../../../assets/styles/theme";
import { Flex } from "../../../ui-library/flex";
import { Button } from "../../../ui-library/button";
import { Input } from "../../../ui-library/input";

export const CartCouponCode = () => {
  const [couponCode, setCouponCode] = useState("");

  return (
    <Flex flexDirection="column" alignSelfCenter>
      <BaseText color={theme.colorTextPrimary}>Have a coupon code?</BaseText>
      <Flex alignItemsCenter className="input-group" gap="0.5rem">
        <Input
          placeholder="Enter coupon code"
          value={couponCode}
          updateValue={setCouponCode}
        />
        <Button borderRadius="8px" name="Apply" height="30px" width="100px" isPrimary />
      </Flex>
    </Flex>
  );
};
