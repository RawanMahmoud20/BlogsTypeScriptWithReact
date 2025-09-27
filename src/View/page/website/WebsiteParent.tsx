import { Fragment } from "react";
// import "../../../resourse/css/style.css";
import { Outlet } from "react-router-dom";

let WebsiteParent = () => {
  return (
    <Fragment>
      <header className="websiteheader">
        <section>
          <span>BLOGS</span>
          <nav>
            <ul>
              <li>
                <a href="#" className="activel-link">
                  Home{" "}
                </a>
              </li>
              <li>
                <a href="#" className="activel-link">
                  Trendy Blogs
                </a>
              </li>
              <li>
                <a href="#" className="activel-link">
                  {" "}
                  Categories{" "}
                </a>
              </li>
            </ul>
          </nav>
          <button>Join Us</button>
        </section>
        <article>
          <span>Lt's Find The Best Trendy Blogs</span>
        </article>
      </header>
      <Outlet />
    </Fragment>
  );
};
export default WebsiteParent;
