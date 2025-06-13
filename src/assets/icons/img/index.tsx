import React from 'react';
import AddCartIcon from './cart-icon.png';

export type IconNames = 'add-cart';
export interface SvgProps extends React.SVGAttributes<unknown> {
  name: IconNames;
  size?: number;
}

const Img = ({ name, size, ...svgProps }: SvgProps) => {
  let Image;
  switch (name) {
    case 'add-cart':
      Image = AddCartIcon;
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
  return Image ? <img src={AddCartIcon} {...sizeProps} {...svgProps} /> : <div />;
};

const handleDefault = (name: never) => {
  throw Error(`invalid image ${name}`);
};

export default Img;
