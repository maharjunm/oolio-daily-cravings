import Img, { type IconNames } from "../../assets/icons/img";
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

export const OrderConfirmation = () => {
  return (
    <Modal onClose={() => {}} isVisible>
      <Container flexDirection="column" gap="1rem">
        <div>
          <Img name="tick" height="42px" width="42px" />
          <H1>Order Confirmed</H1>
          <SmallText color={theme.colorTextDescription}>
            We hope you enjoy your food!
          </SmallText>
        </div>
        <ItemsContainer flexDirection="column">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <Flex flexDirection="column">
                <ItemContainer
                  isLast={isLast}
                  flexGrow
                  justifyContent="space-between"
                  alignItemsCenter
                >
                  <Flex gap="0.5rem">
                    <Img
                      height={"48px"}
                      width={"48px"}
                      name={item.img as IconNames}
                    />
                    <Flex flexDirection="column" gap="0.25rem">
                      <XSmallText fontWeight={600}>{item.name}</XSmallText>
                      <Flex alignItemsCenter gap="0.5rem">
                        <BaseText color={theme.countTextColor} fontWeight={600}>
                          {item.count}x
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
                    ${item.count * item.price}
                  </BaseText>
                </ItemContainer>
                {!isLast ? <BreakLine alignSelfCenter /> : null}
              </Flex>
            );
          })}
        </ItemsContainer>
        <Button
          height="30px"
          isPrimary
          name={
            <BaseText color={theme.buttonTextPrimary}>Start New Order</BaseText>
          }
        />
      </Container>
    </Modal>
  );
};
