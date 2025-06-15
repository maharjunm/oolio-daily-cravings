import styled from "styled-components";
import { Flex } from "../../ui-library/flex";
import { theme } from "../../assets/styles/theme";

export const CartIconContainer = styled(Flex)`
  height: 40px;
  width: 40px;
  border: 1px solid ${theme.colorBorderPrimary};
  border-radius: 25px;
  position: relative;
  cursor: pointer;
`;

export const CountContainer = styled(Flex)`
  height: 30px;
  width: 30px;
  background-color: ${theme.colorBorderPrimary};
  border-radius: 25px;
  position: absolute;
  top: 25px;
  left: 20px;
  cursor: pointer;
`;
