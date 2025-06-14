import { observer } from "mobx-react";
import Img, { type IconNames } from "../../../assets/icons/img";
import { theme } from "../../../assets/styles/theme";
import { Button } from "../../../ui-library/button";
import { Flex } from "../../../ui-library/flex";
import {
  BaseText,
  SmallText,
  XSmallText,
} from "../../../ui-library/typography";
import { ButtonContainer, IconContainer, ProductContainer } from "./styles";

interface Props {
  id: string;
  name: string;
  category: string;
  price: number;
  image: {
    desktop: string;
    thumbnail: string;
    tablet: string;
    mobile: string;
  };
  isSelected?: boolean;
  decreaseCartItemCount: () => void;
  increaseCartItemCount: () => void;
  count: number;
  disabled: boolean;
}

export const Product = observer((props: Props) => {
  const {
    name,
    category,
    price,
    image,
    isSelected,
    increaseCartItemCount,
    decreaseCartItemCount,
    count,
    disabled,
  } = props;

  return (
    <Flex flexDirection="column" gap="1.5rem">
      <ProductContainer
        isSelected={!!isSelected}
        flexDirection="column"
        gap="1rem"
      >
        <img src={image.desktop} />
        <ButtonContainer justifyContentCenter>
          <Button
            disabled={disabled}
            height="44px"
            width="160px"
            isPrimary={isSelected}
            onClick={!isSelected ? increaseCartItemCount : () => {}}
            name={
              isSelected ? (
                <Flex flexGrow justifyContent="space-between">
                  <IconContainer onClick={decreaseCartItemCount} centered>
                    <SmallText color="white">-</SmallText>
                  </IconContainer>
                  <SmallText color="white">{count}</SmallText>
                  <IconContainer onClick={increaseCartItemCount} centered>
                    <SmallText color="white">+</SmallText>{" "}
                  </IconContainer>
                </Flex>
              ) : (
                <Flex centered gap="0.5rem">
                  <Img name="add-cart" />
                  <BaseText color={theme.colorTextPrimary}>
                    Add to Cart
                  </BaseText>
                </Flex>
              )
            }
          />
        </ButtonContainer>
      </ProductContainer>
      <Flex flexDirection="column">
        <XSmallText color={theme.colorTextDescription} fontWeight={600}>
          {category}
        </XSmallText>
        <BaseText color={theme.colorTextPrimary} fontWeight={600}>
          {name}
        </BaseText>
        <BaseText color={theme.buttonTextPrimary} fontWeight={600}>
          ${price}
        </BaseText>
      </Flex>
    </Flex>
  );
});
