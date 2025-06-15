import { Page } from "./components/common/page";
import { useOrderConfirmation } from "./hooks/useOrderConfirmation";
import { Home } from "./pages/home";
import { GlobalLoader } from "./ui-library/loader";
import { observer } from "mobx-react";

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
