import { Cart } from "../../components/cart";
import { Products } from "../../components/products";
import { Flex } from "../../ui-library/flex";
import { H1 } from "../../ui-library/typography";

export const Home = () => {
  return (
    <Flex gap="1rem" flexGrow>
      <Flex flexGrow flexDirection="column" gap="0.5rem">
        <H1>Desserts</H1>
        <Products />
      </Flex>
      <Cart />
    </Flex>
  );
};
