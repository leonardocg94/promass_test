import { RouterProvider } from "react-router-dom";
import { router } from "./common/navigation";
import { Provider } from "react-redux";
import { store } from "./common/store";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
