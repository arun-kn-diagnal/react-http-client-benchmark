/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "redaxios";

export const RedAxiosService = async (method:"GET"|"POST",body?:any) => {
  if(method=="POST"){
    return axios({url:"https://jsonplaceholder.typicode.com/posts",data:body,method})
  }
  return axios({url:"https://api-entertainment-v1.enlight.diagnal.com/content/filters/KIDS-AND-FAMILY?origin=enhance&origin=vcms&source=enhance&region=IN&maxParentalRatings=UA&language=en-US&platform=web",  headers:{"Content-Type":"application/json"},method});
};

export const RedAxiosServiceNoParse = async (method:"GET"|"POST",body?:any) => {
   if(method=="POST"){
    return axios({url:"https://jsonplaceholder.typicode.com/posts",data:body,method})
  }
 return axios({url:"https://jsonplaceholder.typicode.com/posts",  headers:{"Content-Type":"application/json"}});
};
