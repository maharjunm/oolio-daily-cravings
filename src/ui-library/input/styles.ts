import styled from "styled-components";
import { theme } from "../../assets/styles/theme";

export const StyledInput = styled.input`
  background: white;
  border: 1px solid ${theme.colorBorderPrimary};
  width: 300px;
  height: 25px;
  font-size: 16px;
  border-radius: 8px;
  color: ${theme.colorTextPrimary};
`;
