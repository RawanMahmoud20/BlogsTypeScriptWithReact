import { useEffect, useRef } from "react";
import Blog from "../../../models/Blog";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { blogsActions } from "../../../redux/slices/blogs-slice";
import { useParams } from "react-router-dom";
import Category from "../../../models/Category";

  interface RootState {
    categories: { data: Category[] };
    blogs: { data: Blog[] ; selectedBlog: Blog | null };
  }
const EditBlog: React.FC = () => {
  
   const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const categories = useSelector((state: RootState) => state.categories.data);
  const blogs = useSelector((state: RootState) => state.blogs.data);


  const titleRef = useRef<HTMLInputElement>(null);
  const PublisherNameRef =useRef<HTMLInputElement>(null);
const CategoryRef = useRef<HTMLSelectElement>(null);
  const ImageRef = useRef<HTMLInputElement>(null);
  const DescriptionRef = useRef<HTMLTextAreaElement>(null);

const selectedBlog = useSelector((state: { blogs: { selectedBlog: Blog } }) => state.blogs.selectedBlog);


 useEffect(() => {
  const blog = blogs.find((b: Blog) => b.id.toString() === id);
  if (
    blog &&
    titleRef.current &&
    PublisherNameRef.current &&
    CategoryRef.current &&
    DescriptionRef.current
  ) {
    titleRef.current.value = blog.title;
    PublisherNameRef.current.value = blog.publisherName;
    CategoryRef.current.value = blog.categoryId.toString();
    DescriptionRef.current.value = blog.description;
    dispatch(blogsActions.setSelectedBlog(blog));
  }
}, [id, blogs, dispatch]);

const cheackData=()=>{
   if (
    titleRef.current &&
    PublisherNameRef.current &&
    CategoryRef.current &&
    DescriptionRef.current &&
    titleRef.current.value !== "" &&
    PublisherNameRef.current.value !== "" &&
    CategoryRef.current.value !== "" &&
    DescriptionRef.current.value !== ""
  ) {
    return true;
  }
  alert("All fields are required");
  return false;
};



const getBlog=async (oldImage:string)=>{
//   قراءة الملف
// Check that ImageRef.current and ImageRef.current.files are not null
  const file =
    ImageRef.current && ImageRef.current.files && ImageRef.current.files[0]
      ? ImageRef.current.files[0]
      : null;

  // تحويل الملف إلى Base64

  let imageBase64 = selectedBlog?.image; // من Redux
   if (file) {
    imageBase64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    

    });
  }
console.log(imageBase64);

// أنشئي كائن من نوع Blog
  const blog = new Blog(
    Number(id),
    titleRef.current!.value,
    PublisherNameRef.current!.value,
    Number(CategoryRef.current!.value),
    imageBase64!,
    DescriptionRef.current!.value
  );
  return blog;


};

const clear=()=>{
   if (
    ImageRef.current &&
    titleRef.current &&
    PublisherNameRef.current &&
    CategoryRef.current &&
    DescriptionRef.current
  ) {
  titleRef.current.value = "";
  PublisherNameRef.current.value = "";
  CategoryRef.current.value = "";
  ImageRef.current.value = "";
  DescriptionRef.current.value = "";

  }
};
  const onSubmitHandler = async  (event: React.FormEvent) => {
  event.preventDefault();
  if(cheackData()){
  //  new blog object  
const blog = await getBlog(selectedBlog?.image ||"");
  dispatch(blogsActions.update(blog));
    clear(); 
    navigate("/cms/blog"); 
  }


}


 const cancelHandler = () => {
  navigate("/cms/blog");
  };
  return (
    <section className="content">
      <div className="content-header">
        <span>Edit Blogs</span>
      </div>
      <div className="content-body">
        <section className="create-item">
          <form className="create-item_form" onSubmit={onSubmitHandler}>
            <div className="create-item_form_content">
              <section className="create-item_left">
                <div className="form-group" >
                  <label htmlFor="blog-title">Blog Title</label>
                  <input
                    className="form-input"
                    type="text"
                    name="blog-title"
                    id="blog-title"
                    placeholder="Blog title"
                    ref={titleRef}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="blog-title">Publisher Name</label>
                  <input
                    type="text"
                    className="form-input"
                    name="publisher-name"
                    id="publisher-name"
                    placeholder="Publisher Name"
                    ref={PublisherNameRef}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="categories">Category</label>
                  <select
                    name="categories"
                    id="categories"
                    className="form-select"
                    ref={CategoryRef}
                  >
                    {categories.map((element) => (
                      <option key={element.id} value={element.id}>
                        {element.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="blog-title">Image</label>
                  <input
                    type="file"
                    className="form-input file-input"
                    name="Image"
                    id="Image"
                    accept="image/*"  
                    placeholder="Image"
                    ref={ImageRef}
                  />
                </div>
              </section>
              <section className="create-item_right">
                <div className="form-group">
                  <label htmlFor="blog-description">Description</label>
                  <textarea
                    className="form-textarea"
                    id="blog-description"
                    rows={10}
                    placeholder="Write description"
                    ref={DescriptionRef}
                  ></textarea>
                </div>
              </section>
            </div>
            <div className="create-item_form_actions">
              <button className="form-action" type="reset" onClick={cancelHandler}>
                Cancel
              </button>
              <button className="form-action done-action" type="submit" onClick={onSubmitHandler}>
                Save
              </button>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
};
export default EditBlog;
