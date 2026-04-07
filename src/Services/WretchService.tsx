/* eslint-disable @typescript-eslint/no-explicit-any */
import wretch from "wretch";
const base = "https://api-entertainment-v1.enlight.diagnal.com";
const placeholder = "https://jsonplaceholder.typicode.com/posts";
const requestCounter = [0, 0, 0];
type Method = "GET" | "POST" | "PUT";

export const WretchAutoParse = async (method: Method, url: string, body?: any) => {
  if (method == "POST") {
    return wretch(placeholder).post(body).json();
  }
  if (method == "PUT") {
    const id = body?.id || 1;
    return wretch(`${placeholder}/${id}`).put(body).json();
  }
  return wretch(`${base}${url}`).get().json();
};

export const WretchNoParse = async (method: Method, url: string, body?: any) => {
  if (method == "POST") {
    return wretch(placeholder).post(body).text();
  }
  if (method == "PUT") {
    const id = body?.id || 1;
    return wretch(`${placeholder}/${id}`).put(body).text();
  }
  return wretch(`${base}${url}`).get().text();
};

const genres = ["DOCUMENTARIES", "TOP-10-MOVIES", "DRAMA", "KIDS-AND-FAMILY", "SPIDER-VERSE"];
const languages = ["en-US", "ar-SA"];
export const wretchService = async () => {
  const chance = Math.random();
  if (chance > 0.95) {
    requestCounter[0] += 1;

    // console.log("PUT", requestCounter);
    return await WretchAutoParse("PUT", "", { id: 1, lastWatched: Date.now(), status: "completed" });
  }
  if (chance > 0.9) {
    requestCounter[1] += 1;
    // console.log("POST", requestCounter);

    return  await WretchAutoParse("POST", "", { userId: "Arun", event: "app_launch" });
  }
  const genre = genres[Math.floor(Math.random() * genres.length)];
  const lang = languages[Math.floor(Math.random() * languages.length)];

  const dynamicUrl = `/content/filters/${genre}?origin=enhance&origin=vcms&source=enhance&region=IN&maxParentalRatings=UA&language=${lang}&platform=web`;
  requestCounter[2] += 1;
  // console.log(dynamicUrl, "Get", genre, ",", lang, requestCounter);
  return  await WretchAutoParse("GET", dynamicUrl);
};

export const wretchServicenoParse = async () => {
  const chance = Math.random();
  if (chance > 0.95) {
    requestCounter[0] += 1;

    // console.log("PUT", requestCounter);
    return  await WretchNoParse("PUT", "", { id: 1, lastWatched: Date.now(), status: "completed" });
  }
  if (chance > 0.9) {
    requestCounter[1] += 1;
    // console.log("POST", requestCounter);

    return await WretchNoParse("POST", "", { userId: "Arun", event: "app_launch" });
  }
  const genre = genres[Math.floor(Math.random() * genres.length)];
  const lang = languages[Math.floor(Math.random() * languages.length)];

  const dynamicUrl = `/content/filters/${genre}?origin=enhance&origin=vcms&source=enhance&region=IN&maxParentalRatings=UA&language=${lang}&platform=web`;
  requestCounter[2] += 1;
  // console.log(dynamicUrl, "Get", genre, ",", lang, requestCounter);
  return await WretchNoParse("GET", dynamicUrl);
};
