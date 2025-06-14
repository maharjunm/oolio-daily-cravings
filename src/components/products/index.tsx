import useAxiosApi from "../../hooks/useAxiosApi";
import { Flex } from "../../ui-library/flex";
import { SpinnerLoader } from "../../ui-library/loader";
import { Product } from "../common/product";
import { ProductContainer } from "./styles";

export const Products = () => {
  const { data: products, loading: productsLoading } = useAxiosApi({
    url: "/products",
    method: "GET",
  });

  return (
    <ProductContainer flexGrow wrap gap="1rem">
      {productsLoading ? (
        <Flex centered flexGrow>
          <SpinnerLoader />
        </Flex>
      ) : (
        (products || []).map((p, index: number) => {
          return <Product isSelected={index % 2 == 0} {...p} />;
        })
      )}
    </ProductContainer>
  );
};
