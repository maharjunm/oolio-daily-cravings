import { observer } from "mobx-react";
import Img from "../../assets/icons/img";
import { Cart } from "../../components/cart";
import { Products } from "../../components/products";
import useBreakpoint from "../../hooks/useBreakpoint";
import useStores from "../../stores/useStores";
import { Flex } from "../../ui-library/flex";
import { H1, SmallText } from "../../ui-library/typography";
import { CartIconContainer, CountContainer } from "./styles";
import { ResponsiveOrderSummaryDrawer } from "../../ui-library/drawer";
import { useState } from "react";

export const Home = observer(() => {
  const { isMobile, isTablet } = useBreakpoint();
  const [showCart, setShowCart] = useState(false);
  const {
    cartStore: { totalCartItems },
  } = useStores();
  const flexGrow = isTablet || isMobile ? { flexGrow: true } : {};
  return (
    <Flex gap="1rem" flexGrow>
      <Flex {...flexGrow} flexDirection="column" gap="0.5rem">
        <Flex flexGrow justifyContent="space-between">
          <H1>Desserts</H1>
          {isMobile || isTablet ? (
            <CartIconContainer onClick={() => setShowCart(true)} centered>
              <Img height="20px" width="20px" name="add-cart" />
              <CountContainer onClick={() => setShowCart(true)} centered>
                <SmallText fontWeight={700} color="white">
                  {totalCartItems}
                </SmallText>
              </CountContainer>
            </CartIconContainer>
          ) : null}
        </Flex>
        <Products />
      </Flex>
      {(isMobile || isTablet) && (
        <ResponsiveOrderSummaryDrawer
          isOpen={showCart}
          onClose={() => setShowCart(true)}
        />
      )}
      {!isMobile && !isTablet && <Cart />}
    </Flex>
  );
});
