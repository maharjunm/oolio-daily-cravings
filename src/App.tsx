import { Cart } from "./components/common/cart";
import { Page } from "./components/common/page";
import { Product } from "./components/common/product";
import { OrderConfirmation } from "./components/common/orderConfirmation";

function App() {
  return (
    <Page>
      <Cart />
      <Product />
      <OrderConfirmation />
    </Page>
  );
}

export default App;
