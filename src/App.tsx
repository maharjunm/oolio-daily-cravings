import { Page } from "./components/common/page";
import { Home } from "./pages/home";
import { GlobalLoader } from "./ui-library/loader";
import { observer } from "mobx-react";
import { useOrderConfirmation } from "./components/orders/hooks/useOrderConfirmation";

const App = observer(() => {
  
  
  const { modal } = useOrderConfirmation();

  return (
    <Page>
      {modal}
      <GlobalLoader />
      <Home />
    </Page>
  );
});

export default App;
