import axios from "redaxios";
const instance = axios.create({ baseURL: "https://api-entertainment-v1.enlight.diagnal.com" });
export const RedAxiosService = async () => {
  const response = instance.get("/content/filters/KIDS-AND-FAMILY?origin=enhance&origin=vcms&source=enhance&region=IN&maxParentalRatings=UA&language=en-US&platform=web", { responseType: "json" });
  return response;
};

export const RedAxiosServiceNoParse = async () => {
  const response = instance.get("/content/filters/KIDS-AND-FAMILY?origin=enhance&origin=vcms&source=enhance&region=IN&maxParentalRatings=UA&language=en-US&platform=web", { responseType: "text" });
  return response;
};
