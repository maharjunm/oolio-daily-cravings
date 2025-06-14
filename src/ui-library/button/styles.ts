import styled from "styled-components";
import { theme } from "../../assets/styles/theme";

export const StyledButton = styled.button<{
  isPrimary?: boolean;
  width?: string;
  height?: string;
}>`
  ${({ isPrimary, width, height }) => {
    return isPrimary
      ? `
        height: ${height || "53px"};
        width: ${width || "336px"};
        background: ${theme.bgColorPrimary};
        border-radius: 24px;
        border: 1px solid ${theme.colorBorderPrimary};
        `
      : `
        height: 44px;
        width: 160px;
        background: ${theme.bgColorSecondary};
        border-radius: 24px;
        border: 1px solid ${theme.colorBorderSecondary};
         `;
  }}
  cursor: pointer;
`;
