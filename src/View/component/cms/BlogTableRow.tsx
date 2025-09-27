import { useDispatch, useSelector } from "react-redux";
import { blogsActions } from "../../../redux/slices/blogs-slice";
import Delete from "../../../resourse/images/ic_delete.svg";
import Edit from "../../../resourse/images/ic_edit.svg";
import { useNavigate } from "react-router-dom";
import Blog from "../../../models/Blog";
import Category from "../../../models/Category";

let BlogRow = (props: { blog: Blog }) => {
  let dispatch = useDispatch();
let navigate = useNavigate();
  // جلب كل الكاتيجوريز
  let categories = useSelector(
    (state: { categories: { data: Category[] } }) => state.categories.data 
  );

  // البحث عن اسم الفئة حسب categoryId
  let categoryName =
    categories.find((cat: Category) => {
      return cat.id.toString() === props.blog.categoryId.toString();
    })
      ?.name || "Unknown";

  let onDeleteHandler = () => {
    dispatch(blogsActions.delete(props.blog.id));
  };
let onEditHandler=()=>{
  // Navigate to the edit page with the blog ID
  navigate(`/cms/blog/${props.blog.id}/edit`);
};
  return (
    <tr>
      <td className="blog-title">{props.blog.title}</td>
      <td>{props.blog.publisherName}</td>
      <td>{categoryName}</td>
      <td>
        <img
          src={props.blog.image}
          alt={props.blog.title}
          style={{ width: "100px", height: "auto", borderRadius: "8px" }}
        />
      </td>
      <td>{props.blog.description}</td>
      <td>
        <div className="table-options">
          <div className="table-option">
            <img src={Edit} alt="Edit" onClick={onEditHandler} />
          </div>
          <div className="table-option">
            <img src={Delete} alt="Delete" onClick={onDeleteHandler} />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default BlogRow;
