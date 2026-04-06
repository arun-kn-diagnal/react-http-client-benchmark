/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const instance = axios.create({
  baseURL: "https://api-entertainment-v1.enlight.diagnal.com/content/filters/KIDS-AND-FAMILY?origin=enhance&origin=vcms&source=enhance&region=IN&maxParentalRatings=UA&language=en-US&platform=web",
});
const inst=axios.create({baseURL:"https://jsonplaceholder.typicode.com/posts"})
export const AxiosService = (method:"GET"|"POST",body?:any) => {
  if(method=="POST"){
     console.log(body)
    return inst.post("",body);
   
  }
 return instance.get("");}
export const AxiosServiceNoParse = (method:"GET"|"POST",body?:any) => {
  if(method=="POST"){
    return inst.post("",body)
  }
  return instance.get("", { responseType: "text" });
}
