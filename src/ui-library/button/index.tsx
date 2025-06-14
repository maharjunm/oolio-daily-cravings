import { StyledButton } from "./styles";

export const Button = ({
  name,
  isPrimary,
  height,
  width,
  borderRadius,
  onClick,
  disabled,
}: {
  name: React.ReactNode;
  isPrimary?: boolean;
  disabled?: boolean;
  height?: string;
  width?: string;
  borderRadius?: string;
  onClick?: () => void;
}) => {
  return (
    <StyledButton
      disabled={disabled}
      onClick={onClick}
      borderRadius={borderRadius}
      width={width}
      height={height}
      isPrimary={isPrimary}
    >
      {name}
    </StyledButton>
  );
};
