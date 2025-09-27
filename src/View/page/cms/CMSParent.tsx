import { Outlet } from "react-router-dom";
 import "../../../resourse/css/Cms.css";
import NavCms from "../../component/cms/CMSNav";
import Blogs from "../../../resourse/images/ic_blogs.svg";
import userAvatar from "../../../resourse/images/user_avatar.svg";
import userLogout from "../../../resourse/images/ic_logout.svg";

const CMSParent: React.FC = () => {
  return (
    <section className="main-section">
      <aside>
        <div className="aside-top">
          <span>
            <span>B</span>LOGS
          </span>
          <NavCms />
        </div>
        <section className="user-info-section">
          <img src={userAvatar} alt="" />
          <article className="user-info">
            <span className="user-name">User Name</span>
            <span className="user-role">Admin</span>
          </article>
          <img src={userLogout} alt="" />
        </section>
      </aside>
      <div className="Cms-content-wrapper">
        <header className="Cmsheader">
          <section>
            <span>Hi</span>
            <span>User Name</span>
          </section>
          <div className="search-input">
            <img src={Blogs} alt="" />
            <input type="text" id="search" placeholder="Search" />
          </div>
        </header>
        <Outlet />
      </div>
    </section>
  );
}
export default CMSParent;
