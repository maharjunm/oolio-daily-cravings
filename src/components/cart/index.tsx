import { CartItem } from "./cartItem";
import { CartCouponCode } from "./cartCouponCode";
import {
  CartContainer,
  DeliveryTypeContainer,
  EmptyCartContainer,
  ItemsContainer,
} from "./styles";
import { H2, SmallText, XSmallText } from "../../ui-library/typography";
import Img from "../../assets/icons/img";
import { theme } from "../../assets/styles/theme";
import { Flex } from "../../ui-library/flex";
import { Button } from "../../ui-library/button";
import { observer } from "mobx-react";
import useStores from "../../stores/useStores";
import { OrderTotal } from "../common/orderTotal";

export const Cart = observer(() => {
  const {
    cartStore: {
      totalCartItems,
      cartItems,
      removeItemFromCart,
      totalValueOfCartItems,
    },
    productsStore: { getProductById },
    orderStore: { placeOrder, orderPreview },
  } = useStores();
  const cartItemsIds = Object.keys(cartItems || {});
  return (
    <CartContainer flexDirection="column" gap="0.5rem">
      <H2>Your Cart ({totalCartItems})</H2>
      {totalCartItems === 0 ? (
        <EmptyCartContainer centered flexDirection="column" gap="0.5rem">
          <Img height={121} width={101} name="empty-cart" />
          <SmallText fontWeight={600} color="#988A87">
            Your added items will appear here
          </SmallText>
        </EmptyCartContainer>
      ) : (
        <ItemsContainer flexDirection="column">
          {Object.keys(cartItems || {}).map((id, index) => {
            const isLast = index === cartItemsIds.length - 1;
            const item = getProductById(id);
            if (item) {
              return (
                <CartItem
                  removeItemFromCart={() => removeItemFromCart(id)}
                  {...item}
                  count={cartItems ? cartItems[id] : 0}
                  isLast={isLast}
                />
              );
            } else {
              return null;
            }
          })}
        </ItemsContainer>
      )}
      {totalCartItems !== 0 && (
        <>
          <OrderTotal total={totalValueOfCartItems} />
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
            <Button
              onClick={placeOrder}
              disabled={totalCartItems === 0 || orderPreview === "loading"}
              name="Confirm Your Order"
              isPrimary
            />
          </Flex>
        </>
      )}
    </CartContainer>
  );
});
