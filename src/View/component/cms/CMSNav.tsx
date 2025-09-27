import { NavLink } from "react-router-dom";
import blogs from "../../../resourse/images/ic_blogs.svg";
import overview from "../../../resourse/images/ic_overview.svg";
import categories from "../../../resourse/images/ic_categories.svg";
import settings from "../../../resourse/images/ic_settings.svg";
import notifications from "../../../resourse/images/ic_notifications.svg";

import React from "react";

let NavCms: React.FC = () => {
  return (
    <nav>
      <span>Admin tools</span>
      <ul className="nav-items">
        <li>
          <NavLink
            to="/cms"
            className={(props: { isActive: boolean }) => (props.isActive ? "active" : "in-active")}
            end
          >
            <div className="nav-item-content">
              <img src={overview} alt="" />
              <span>Overview</span>
            </div>
            <span className="nav-item-count">2</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cms/blog"
            className={(props: { isActive: boolean }) => (props.isActive ? "active" : "in-active")}
            end
          >
            <div className="nav-item-content">
              <img src={blogs} alt="" />
              <span>All Blogs</span>
            </div>
            <span className="nav-item-count">2</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cms/categories"
            className={(props: { isActive: boolean }) => (props.isActive ? "active" : "in-active")}
            end
          >
            <div className="nav-item-content">
              <img src={categories} alt="" />
              <span>Categories</span>
            </div>
            <span className="nav-item-count">2</span>
          </NavLink>
        </li>
        <li className="last-item">
          <NavLink
            to="/"
            className={(props: { isActive: boolean }) => (props.isActive ? "active" : "in-active")}
            end
          >
            <div className="nav-item-content">
              <img src={settings} alt="" />
              <span>Settings</span>
            </div>
            <span className="nav-item-count">2</span>
          </NavLink>
        </li>
      </ul>
      <span>Insights</span>
      <ul className="nav-items">
        <li>
          <NavLink
            to="/"
            className={(props: { isActive: boolean }) => (props.isActive ? "active" : "in-active")}
            end
          >
            <div className="nav-item-content">
            <img src={notifications} alt="" />
              <span>Notifications</span>
            </div>
            <span className="nav-item-count">2</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default NavCms;
