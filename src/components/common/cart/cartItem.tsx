import { theme } from "../../../assets/styles/theme";
import { Flex } from "../../../ui-library/flex";
import { BaseText, XSmallText } from "../../../ui-library/typography";
import { BreakLine, CrossIconContainer, Icon, ItemContainer } from "./styles";

interface Props {
  name: string;
  count: number;
  price: number;
  isLast: boolean;
}

export const CartItem = ({ name, count, price, isLast }: Props) => {
  return (
    <Flex flexDirection="column">
      <ItemContainer flexGrow justifyContent="space-between" alignItemsCenter>
        <Flex gap="0.5rem">
          <Flex flexDirection="column" gap="0.25rem">
            <XSmallText fontWeight={600}>{name}</XSmallText>
            <Flex alignItemsCenter gap="0.5rem">
              <BaseText color={theme.countTextColor} fontWeight={600}>
                {count}x
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
                  ${price}
                </XSmallText>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <CrossIconContainer centered>
          <Icon color={theme.colorBorderSecondary}>{"x"}</Icon>
        </CrossIconContainer>
      </ItemContainer>
      {!isLast ? <BreakLine alignSelfCenter /> : null}
    </Flex>
  );
};
