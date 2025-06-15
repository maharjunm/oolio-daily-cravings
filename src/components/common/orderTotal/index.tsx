import { theme } from "../../../assets/styles/theme";
import { Flex } from "../../../ui-library/flex";
import { H3, XSmallText } from "../../../ui-library/typography";
import { OrderTotalContainer, StrikedTotal } from "./styles";

export const OrderTotal = ({
  total,
  disountedTotal,
}: {
  total: number;
  disountedTotal: string;
}) => {
  return (
    <OrderTotalContainer
      flexGrow
      alignItemsCenter
      justifyContent="space-between"
    >
      <XSmallText color={theme.colorTextDescription} fontWeight={600}>
        Order Total
      </XSmallText>
      {disountedTotal ? (
        <Flex gap="0.5rem">
          <StrikedTotal
            discounted={!!disountedTotal}
            color={theme.orderTotalColor}
          >
            ${total}
          </StrikedTotal>
          <H3 color={theme.orderTotalColor}>${disountedTotal}</H3>
        </Flex>
      ) : (
        <H3 color={theme.orderTotalColor}>${total}</H3>
      )}
    </OrderTotalContainer>
  );
};
