import { theme } from "../../../assets/styles/theme";
import { H3, XSmallText } from "../../../ui-library/typography";
import { OrderTotalContainer } from "./styles";

export const OrderTotal = ({ total }: { total: number }) => {
  return (
    <OrderTotalContainer
      flexGrow
      alignItemsCenter
      justifyContent="space-between"
    >
      <XSmallText color={theme.colorTextDescription} fontWeight={600}>
        Order Total
      </XSmallText>
      <H3 color={theme.orderTotalColor}>${total}</H3>
    </OrderTotalContainer>
  );
};
