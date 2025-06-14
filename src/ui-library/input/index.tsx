import { StyledInput } from "./styles";

interface Props {
  value: string;
  updateValue: (value: string) => void;
  placeholder: string;
}

export const Input = ({ value, updateValue, placeholder }: Props) => {
  return (
    <StyledInput
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => updateValue(e.target.value)}
    />
  );
};
