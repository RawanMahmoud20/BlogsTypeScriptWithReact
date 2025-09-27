import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blogsActions } from "../../../redux/slices/blogs-slice";
import Blog from "../../../models/Blog";
import Category from "../../../models/Category";
  


interface RootState {
    categories: { data: Category[] };
    blogs: { data: Blog[] ; selectedBlog: Blog | null };
  }
let NewBlog = () => {
  let categories = useSelector((state: RootState) => state.categories.data);
  let dispatch = useDispatch();
  let titleRef = useRef<HTMLInputElement>(null);
  let PublisherNameRef = useRef<HTMLInputElement>(null);
  let CategoryRef = useRef<HTMLSelectElement>(null);
  let ImageRef = useRef<HTMLInputElement>(null);
  let DescriptionRef = useRef<HTMLTextAreaElement>(null);

let cheackData=()=>{
  if(titleRef.current!.value !="" && 
    PublisherNameRef.current!.value !="" && 
    CategoryRef.current!.value !="" && 
    ImageRef.current!.value !="" && 
    DescriptionRef.current!.value !=""
  ){
    return true;
  }
  alert("All fields are required");
  return false;
};



let getBlog=async ()=>{
//  خطوة قراءة الملف
  // Check that ImageRef.current and ImageRef.current.files are not null
  const file =
    ImageRef.current && ImageRef.current.files && ImageRef.current.files[0]
      ? ImageRef.current.files[0]
      : null;

// تحويل الملف إلى Base64

  let imageBase64 = "";
   if (file) {
    imageBase64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    

    });
  }
console.log(imageBase64);
const blog= new Blog(
  Number(Date.now().toString()),
  titleRef.current!.value,
  PublisherNameRef.current!.value,
  Number(CategoryRef.current!.value.toString()),
  imageBase64,
  DescriptionRef.current!.value
);

  // transform  plain object to flex before Redux

return blog;

};

let clear=()=>{
  titleRef.current!.value = "";
  PublisherNameRef.current!.value = "";
  CategoryRef.current!.value = "";
  ImageRef.current!.value = "";
  DescriptionRef.current!.value = "";

};
  let onSubmitHandler = async  (event: React.FormEvent) => {
  event.preventDefault();
  if(cheackData()){
  //  new blog object  
let blog = await getBlog();
  dispatch(blogsActions.create(blog));
       clear(); 
  }



}

  return (
    <section className="content">
      <div className="content-header">
        <span>New Blog</span>
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
                    rows={11}
                    placeholder="Write description"
                    ref={DescriptionRef}
                  ></textarea>
                </div>
              </section>
            </div>
            <div className="create-item_form_actions">
              <button className="form-action" type="reset">
                Cancel
              </button>
              <button className="form-action done-action" type="submit">
                Save
              </button>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
};
export default NewBlog;
