import styled, { keyframes } from "styled-components";

export const slideIn = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;

export const slideOut = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(100%); }
`;

export const DrawerOverlay = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 100;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

export const DrawerContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  box-shadow: -4px 0 15px rgba(0, 0, 0, 0.2);
  z-index: 990;
  display: flex;
  flex-direction: column;

  transform: translateX(100%);
  transition: transform 0.35s ease-out;

  &.visible {
    transform: translateX(0);
    animation: ${slideIn} 0.35s forwards;
  }

  &.hidden {
    animation: ${slideOut} 0.35s forwards;
  }
`;

export const DrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  padding-left: 16px;
`;

export const DrawerTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 5px;
  line-height: 1;
  &:hover {
    color: #333;
  }
`;

export const DrawerContent = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding-right: 10px;
`;

export const DummyOrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px dashed #f0f0f0;
  &:last-child {
    border-bottom: none;
  }
`;

export const ItemDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ItemImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
`;

export const ItemName = styled.span`
  font-weight: 600;
  color: #333;
`;

export const ItemPrice = styled.span`
  font-weight: bold;
  color: #6200ee;
`;

export const OrderSummaryTotal = styled.div`
  padding-top: 20px;
  border-top: 1px solid #eee;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

export const ConfirmOrderButton = styled.button`
  background-color: #dc3545; /* Red/Orange from your theme */
  color: white;
  padding: 15px 25px;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  margin-top: 30px;
  box-shadow: 0 4px 10px rgba(220, 53, 69, 0.3);
  transition: background-color 0.2s ease, transform 0.1s ease;

  &:hover {
    background-color: #c82333;
  }
  &:active {
    transform: scale(0.98);
  }
`;
