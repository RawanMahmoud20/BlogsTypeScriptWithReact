import { NavLink } from "react-router-dom";
import BlogRow from "../../component/cms/BlogTableRow";
import { useSelector } from "react-redux";
import filterBtn from "../../../resourse/images/btn_Filter.svg";

import Blog from "../../../models/Blog";

let Blogs: React.FC = () => {
  let data = useSelector((state: { blogs: { data: Blog[] } }) => state.blogs.data);


  return (
    <section className="content">
      <div className="content-header">
        <span>All Blogs</span>
        <div className="content-header-options">
          <div className="content-header-options_filter">
          <img src={filterBtn} alt="Filter" />
          </div>
          <NavLink className="header-button" to="/cms/blog/Create">
            Create New Blog
          </NavLink>
        </div>
      </div>
      <div className="content-body">
        <div className="content-body_table">
          <table>
            <thead>
              <tr>
                <th>Blog Title</th>
                <th>Publisher Name</th>
                <th>Category</th>
                <th>Image</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
            {data.length > 0 ? (
              data.map((element) => (
                <BlogRow key={element.id} blog={element} />
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>No blogs available</td>
              </tr>
            )}

          </tbody>


          </table>
        </div>
      </div>
    </section>
  );
};
export default Blogs;
