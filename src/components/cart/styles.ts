import styled from "styled-components";
import { Flex } from "../../ui-library/flex";
import { theme } from "../../assets/styles/theme";
import { BaseText } from "../../ui-library/typography";

export const CartContainer = styled(Flex)`
  background: white;
  padding: 16px;
  min-width: 450px;
  max-height: 600px;
`;

export const EmptyCartContainer = styled(Flex)`
  margin-top: 24px;
`;

export const ItemsContainer = styled(Flex)`
  border-radius: 12px;
  height: 350px;
  overflow: auto;
`;

export const ItemContainer = styled(Flex)`
  padding: 16px;
`;

export const BreakLine = styled(Flex)`
  border: 0.5px solid ${theme.colorBorderSecondary};
  width: 80%;
`;

export const Icon = styled(BaseText)`
  padding-bottom: 4px;
`;

export const CrossIconContainer = styled(Flex)`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border: 1px solid ${theme.colorBorderSecondary};
  cursor: pointer;
`;

export const DeliveryTypeContainer = styled(Flex)`
  width: 350px;
  padding: 8px 24px;
  background: ${theme.deliveryTypeBgColor};
`;
