import styled from "styled-components";
import { theme } from "../../assets/styles/theme";

type FontWeightType = 400 | 600 | 700;

const colorStyle = ({ color }: { color?: string }) => `
  color: ${color || theme.colorTextPrimary};
`;

export const H1 = styled.h1`
  font-family: RedHatText;
  font-size: 36px;
  font-weight: 600;
  color: ${theme.colorHeaderPrimary};
  margin: 0;
`;

export const H2 = styled.h2`
  font-family: RedHatText;
  font-size: 24px;
  font-weight: 600;
  color: ${theme.colorHeaderSecondary};
  margin: 0;
`;

export const BaseText = styled.span<{
  color?: string;
  fontWeight?: FontWeightType;
}>`
  display: inline-block;
  font-family: RedHatText;
  font-weight: ${({ fontWeight }) => fontWeight || 500};
  font-size: 16px;
  ${colorStyle};
`;

export const SmallText = styled.span<{
  color?: string;
  fontWeight?: FontWeightType;
}>`
  display: inline-block;
  font-family: RedHatText;
  font-weight: ${({ fontWeight }) => fontWeight || 500};
  font-size: 14px;
  ${colorStyle};
`;

export const XSmallText = styled.span<{
  color?: string;
  fontWeight?: FontWeightType;
}>`
  display: inline-block;
  font-family: RedHatText;
  font-weight: ${({ fontWeight }) => fontWeight || 500};
  font-size: 12px;
  ${colorStyle};
`;
