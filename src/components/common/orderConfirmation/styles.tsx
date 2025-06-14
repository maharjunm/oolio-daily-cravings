import styled from "styled-components";
import { Flex } from "../../../ui-library/flex";
import { theme } from "../../../assets/styles/theme";
import { BaseText } from "../../../ui-library/typography";

export const Container = styled(Flex)`
  padding: 16px;
  background: white;
  border-radius: 8px;
  max-height: 80vh;
`;

export const ItemsContainer = styled(Flex)`
  background: ${theme.orderBackground};
  border-radius: 12px;
  max-height: 400px;
  overflow: auto;
`;

export const ItemContainer = styled(Flex)<{ isLast: boolean }>`
  background: ${theme.orderBackground};
  padding: 16px;
`;

export const BreakLine = styled(Flex)`
  border: 0.5px solid ${theme.colorBorderSecondary};
  width: 80%;
`;

export const Icon = styled(BaseText)`
  padding-bottom: 4px;
`;
