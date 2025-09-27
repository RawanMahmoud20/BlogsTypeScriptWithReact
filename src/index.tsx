import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoute from "./routes/appRoute";
import { Provider } from "react-redux";
import reduxStore from "./redux/redux-store";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
<BrowserRouter>
<Provider store={reduxStore}>
 <AppRoute/>
</Provider>
</BrowserRouter>
);
