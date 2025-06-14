import { StyledButton } from "./styles";

export const Button = ({
  name,
  isPrimary,
  height,
  width,
  borderRadius,
}: {
  name: React.ReactNode;
  isPrimary?: boolean;
  height?: string;
  width?: string;
  borderRadius?: string;
}) => {
  return (
    <StyledButton borderRadius={borderRadius} width={width} height={height} isPrimary={isPrimary}>
      {name}
    </StyledButton>
  );
};
