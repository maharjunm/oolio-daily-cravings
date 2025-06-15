import { observer } from "mobx-react";
import Img from "../../assets/icons/img";
import { theme } from "../../assets/styles/theme";
import { Button } from "../../ui-library/button";
import { Modal } from "../../ui-library/modal";
import { BaseText, H1, SmallText } from "../../ui-library/typography";
import { BreakLine, Container, ItemsContainer, OrderContainer } from "./styles";
import useStores from "../../stores/useStores";
import { OrderTotal } from "../common/orderTotal";
import { Order } from "./order";

export const OrderConfirmation = observer(
  ({ onClose }: { onClose: () => void }) => {
    const { orderStore, cartStore, productsStore } = useStores();
    const onModalClose = () => {
      orderStore.resetStore();
      cartStore.resetStore();
      onClose();
    };
    return (
      <Modal onClose={onModalClose} isVisible>
        <Container flexDirection="column" gap="1rem">
          <div>
            <Img name="tick" height="42px" width="42px" />
            <H1>Order Confirmed</H1>
            <SmallText color={theme.colorTextDescription}>
              We hope you enjoy your food!
            </SmallText>
          </div>
          <OrderContainer flexDirection="column">
            <ItemsContainer flexDirection="column">
              {Object.keys(cartStore.cartItems || {}).map((id, index) => {
                const isLast =
                  index === Object.keys(cartStore.cartItems || {}).length - 1;
                const item = productsStore.getProductById(id);
                if (item) {
                  return (
                    <Order
                      isLast={isLast}
                      item={item}
                      count={
                        cartStore?.cartItems ? cartStore?.cartItems[id] : 0
                      }
                      price={
                        cartStore?.cartItems
                          ? cartStore?.cartItems[id] * item.price
                          : 0
                      }
                    />
                  );
                } else {
                  return null;
                }
              })}
            </ItemsContainer>
            <BreakLine alignSelfCenter />
            <OrderTotal
              disountedTotal={
                cartStore.validCoupon ? cartStore.disountedTotal : ""
              }
              total={cartStore.totalValueOfCartItems}
            />
          </OrderContainer>
          <Button
            height="30px"
            isPrimary
            onClick={onModalClose}
            name={
              <BaseText color={theme.buttonTextPrimary}>
                Start New Order
              </BaseText>
            }
          />
        </Container>
      </Modal>
    );
  }
);
