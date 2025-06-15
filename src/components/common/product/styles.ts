import styled from "styled-components";
import { Flex } from "../../../ui-library/flex";
import { theme } from "../../../assets/styles/theme";

export const ProductContainer = styled(Flex)<{
  isSelected: boolean;
  isTablet?: boolean;
  isMobile?: boolean;
}>`
  width: 251px;
  height: 240px;
  border-radius: 4px;
  position: relative;
  border: 2px solid
    ${({ isSelected }) =>
      isSelected ? theme.colorBorderPrimary : theme.pageBackground};

  ${({ isMobile }) => {
    return isMobile
      ? `
        width: 150px;
        height: 150px;
    `
      : "";
  }}
  ${({ isTablet }) => {
    return isTablet
      ? `
        width: 200px;
        height: 200px;
    `
      : "";
  }}
`;

export const ButtonContainer = styled(Flex)<{
  isTablet?: boolean;
  isMobile?: boolean;
}>`
  position: absolute;
  bottom: -19px;
  width: 251px;
  ${({ isMobile }) => {
    return isMobile
      ? `
        bottom: -10px;
        left: 4px;
        width: 150px;
    `
      : "";
  }}
  ${({ isTablet }) => {
    return isTablet
      ? `
        bottom: -22px;
        left: 4px;
        width: 200px;
    `
      : "";
  }}
`;

export const IconContainer = styled(Flex)`
  border-radius: 10px;
  height: 20px;
  width: 20px;
  border: 1px solid white;
`;
