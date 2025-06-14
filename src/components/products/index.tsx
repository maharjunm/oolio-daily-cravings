import { observer } from "mobx-react";
import { Flex } from "../../ui-library/flex";
import { SpinnerLoader } from "../../ui-library/loader";
import { Product } from "../common/product";
import { ProductContainer } from "./styles";
import useStores from "../../stores/useStores";
import { useEffect } from "react";

export const Products = observer(() => {
  const {
    productsStore: { productsPreview, products, getProducts },
    cartStore: { cartItems, increaseCartItemCount, decreaseCartItemCount },
  } = useStores();

  useEffect(() => {
    if (productsPreview === "idle" || productsPreview == "failed") {
      getProducts();
    }
  }, [getProducts, productsPreview]);

  return (
    <ProductContainer flexGrow wrap gap="1rem">
      {productsPreview === "loading" ? (
        <Flex centered flexGrow>
          <SpinnerLoader />
        </Flex>
      ) : (
        (products || []).map((p) => {
          return (
            <Product
              increaseCartItemCount={() => increaseCartItemCount(p.id)}
              decreaseCartItemCount={() => decreaseCartItemCount(p.id)}
              key={p.id}
              isSelected={cartItems ? !!cartItems[p.id] : false}
              count={cartItems ? cartItems[p.id] : 0}
              {...p}
            />
          );
        })
      )}
    </ProductContainer>
  );
});
