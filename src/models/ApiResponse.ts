class ApiResponse{
  public  status: boolean;
   public  message: string;
 public data?: any
    
    constructor(message: string, status: boolean, data?:any) {
        this.message = message;
        this.status = status;
        this.data = data;
    }
}
export default ApiResponse;

// class ApiResponse {
//   constructor(public message: string, public status: boolean) {}
// }
// export default ApiResponse;
