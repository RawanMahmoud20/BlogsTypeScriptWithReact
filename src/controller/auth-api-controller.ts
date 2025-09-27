import axios from "axios"
import ApiResponse from "../models/ApiResponse";
import User from './../models/User';

class AuthApiController {
  constructor(){
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = "http://localhost:8000";
  }
    private errorResponse = () => new ApiResponse("something went wrong , try again", false);
    requestCsrfToken = async () => {
       
        try {
         let response = await axios.get(`/csrf-token`, {
          withCredentials: true,
          headers: { Accept: "application/json" },
        });
            localStorage.setItem("csrfToken", response.data.csrfToken);

        return response.status == 200;
        } catch (error) {
       return this.errorResponse();

        }  
    }
   login =async (email:string, password:string )=> {
      let cookiesRequest = await this.requestCsrfToken();

      if(cookiesRequest){
        try {
           let response = await axios.post(`/api/v1/auth/login`, {
             email:email,
             password:password,
           },
          {
            withCredentials: true,
            headers: {
              "X-CSRF-Token": localStorage.getItem("csrfToken"),
              Accept: "application/json",
            },
          });

          if (response.status == 200) {
            localStorage.setItem("logged_in", "true");
            // بعد الـ login
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("csrfToken", response.data.csrfToken);

             // return true;
            }
           return new ApiResponse(
              response.data.message || "login successful",
              response.status === 200
            );
          //  return response.status == 200;
        } catch (error) {
         return this.errorResponse();
        }
   
    }
  };
   register = async (user: User) => {
     try {
      let response = await axios.post(`/api/v1/auth/signup`,{
        name: user.name,
        email: user.email,
        password: user.password,
        user_name: user.user_name,
      });
      return new ApiResponse(
        response.data["message"],
        response.data["success"]
      );
     } catch (error) {
       return this.errorResponse();
     }
  };

  logout = async () => {
    try {
      let response = await axios.post(`/api/v1/auth/logout`);
      localStorage.setItem("logged_in", "false");
      return new ApiResponse( "logout successful" ,true);
    } catch (error) {
      return this.errorResponse();
    }
  };
    
//   }

// }

   }

 export default AuthApiController;
