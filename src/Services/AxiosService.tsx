import axios from "axios";

const instance = axios.create({
  baseURL: "https://api-entertainment-v1.enlight.diagnal.com/content/filters/KIDS-AND-FAMILY?origin=enhance&origin=vcms&source=enhance&region=IN&maxParentalRatings=UA&language=en-US&platform=web",
});
export const AxiosService=async()=>{
  const res=instance.get("");
  return res;
}
export const AxiosServiceNoParse = async () => {
  const res = instance.get("", { responseType: "text" });

  return res;
};


