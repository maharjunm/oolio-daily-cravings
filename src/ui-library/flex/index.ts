import styled from "styled-components";

export interface FlexProps {
  columnGap?: string;
  rowGap?: string;
  wrap?: boolean;
  spaceBetween?: boolean;
  justifyContentCenter?: boolean;
  alignItemsCenter?: boolean;
  alignSelfCenter?: boolean;
  justifyContent?: string;
  flexDirection?: string;
  alignItems?: string;
  alignSelf?: string;
  margin?: string;
  noShrink?: boolean;
  borderRadius?: string;
  centered?: boolean;
  inline?: boolean;
  textAlignStart?: boolean;
  flexGrow?: boolean;
  hiddenOverflow?: boolean;
  gap?: string;
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  ${({ gap }: FlexProps) => (gap ? `gap: ${gap};` : "")};
  ${({ columnGap }: FlexProps) =>
    columnGap ? `column-gap: ${columnGap};` : ""};
  ${({ rowGap }: FlexProps) => (rowGap ? `row-gap: ${rowGap};` : "")};
  ${({ inline }: FlexProps) => (inline ? `display: inline-flex;` : "")};
  ${({ wrap }: FlexProps) => (wrap ? `flex-wrap: wrap;` : "")};
  ${({ spaceBetween }: FlexProps) =>
    spaceBetween ? `justify-content: space-between;` : ""};
  ${({ justifyContentCenter }: FlexProps) =>
    justifyContentCenter ? `justify-content: center;` : ""};
  ${({ alignItemsCenter }: FlexProps) =>
    alignItemsCenter ? ` align-items: center;` : ""};
  ${({ margin }: FlexProps) => (margin ? margin : "")};
  ${({ flexDirection }: FlexProps) =>
    flexDirection ? `flex-direction: ${flexDirection}` : ""};
  ${({ alignItems }: FlexProps) => (alignItems ? alignItems : "")};
  ${({ alignSelf }: FlexProps) => (alignSelf ? alignSelf : "")};
  ${({ justifyContent }: FlexProps) =>
    justifyContent ? `justify-content: ${justifyContent};` : ""};
  ${({ noShrink }: FlexProps) => (noShrink ? `flex-shrink: 0;` : "")};
  ${({ borderRadius }: FlexProps) =>
    borderRadius ? `border-radius: ${borderRadius};` : ""};
  ${({ textAlignStart }: FlexProps) =>
    textAlignStart ? `text-align: start;` : ""};
  ${({ flexGrow }: FlexProps) => (flexGrow ? `flex-grow: 1;` : "")};
  ${({ hiddenOverflow }: FlexProps) =>
    hiddenOverflow ? `overflow: hidden;` : ""};
  ${({ alignSelfCenter }: FlexProps) =>
    alignSelfCenter ? `align-self: center;` : ""};
  ${({ centered }: FlexProps) =>
    centered
      ? `
    justify-content: center;
    align-items: center;
  `
      : ""};
`;
