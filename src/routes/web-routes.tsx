import { Route, Routes } from "react-router-dom";
import WebsiteParent from "../View/page/website/WebsiteParent";
import WebsiteHome from "../View/page/website/WebsiteHome";

let WebRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<WebsiteParent />}>
        <Route path="" element={<WebsiteHome />} />         {/* على الراوت الفاضي يظهرلها  */}

      </Route>
    </Routes>
  );
};
export default WebRoute;
