import Img from "../../../assets/icons/img";
import { theme } from "../../../assets/styles/theme";
import { Button } from "../../../ui-library/button";
import { Flex } from "../../../ui-library/flex";
import {
  H2,
  H3,
  SmallText,
  XSmallText,
} from "../../../ui-library/typography";
import { CartItem } from "./cartItem";
import { CartCouponCode } from "./cartCouponCode";
import {
  CartContainer,
  DeliveryTypeContainer,
  EmptyCartContainer,
  ItemsContainer,
  OrderTotalContainer,
} from "./styles";

const items = [
  {
    img: "product",
    name: "Classic Tiramisu",
    price: 5.5,
    count: 1,
  },
  {
    img: "product",
    name: "Classic Tiramisu",
    price: 5.5,
    count: 1,
  },
  {
    img: "product",
    name: "Classic Tiramisu",
    price: 5.5,
    count: 1,
  },
  {
    img: "product",
    name: "Classic Tiramisu",
    price: 5.5,
    count: 1,
  },
  {
    img: "product",
    name: "Classic Tiramisu",
    price: 5.5,
    count: 1,
  },
  {
    img: "product",
    name: "Classic Tiramisu",
    price: 5.5,
    count: 1,
  },
  {
    img: "product",
    name: "Classic Tiramisu",
    price: 5.5,
    count: 1,
  },
  {
    img: "product",
    name: "Classic Tiramisu",
    price: 5.5,
    count: 1,
  },
  {
    img: "product",
    name: "Classic Tiramisu",
    price: 5.5,
    count: 1,
  },
];
export const Cart = () => {
  return (
    <CartContainer flexDirection="column" gap="0.5rem">
      <H2>Your Cart ({items.length})</H2>
      {items.length === 0 ? (
        <EmptyCartContainer centered flexDirection="column" gap="0.5rem">
          <Img height={121} width={101} name="empty-cart" />
          <SmallText fontWeight={600} color="#988A87">
            Your added items will appear here
          </SmallText>
        </EmptyCartContainer>
      ) : (
        <ItemsContainer flexDirection="column">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return <CartItem {...item} isLast={isLast} />;
          })}
        </ItemsContainer>
      )}
      <OrderTotalContainer
        flexGrow
        alignItemsCenter
        justifyContent="space-between"
      >
        <XSmallText color={theme.colorTextDescription} fontWeight={600}>
          Order Total
        </XSmallText>
        <H3 color={theme.orderTotalColor}>$46.50</H3>
      </OrderTotalContainer>

      <CartCouponCode />
      <DeliveryTypeContainer alignSelfCenter centered gap="0.25rem">
        <Img name="tree" />
        <XSmallText
          color={theme.colorTextDescriptionSecondary}
          fontWeight={600}
        >
          This is a
        </XSmallText>
        <XSmallText
          color={theme.colorTextDescriptionSecondary}
          fontWeight={700}
        >
          carbon-neutral
        </XSmallText>
        <XSmallText
          color={theme.colorTextDescriptionSecondary}
          fontWeight={600}
        >
          delivery
        </XSmallText>
      </DeliveryTypeContainer>
      <Flex flexGrow justifyContentCenter>
        <Button name="Confirm Your Order" isPrimary />
      </Flex>
    </CartContainer>
  );
};
