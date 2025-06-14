import React from "react";
import AddCartIcon from "./cart-icon.png";
import EmptyCart from "./empty-cart.png";
import Product from "./product.png";
import Tick from "./tick.png";
import Tree from "./tree.png";

export type IconNames = "add-cart" | "empty-cart" | "product" | "tick" | 'tree';
export interface SvgProps extends React.SVGAttributes<unknown> {
  name: IconNames;
  size?: number;
}

const Img = ({ name, size, ...svgProps }: SvgProps) => {
  let Image;
  switch (name) {
    case "add-cart":
      Image = AddCartIcon;
      break;
    case "tree":
      Image = Tree;
      break;
    case "empty-cart":
      Image = EmptyCart;
      break;
    case "tick":
      Image = Tick;
      break;
    case "product":
      Image = Product;
      break;
    default:
      handleDefault(name);
      break;
  }
  const sizeProps =
    (size && {
      width: size,
      height: size,
    }) ||
    {};
  return Image ? <img src={Image} {...sizeProps} {...svgProps} /> : <div />;
};

const handleDefault = (name: never) => {
  throw Error(`invalid image ${name}`);
};

export default Img;
