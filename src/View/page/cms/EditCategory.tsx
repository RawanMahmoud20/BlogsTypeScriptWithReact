import React, { useRef } from "react";
import Blog from "../../../models/Blog";
import { CategoriesActions } from "../../../redux/slices/categories-slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Category from "../../../models/Category";
import categoriesApiController from './../../../controller/categories-api-controller';
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";


interface RootState {
    categories: { data: Category[] };
  };


let EditCategory:React.FC = () => {


//   استدعاء الكاتيجوري المحددة

// قبل كل شيء، بدنا نعرف أي كاتيجوري بدنا نعدلها.
// يعني نستقبل id من useParams() مثلاً:
let { id } = useParams<{ id: string }>();

  let titleRef=useRef<HTMLInputElement>(null);
  let briefInfoRef=useRef<HTMLInputElement>(null);
  let dispatch=useDispatch();
   let navigate = useNavigate(); 

//  جلب الكاتيجوري من الـ Redux أو API
let category = useSelector((state: RootState) =>
  state.categories.data.find((cat) => cat.id === Number(id))
);
//  تعبئة الحقول القديمة في الفورم
useEffect(() => {
  if (category) {
    titleRef.current!.value = category.name;
    briefInfoRef.current!.value = category.slug;
  }
}, [category]);


let onSubmitHandler=(event: React.FormEvent)=>{
  event.preventDefault();
  if(cheackData()){
    Save();
  
  }
  
};
let cheackData=()=>{
  if(
     titleRef.current&&
     briefInfoRef.current&&
    titleRef.current.value.trim()  !="" && 
    briefInfoRef.current.value.trim()  !="" 
  ){
    return true;
  }
  alert("All fields are required");
  return false;
};

  // حفظ البيانات في Redux
let Save=async()=>{
if(!titleRef.current || !briefInfoRef.current) return;
let newCategory={
  name:titleRef.current.value.trim(),
  slug: briefInfoRef.current.value.trim()
};
try{
   //  استدعاء الـ API
  const api = new categoriesApiController();
  const response= await api.create(newCategory as any);
 if(response && response.status !== false){
        const categoryToAdd = new Category(
        response.data?.id || Date.now(), // إذا API رجعت id استخدمه، وإلا استخدم تاريخ اليوم كـ id فريد
        newCategory.name,
        newCategory.slug
      );
      dispatch(CategoriesActions.update(categoryToAdd));
      clear();
      navigate("/cms/categories");
    } else {
      alert("حدث خطأ أثناء الإضافة: " + response?.message);
    }  } catch (error: any){ {
     console.error(error);
    alert("حدث خطأ أثناء الإضافة: " + error.message);
  }
}
  // let newCategory = getObject();
  // dispatch(CategoriesActions.create(newCategory));
  //   clear(); 
  //   navigate("/cms/categories"); // العودة بعد الحفظ

}
  // مسح القيم من الفورم

let clear=()=>{
  titleRef.current!.value = "";
  briefInfoRef.current!.value = "";

};

 let cancelHandler = () => {
    navigate("/cms/categories"); // <-- زر كانسل يذهب للكاتيجوريز
  };
  return (
    <section className="content">
      <div className="content-header">
        <span>Edit Category</span>
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
              <button
                className="form-action"
                type="button"
                onClick={cancelHandler}
              >
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
export default EditCategory;
