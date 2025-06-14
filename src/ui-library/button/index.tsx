import { StyledButton } from "./styles";

export const Button = ({
  name,
  isPrimary,
  height,
  width,
}: {
  name: React.ReactNode;
  isPrimary?: boolean;
  height?: string;
  width?: string;
}) => {
  return (
    <StyledButton width={width} height={height} isPrimary={isPrimary}>
      {name}
    </StyledButton>
  );
};
