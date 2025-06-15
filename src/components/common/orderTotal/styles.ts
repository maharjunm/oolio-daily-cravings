import styled from "styled-components";
import { Flex } from "../../../ui-library/flex";
import { H2 } from "../../../ui-library/typography";

export const OrderTotalContainer = styled(Flex)`
  padding: 16px;
`;

export const StrikedTotal = styled(H2)<{ discounted: boolean }>`
  ${({ discounted }) => (discounted ? "text-decoration: line-through;" : "")}
`;
