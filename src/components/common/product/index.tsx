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
  name: string;
  type: string;
  price: number;
  img: string;
  isSelected?: boolean;
}

export const Product = (props: Props) => {
  const { name, type, price, img, isSelected } = props;

  return (
    <Flex flexDirection="column" gap="1.5rem">
      <ProductContainer
        isSelected={!!isSelected}
        flexDirection="column"
        gap="1rem"
      >
        <Img name={img as IconNames} />
        <ButtonContainer justifyContentCenter>
          <Button
            height="44px"
            width="160px"
            isPrimary={isSelected}
            name={
              isSelected ? (
                <Flex flexGrow justifyContent="space-between">
                  <IconContainer centered>
                    <SmallText color="white">-</SmallText>
                  </IconContainer>
                  <SmallText color={theme.colorTextSecondary}>2</SmallText>
                  <IconContainer centered>
                    <SmallText color="white">+</SmallText>{" "}
                  </IconContainer>
                </Flex>
              ) : (
                <Flex alignItemsCenter gap="0.5rem">
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
        <XSmallText color={theme.colorTextDescription} fontWeight={600}>{type}</XSmallText>
        <BaseText color={theme.colorTextPrimary} fontWeight={600}>{name}</BaseText>
        <BaseText color={theme.buttonTextPrimary} fontWeight={600}>${price}</BaseText>
      </Flex>
    </Flex>
  );
};
