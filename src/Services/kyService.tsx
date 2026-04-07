/* eslint-disable @typescript-eslint/no-explicit-any */
import ky from "ky";

const base = "https://api-entertainment-v1.enlight.diagnal.com";
const placeholder = "https://jsonplaceholder.typicode.com/posts";
const requestCounter = [0, 0, 0];
type Method = "GET" | "POST" | "PUT";

export const kyAutoparse = async  (method: Method, url: string, body?: any) => {
  if (method === "POST") {
    return ky.post(placeholder,{
        json:body,
    }).json();
  }
  if (method === "PUT") {
    const id = body?.id || "vpr80p5ODLU";
    return ky.put(`${placeholder}/${id}`,{json:body}).json();
  }
   return ky.get(`${base}${url}`).json();
};
export const kyNoparse= async (method: Method, url: string, body?: any) =>{
    if (method === "POST") {
    return ky.post(placeholder,{
        json:body,
    }).text();
  }
  if (method === "PUT") {
    const id = body?.id || "vpr80p5ODLU";
    return ky.put(`${placeholder}/${id}`,{json:body}).text();
  }
   return (await ky.get(`${base}${url}`)).text();
}

const genres = ["DOCUMENTARIES", "TOP-10-MOVIES", "DRAMA", "KIDS-AND-FAMILY", "SPIDER-VERSE"];
const languages = ["en-US", "ar-SA"];
export const kyService = async () => {
  const chance = Math.random();
  if (chance > 0.95) {
    requestCounter[0] += 1;

    // console.log("PUT", requestCounter);
    return await kyAutoparse("PUT", "", { id: 1, lastWatched: Date.now(), status: "completed" });
  }
  if (chance > 0.9) {
    requestCounter[1] += 1;
    // console.log("POST", requestCounter);

    return await kyAutoparse("POST", "", { userId: "Arun", event: "app_launch" });
  }
  const genre = genres[Math.floor(Math.random() * genres.length)];
  const lang = languages[Math.floor(Math.random() * languages.length)];

  const dynamicUrl = `/content/filters/${genre}?origin=enhance&origin=vcms&source=enhance&region=IN&maxParentalRatings=UA&language=${lang}&platform=web`;
  requestCounter[2] += 1;
  // console.log(dynamicUrl, "Get", genre, ",", lang, requestCounter);
  return await kyAutoparse("GET", dynamicUrl);
};

export const kyServicenoParse = async () => {
  const chance = Math.random();
  if (chance > 0.95) {
    requestCounter[0] += 1;

    // console.log("PUT", requestCounter);
    return await kyNoparse("PUT", "", { id: 1, lastWatched: Date.now(), status: "completed" });
  }
  if (chance > 0.9) {
    requestCounter[1] += 1;
    // console.log("POST", requestCounter);

    return await kyNoparse("POST", "", { userId: "Arun", event: "app_launch" });
    }
  const genre = genres[Math.floor(Math.random() * genres.length)];
  const lang = languages[Math.floor(Math.random() * languages.length)];

  const dynamicUrl = `/content/filters/${genre}?origin=enhance&origin=vcms&source=enhance&region=IN&maxParentalRatings=UA&language=${lang}&platform=web`;
  requestCounter[2] += 1;
  // console.log(dynamicUrl, "Get", genre, ",", lang, requestCounter);
  return await kyNoparse("GET", dynamicUrl);
};


