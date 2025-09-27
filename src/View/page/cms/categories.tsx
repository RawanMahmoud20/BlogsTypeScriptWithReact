import { NavLink } from "react-router-dom";
import CategoriesItem from "../../component/cms/CategoriesItem";
import { useDispatch, useSelector } from "react-redux";
import categoriesApiController from "../../../controller/categories-api-controller";
import { CategoriesActions } from "../../../redux/slices/categories-slice";
import { useEffect } from "react";
import AuthApiController from "../../../controller/auth-api-controller";
import filterBtn from "../../../resourse/images/btn_Filter.svg";

import Category from "../../../models/Category";

let Categories: React.FC = () => {

let categories = useSelector(
  (state: { categories: { data: Category[] } }) => state.categories.data
);
let dispatch = useDispatch();

// let fetchCategories = async() =>{
//  let response = await new categoriesApiController().read();
//  dispatch(CategoriesActions.read(response.data));
// };

// useEffect( ()=>{
//   fetchCategories();
// }, [] );

useEffect(() => {
  const fetchCategories = async () => {
    try {
      let loginTest= await new AuthApiController().login(
        "rawan@exa.com",
        "1234566");
      console.log("Login response:", loginTest);
      const response = await new categoriesApiController().read();
      console.log("API response:", response);
      dispatch(CategoriesActions.read(response));
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };
  fetchCategories();
}, [dispatch]);



return (
    <section className="content">
      <div className="content-header">
        <span>All Categories</span>
        <div className="content-header-options">
          <div className="content-header-options_filter">
        <img src={filterBtn} alt="Filter" />
          </div>
          <NavLink className="header-button" to="/cms/categories/new">
            Create New Category
          </NavLink>
        </div> 
      </div>
      <div className="content-body">
        <section className="all-categories">
{/* 
          {
          categories.length >0 
          ?
          categories.map((element)=>(
          <CategoriesItem key={element.id} data={element}/>
          )) 
          :
          <p>No categories found</p>
          } */}

          {Array.isArray(categories) && categories.length > 0 ? (
            categories.map((element) => (
              <CategoriesItem key={element.id} data={element} />
            ))
          ) : (
            <p>No categories found</p>
          )} 
        </section>
      </div>
    </section>
  );
};

export default Categories;
