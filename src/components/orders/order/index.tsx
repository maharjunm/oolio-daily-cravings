import { theme } from "../../../assets/styles/theme";
import type { Product } from "../../../stores/productsStore/types";
import { Flex } from "../../../ui-library/flex";
import { BaseText, XSmallText } from "../../../ui-library/typography";
import { BreakLine, Icon, ItemContainer } from "../styles";

export const Order = ({
  isLast,
  item,
  count,
  price,
}: {
  isLast: boolean;
  item: Product;
  count: number;
  price: number;
}) => {
  return (
    <Flex flexDirection="column">
      <ItemContainer
        isLast={isLast}
        flexGrow
        justifyContent="space-between"
        alignItemsCenter
      >
        <Flex gap="0.5rem">
          <img height={"48px"} width={"48px"} src={item.image.desktop} />
          <Flex flexDirection="column" gap="0.25rem">
            <XSmallText fontWeight={600}>{item.name}</XSmallText>
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
                  ${item.price}
                </XSmallText>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <BaseText fontWeight={600}>${price}</BaseText>
      </ItemContainer>
      {isLast ? null : <BreakLine alignSelfCenter />}
    </Flex>
  );
};
