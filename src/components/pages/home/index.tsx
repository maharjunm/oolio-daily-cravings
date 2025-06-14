import { Flex } from "../../../ui-library/flex";
import { H1 } from "../../../ui-library/typography";
import { Cart } from "../../common/cart";
import { Product } from "../../common/product";
import { ProductContainer } from "./styles";

const products = [
  {
    name: "Waffle with Berries",
    type: "Waffle",
    price: 6.5,
    img: "product",
  },
  {
    name: "Waffle with Berries",
    type: "Waffle",
    price: 6.5,
    img: "product",
  },
  {
    name: "Waffle with Berries",
    type: "Waffle",
    price: 6.5,
    img: "product",
  },
  {
    name: "Waffle with Berries",
    type: "Waffle",
    price: 6.5,
    img: "product",
  },
  {
    name: "Waffle with Berries",
    type: "Waffle",
    price: 6.5,
    img: "product",
  },
  {
    name: "Waffle with Berries",
    type: "Waffle",
    price: 6.5,
    img: "product",
  },
  {
    name: "Waffle with Berries",
    type: "Waffle",
    price: 6.5,
    img: "product",
  },
  {
    name: "Waffle with Berries",
    type: "Waffle",
    price: 6.5,
    img: "product",
  },
  {
    name: "Waffle with Berries",
    type: "Waffle",
    price: 6.5,
    img: "product",
  },
  {
    name: "Waffle with Berries",
    type: "Waffle",
    price: 6.5,
    img: "product",
  },
];

export const Home = () => {
  return (
    <Flex gap="1rem" flexGrow>
      <Flex flexDirection="column" gap="0.5rem">
        <H1>Desserts</H1>
        <ProductContainer wrap gap="1rem">
          {products.map((p, index) => {
            return <Product isSelected={index % 2 == 0} {...p} />;
          })}
        </ProductContainer>
      </Flex>
      <Cart />
    </Flex>
  );
};
