import axios from "axios";
import ApiResponse from "../models/ApiResponse";
import Category from "../models/Category";


type categoryResponse= {
  id: number;
  name: string;
  slug: string;
  image?: string;
};

class categoriesApiController{
  private errorResponse=()=> new ApiResponse("something went wrong , try again", false);
  constructor() {
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = "http://localhost:8000";
  }


  create = async(category: Category) => {
  // جلب CSRF token
  let csrfRes = await axios.get("/csrf-token", { withCredentials: true });
  localStorage.setItem("csrfToken", csrfRes.data.csrfToken);

  try {
    let response = await axios.post(
      `/api/v1/categories`,
      {
        name: category.name,
        slug: category.slug
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "x-csrf-token": localStorage.getItem("csrfToken"),
        },
        withCredentials: true,
      }
    );

    if (response.status === 201 || response.status === 400) {
     console.log(localStorage.getItem("token"));

      return new ApiResponse(
        response.data.message || "Category created",
        response.data.success
      );
    }
  } catch (error) {
    return this.errorResponse();
  }
};




read = async()=>{

    try {
        let response = await axios.get(`/api/v1/categories`);
        if(response.status == 200){
            // when get data in form
           // بدل ما نرجع ApiResponse، رجع array من plain objects
          const categories = response.data.data.map((el: categoryResponse) => ({
            id: el.id,
            name: el.name,
            slug: el.slug,
            image: el.image
          }));
          return categories;
        }
        return []; // لو مافي data
      } catch (error:unknown) {
      if (axios.isAxiosError(error)) {
             // إذا كان الخطأ Axios  
        console.error("Axios error:", error.response?.data || error.message);
        } else if (error instanceof Error) {
            // إذا كان خطأ عادي
          console.error("General error:", error.message);
        } else {
          console.error("Unknown error:", error);
        }
        // console.error("Axios error:", (error as any).response || (error as any).message);
        return [];
      }
};
delete = async (id: number) => {

  try {
  // get token and csrfToken from localStorage
   let csrfRes = await axios.get("/csrf-token", { withCredentials: true });
    localStorage.setItem("csrfToken", csrfRes.data.csrfToken);

    console.log("Using csrfToken:", csrfRes.data.csrfToken);
    
    console.log("Sending delete request with:", {
      token: localStorage.getItem("token"),
      csrfToken: localStorage.getItem("csrfToken"),
    });

    let response = await axios.delete(`/api/v1/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // JWT
        "x-csrf-token": localStorage.getItem("csrfToken"),        // CSRF
      },
      withCredentials: true,
    });
    console.log("Delete API raw response:", response);
    if (response.status === 200 || response.status === 204) {
      return new ApiResponse("Category deleted successfully", true);
    }else {
      return new ApiResponse("Failed to delete category", false);
    }
  } catch (error:unknown) {
    console.error("Delete error:", (error as any).response?.data || (error as any).message);
    return this.errorResponse();
  }
};

update = async (id: number, category: Category) => {
  // أولاً: جيبي CSRF Token
  let csrfRes = await axios.get("/csrf-token", { withCredentials: true });
  localStorage.setItem("csrfToken", csrfRes.data.csrfToken);

  try {
    // أرسلي التحديث إلى السيرفر
    let response = await axios.put(
      `/api/v1/categories/${id}`,
      {
        name: category.name,
        slug: category.slug,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "x-csrf-token": localStorage.getItem("csrfToken"),
        },
        withCredentials: true,
      }
    );

    // تحققي من الحالة
    if (response.status === 200) {
      return new ApiResponse(
        response.data.message || "Category updated successfully",
        response.data.success
      );
    } else {
      return new ApiResponse("Failed to update category", false);
    }
  } catch (error) {
    console.error("Update error:", (error as any).response?.data || error);
    return this.errorResponse();
  }
};



}
export default categoriesApiController;
