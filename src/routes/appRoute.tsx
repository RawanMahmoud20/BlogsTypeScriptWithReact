


import { useHref, useLocation } from "react-router-dom";
import CmsRoute from './cms-router';
import WebRoute from "./web-routes";

let AppRoute: React.FC = () => {
  let location = useLocation();
  let href = location.pathname;
  return <>{href.startsWith("/cms") ? <CmsRoute /> : <WebRoute />}</>;
};
export default AppRoute;
