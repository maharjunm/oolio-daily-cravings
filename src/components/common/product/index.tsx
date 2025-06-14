import Img from "../../../assets/icons/img";
import { theme } from "../../../assets/styles/theme";
import { Button } from "../../../ui-library/button";
import { Flex } from "../../../ui-library/flex";
import { BaseText, SmallText } from "../../../ui-library/typography";
import { ButtonContainer, IconContainer, ProductContainer } from "./styles";

export const Product = () => {
  const isSelected = true;
  return (
    <ProductContainer isSelected={isSelected} flexDirection="column" gap="1rem">
      <Img name="product" />
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
                <BaseText color={theme.colorTextPrimary}>Add to Cart</BaseText>
              </Flex>
            )
          }
        />
      </ButtonContainer>
    </ProductContainer>
  );
};
