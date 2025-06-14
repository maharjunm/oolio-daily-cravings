import Img from "../../../assets/icons/img";
import { H2, SmallText } from "../../../ui-library/typography";
import { CartContainer, EmptyCartContainer } from "./styles";

export const Cart = () => {
  return (
    <CartContainer>
      <H2>Your Cart (0)</H2>
      <EmptyCartContainer centered flexDirection="column" gap="0.5rem">
        <Img height={121} width={101} name="empty-cart" />
        <SmallText fontWeight={600} color="#988A87">
          Your added items will appear here
        </SmallText>
      </EmptyCartContainer>
    </CartContainer>
  );
};
