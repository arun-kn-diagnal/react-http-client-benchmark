/* eslint-disable @typescript-eslint/no-explicit-any */
import wretch from "wretch";
const instance = wretch(
  "https://api-entertainment-v1.enlight.diagnal.com/content/filters/KIDS-AND-FAMILY?origin=enhance&origin=vcms&source=enhance&region=IN&maxParentalRatings=UA&language=en-US&platform=web",
);
const inst=wretch("https://jsonplaceholder.typicode.com/posts")
export const WretchService = async (method:"GET"|"POST",body?:any) => {
  if(method=="POST"){
    
  
  return inst.post(body).json();

  }
  return instance.get().json();
};

export const WretchServiceNoParse = async (method:"GET"|"POST",body?:any) => {
    if(method=="POST"){
    
  
  return inst.post(body).json();

  }
  return instance.get().text();
};
