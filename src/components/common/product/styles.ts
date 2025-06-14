import styled from "styled-components";
import { Flex } from "../../../ui-library/flex";
import { theme } from "../../../assets/styles/theme";

export const ProductContainer = styled(Flex)<{ isSelected: boolean }>`
  width: 251px;
  height: 240px;
  border-radius: 4px;
  position: relative;
  border: 2px solid
    ${({ isSelected }) =>
      isSelected ? theme.colorBorderPrimary : theme.pageBackground};
`;

export const ButtonContainer = styled(Flex)`
  position: absolute;
  bottom: -19px;
  width: 251px;
`;

export const IconContainer = styled(Flex)`
  border-radius: 10px;
  height: 20px;
  width: 20px;
  border: 1px solid white;
`;
