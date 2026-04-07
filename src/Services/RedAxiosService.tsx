/* eslint-disable @typescript-eslint/no-explicit-any */
//@ts-ignore
import axios from "../../node_modules/redaxios/src/index.js";

const instance = axios.create({
  baseURL: "https://api-entertainment-v1.enlight.diagnal.com",
});

const inst = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/posts",
});

const requestCounter = [0, 0, 0];
type Method = "GET" | "POST" | "PUT";

export const AutoParse = async (method: Method, url: string, body?: any) => {
  if (method === "POST") {
    return inst.post("", body);
  }
  if (method === "PUT") {
    const id = body?.id || "vpr80p5ODLU";
    return inst.put(`/${id}`, body);
  }
  return instance.get(url, { responseType: "json" });
};

export const NoParse = async (method: Method, url: string, body?: any) => {
  if (method === "POST") {
    return inst.post("", body);
  }
  if (method === "PUT") {
    const id = body?.id || "vpr80p5ODLU";
    return inst.put(`/${id}`, body);
  }
  return instance.get(url, { responseType: "text" });
};

const genres = ["DOCUMENTARIES", "TOP-10-MOVIES", "DRAMA", "KIDS-AND-FAMILY", "SPIDER-VERSE"];
const languages = ["en-US", "ar-SA"];
export const RedAxiosService = async () => {
  const chance = Math.random();

  if (chance > 0.95) {
    requestCounter[0] += 1;

    // console.log("PUT", requestCounter);
    return AutoParse("PUT", "", { id: 1, lastWatched: Date.now(), status: "completed" });
  } else if (chance > 0.9) {
    requestCounter[1] += 1;
    // console.log("POST", requestCounter);

    return AutoParse("POST", "", { userId: "Arun", event: "app_launch" });
  } else {
    const genre = genres[Math.floor(Math.random() * genres.length)];
    const lang = languages[Math.floor(Math.random() * languages.length)];

    const dynamicUrl = `/content/filters/${genre}?origin=enhance&origin=vcms&source=enhance&region=IN&maxParentalRatings=UA&language=${lang}&platform=web`;
    requestCounter[2] += 1;
    // console.log(dynamicUrl, "Get", genre, ",", lang, requestCounter);
    return AutoParse("GET", dynamicUrl);
  }
};

export const RedAxiosServiceNoParse = async () => {
  const chance = Math.random();

  if (chance > 0.95) {
    requestCounter[0] += 1;

    // console.log("PUT", requestCounter);
    return NoParse("PUT", "", { id: 1, lastWatched: Date.now(), status: "completed" });
  } else if (chance > 0.9) {
    requestCounter[1] += 1;
    // console.log("POST", requestCounter);

    return NoParse("POST", "", { userId: "Arun", event: "app_launch" });
  } else {
    const genre = genres[Math.floor(Math.random() * genres.length)];
    const lang = languages[Math.floor(Math.random() * languages.length)];

    const dynamicUrl = `/content/filters/${genre}?origin=enhance&origin=vcms&source=enhance&region=IN&maxParentalRatings=UA&language=${lang}&platform=web`;
    requestCounter[2] += 1;
    // console.log(dynamicUrl, "Get", genre, ",", lang, requestCounter);
    return NoParse("GET", dynamicUrl);
  }
};
