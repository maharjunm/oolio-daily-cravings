import styled, { keyframes } from "styled-components";

export const StyledLoader = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(90deg);
    }
    50% {
      transform: rotate(180deg);
    }
    75% {
      transform: rotate(270deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const loadingAnimation = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

export const LoaderBar = styled.div<{ isVisible?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #6200ee, #03dac6, #6200ee);
  z-index: 9999;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    animation: ${loadingAnimation} 1.5s linear infinite;
  }

  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;
