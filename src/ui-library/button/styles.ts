import styled from "styled-components";
import { theme } from "../../assets/styles/theme";

export const StyledButton = styled.button<{
  isPrimary?: boolean;
  disabled?: boolean;
  width?: string;
  height?: string;
  borderRadius?: string;
}>`
  ${({ disabled }) => {
    if (disabled) {
      return `
      opacity: 0.6;
      cursor: not-allowed;
      pointer-events: none;
      `;
    }
    return "";
  }}
  ${({ isPrimary, width, height }) => {
    return isPrimary
      ? `
        height: ${height || "53px"};
        width: ${width || "336px"};
        background: ${theme.bgColorPrimary};
        border: 1px solid ${theme.colorBorderPrimary};
        `
      : `
        height: ${height || "44px"};
        width: ${width || "160px"};
        background: ${theme.bgColorSecondary};
        border: 1px solid ${theme.colorBorderSecondary};
        `;
  }}
  border-radius: ${({ borderRadius }) => borderRadius || "24px"};
  cursor: pointer;
`;
