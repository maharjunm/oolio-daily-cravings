import { observer } from "mobx-react";
import Img from "../../../assets/icons/img";
import { theme } from "../../../assets/styles/theme";
import { Button } from "../../../ui-library/button";
import { Flex } from "../../../ui-library/flex";
import {
  BaseText,
  SmallText,
  XSmallText,
} from "../../../ui-library/typography";
import { ButtonContainer, IconContainer, ProductContainer } from "./styles";
import useBreakpoint from "../../../hooks/useBreakpoint";

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

  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  let imagePreview = image.thumbnail;
  let height = "100px";
  let width = "100px";
  let buttonHeight = "25px";
  let buttonWidth = "120px";
  if (isMobile) {
    height = "150px";
    width = "150px";
    imagePreview = image.mobile;
  } else if (isTablet) {
    height = "200px";
    width = "200px";
    buttonHeight = "35px";
    buttonWidth = "140px";
    imagePreview = image.tablet;
  } else if (isDesktop) {
    buttonHeight = "44px";
    buttonWidth = "140px";
    height = "240px";
    width = "240px";
    imagePreview = image.desktop;
  }

  return (
    <Flex flexDirection="column" gap="1.5rem">
      <ProductContainer
        isTablet={isTablet}
        isMobile={isMobile}
        isSelected={!!isSelected}
        flexDirection="column"
        gap="1rem"
      >
        <img height={height} width={width} src={imagePreview} />
        <ButtonContainer
          isTablet={isTablet}
          isMobile={isMobile}
          justifyContentCenter
        >
          <Button
            disabled={disabled}
            height={buttonHeight}
            width={buttonWidth}
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
                  {isMobile ? (
                    <XSmallText color={theme.colorTextPrimary}>
                      Add to Cart
                    </XSmallText>
                  ) : (
                    <>
                      <Img name="add-cart" />
                      <BaseText color={theme.colorTextPrimary}>
                        Add to Cart
                      </BaseText>
                    </>
                  )}
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
        {isMobile ? (
          <>
            <SmallText color={theme.colorTextPrimary} fontWeight={600}>
              {name}
            </SmallText>
            <SmallText color={theme.buttonTextPrimary} fontWeight={600}>
              ${price}
            </SmallText>
          </>
        ) : (
          <>
            <BaseText color={theme.colorTextPrimary} fontWeight={600}>
              {name}
            </BaseText>
            <BaseText color={theme.buttonTextPrimary} fontWeight={600}>
              ${price}
            </BaseText>
          </>
        )}
      </Flex>
    </Flex>
  );
});
