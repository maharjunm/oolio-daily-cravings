import { observer } from "mobx-react";
import Img from "../../assets/icons/img";
import { theme } from "../../assets/styles/theme";
import { Button } from "../../ui-library/button";
import { Flex } from "../../ui-library/flex";
import { Modal } from "../../ui-library/modal";
import {
  BaseText,
  H1,
  SmallText,
  XSmallText,
} from "../../ui-library/typography";
import {
  BreakLine,
  Container,
  Icon,
  ItemContainer,
  ItemsContainer,
  OrderContainer,
} from "./styles";
import useStores from "../../stores/useStores";
import { OrderTotal } from "../common/orderTotal";

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
                    <Flex flexDirection="column">
                      <ItemContainer
                        isLast={isLast}
                        flexGrow
                        justifyContent="space-between"
                        alignItemsCenter
                      >
                        <Flex gap="0.5rem">
                          <img
                            height={"48px"}
                            width={"48px"}
                            src={item.image.desktop}
                          />
                          <Flex flexDirection="column" gap="0.25rem">
                            <XSmallText fontWeight={600}>
                              {item.name}
                            </XSmallText>
                            <Flex alignItemsCenter gap="0.5rem">
                              <BaseText
                                color={theme.countTextColor}
                                fontWeight={600}
                              >
                                {cartStore?.cartItems
                                  ? cartStore?.cartItems[id]
                                  : ""}
                                x
                              </BaseText>
                              <Flex alignItemsCenter>
                                <Icon
                                  color={theme.colorTextDescriptionSecondary}
                                  fontWeight={600}
                                >
                                  @
                                </Icon>
                                <XSmallText
                                  color={theme.colorTextDescriptionSecondary}
                                  fontWeight={600}
                                >
                                  ${item.price}
                                </XSmallText>
                              </Flex>
                            </Flex>
                          </Flex>
                        </Flex>
                        <BaseText fontWeight={600}>
                          $
                          {cartStore?.cartItems
                            ? cartStore?.cartItems[id] * item.price
                            : 0}
                        </BaseText>
                      </ItemContainer>
                      {isLast ? null : <BreakLine alignSelfCenter />}
                    </Flex>
                  );
                } else {
                  return null;
                }
              })}
            </ItemsContainer>
            <BreakLine alignSelfCenter />
            <OrderTotal total={cartStore.totalValueOfCartItems} />
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
