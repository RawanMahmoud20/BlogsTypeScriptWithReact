import { useRef } from "react";
import Blog from "../../../models/Blog";
import { CategoriesActions } from "../../../redux/slices/categories-slice";
import { useDispatch } from "react-redux";
import Category from "../../../models/Category";
import { useNavigate } from "react-router-dom";
import categoriesApiController from "../../../controller/categories-api-controller";
let NewCategories:React.FC = () => {

 let titleRef=useRef<HTMLInputElement>(null);
   let briefInfoRef=useRef<HTMLInputElement>(null);
  let dispatch=useDispatch();
  let navigate = useNavigate();
let onSubmitHandler=(event: React.FormEvent)=>{
  event.preventDefault();
  if(cheackData()){
    Save();
  
  }
  
};
let cheackData=()=>{
  if(titleRef.current!.value !="" && 
    briefInfoRef.current!.value !="" 
  ){
    return true;
  }
  alert("All fields are required");
  return false;
};
let getObject=()=>{
return new Category(
  Number(Date.now()), // id فريد
  titleRef.current!.value.trim(),
  briefInfoRef.current!.value.trim()
);
};

let Save=async ()=>{
  if (!titleRef.current || !briefInfoRef.current) return;

  //  أنشئ كائن plain object
  let newCategory = {
    name: titleRef.current.value.trim(),
    slug: briefInfoRef.current.value.trim()
   };
   try{
     //  استدعاء الـ API
    const api= new categoriesApiController();
    const response= await api.create(newCategory as any);
        //  تأكد من نجاح العملية
    if(response && response.status !== false){
        const categoryToAdd = new Category(
        response.data?.id || Date.now(), // إذا API رجعت id استخدمه، وإلا استخدم تاريخ اليوم كـ id فريد
        newCategory.name,
        newCategory.slug
      );
      dispatch(CategoriesActions.create(categoryToAdd));
      clear();
      navigate("/cms/categories");
    } else {
      alert("حدث خطأ أثناء الإضافة: " + response?.message);
    }
  } catch (error: any){ {
     console.error(error);
    alert("حدث خطأ أثناء الإضافة: " + error.message);
  }
};

// getObject() يرجع Class instance (Category) → هذا يسبب تحذير Non-serializable.

// dispatch فقط يحدث الـ Redux state محلياً، لا يرسل البيانات للـ backend.
//   // let newCategory = getObject();
  // dispatch(CategoriesActions.create(newCategory));
  //   clear();
  //   navigate("/cms/categories"); // <-- زر كانسل يذهب للكاتيجوريز
}

let clear=()=>{
  titleRef.current!.value = "";
  briefInfoRef.current!.value = "";

};
  return (
    <section className="content">
      <div className="content-header">
        <span>New Categories</span>
      </div>
      <div className="content-body">
        <section className="create-item">
          <form className="create-item_form" onSubmit={onSubmitHandler}>
            <div className="create-item_form_content">
              <section className="create-item_left">
                <div className="form-group">
                  <label htmlFor="blog-title">Categories Title</label>
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
                  <label htmlFor="blog-info">Brief info </label>
                  <input
                    type="text"
                    className="form-input"
                    name="brief-info"
                    id="brief-info"
                    placeholder="Brief Info "
                    ref={briefInfoRef}
                  />
                </div>
                {/* <div className="form-group">
                  <label htmlFor="categories">Category</label>
                  <select
                    name="categories"
                    id="categories"
                    className="form-select"
                    ref={categoryRef}
                  >
                    <option value="c-1">Category 1</option>
                    <option value="c-2">Category 2</option>
                    <option value="c-3">Category 3</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="blog-title">Image</label>
                  <input
                    type="file"
                    className="form-input file-input"
                    name="publisher-name"
                    id="publisher-name"
                    placeholder="Publisher Name"
                  />
                </div> */}
              </section>
              {/* <section className="create-item_right">
                <div className="form-group">
                  <label htmlFor="blog-description">Description</label>
                  <textarea
                    className="form-textarea"
                    id="blog-description"
                    rows="11"
                    placeholder="Write description"
                  ></textarea>
                </div>
              </section> */}
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
export default NewCategories;
