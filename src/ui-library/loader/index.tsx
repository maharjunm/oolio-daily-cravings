import { observer } from "mobx-react";
import { LoaderBar, StyledLoader } from "./styles";
import useStores from "../../stores/useStores";

export const SpinnerLoader = () => <StyledLoader />;

export const GlobalLoader = observer(() => {
  const {
    orderStore: { orderPreview },
  } = useStores();

  return <LoaderBar isVisible={orderPreview === "loading"} />;
});
