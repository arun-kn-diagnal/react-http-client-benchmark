/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
const base="https://api-entertainment-v1.enlight.diagnal.com";
const placeholder= "https://jsonplaceholder.typicode.com/posts";
const requestCounter=[0,0,0];
type Method="GET"|"POST"|"PUT";

export const FetchAutoparse = async (method:Method,url:string,body?:any) => {
  if(method=="POST"){
    return fetch(placeholder,{
      method:"POST",
      headers:{"Content-type":"application/json"},
      body:JSON.stringify(body),

    }).then((res)=>res.json())
  }

  if(method=="PUT"){
    const id=body?.id||1;
    return fetch(`${placeholder}/${id}`,
      {
        method:"PUT",
      headers:{"Content-type":"application/json"},
      body:JSON.stringify(body),

    }).then((res)=>res.json())
      
  }
  return fetch(`${base}${url}`).then((res)=>res.json());
};

export const FetchNoParse = async (method:Method,url:string,body?:any) => {
  if(method=="POST"){
    return fetch(placeholder,{
      method:"POST",
      headers:{"Content-type":"application/json"},
      body:JSON.stringify(body),

    }).then((res)=>res.text())
  }
if(method=="PUT"){
    const id=body?.id||1;
    return fetch(`${placeholder}/${id}`,
      {
        method:"PUT",
      headers:{"Content-type":"application/json"},
      body:JSON.stringify(body),

    }).then((res)=>res.text())
      
  }
   return fetch(`${base}${url}`).then((res)=>res.text());
 };
const genres = ["DOCUMENTARIES", "TOP-10-MOVIES", "DRAMA", "KIDS-AND-FAMILY", "SPIDER-VERSE"];
const languages = ["en-US", "ar-SA"];
export const FetchService=async ()=>{
  const chance=Math.random();
  if (chance > 0.95) {
      requestCounter[0] += 1;
  
      // console.log("PUT", requestCounter);
      return{response:await FetchAutoparse("PUT", "", { id: 1, lastWatched: Date.now(), status: "completed" }),counter:requestCounter};
    } 
     if (chance > 0.9) {
      requestCounter[1] += 1;
      // console.log("POST", requestCounter);
  
      return await FetchAutoparse("POST", "", { userId: "Arun", event: "app_launch" });
    } 
      const genre = genres[Math.floor(Math.random() * genres.length)];
      const lang = languages[Math.floor(Math.random() * languages.length)];
  
      const dynamicUrl = `/content/filters/${genre}?origin=enhance&origin=vcms&source=enhance&region=IN&maxParentalRatings=UA&language=${lang}&platform=web`;
      requestCounter[2] += 1;
      // console.log(dynamicUrl, "Get", genre, ",", lang, requestCounter);
      return await FetchAutoparse("GET",dynamicUrl);
    
  
}

export const FetchServicenoParse=async ()=>{
  const chance=Math.random();
  if (chance > 0.95) {
      requestCounter[0] += 1;
  
      // console.log("PUT", requestCounter);
      return await FetchNoParse("PUT", "", { id: 1, lastWatched: Date.now(), status: "completed" });
    } 
     if (chance > 0.9) {
      requestCounter[1] += 1;
      // console.log("POST", requestCounter);
  
      return  await FetchNoParse("POST", "", { userId: "Arun", event: "app_launch" });
    } 
      const genre = genres[Math.floor(Math.random() * genres.length)];
      const lang = languages[Math.floor(Math.random() * languages.length)];
  
      const dynamicUrl = `/content/filters/${genre}?origin=enhance&origin=vcms&source=enhance&region=IN&maxParentalRatings=UA&language=${lang}&platform=web`;
      requestCounter[2] += 1;
      // console.log(dynamicUrl, "Get", genre, ",", lang, requestCounter);
      return await FetchNoParse("GET",dynamicUrl);
    
  
}