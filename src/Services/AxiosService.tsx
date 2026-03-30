import axios from "axios";

const instance = axios.create({
  baseURL: "https://api-entertainment-v1.enlight.diagnal.com/content/filters/KIDS-AND-FAMILY?origin=enhance&origin=vcms&source=enhance&region=IN&maxParentalRatings=UA&language=en-US&platform=web",
});

export const AxiosService = () => instance.get("");
export const AxiosServiceNoParse = () => instance.get("", { responseType: "text" });
