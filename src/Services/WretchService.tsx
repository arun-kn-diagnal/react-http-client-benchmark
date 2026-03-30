import wretch from "wretch";
const instance = wretch(
  "https://api-entertainment-v1.enlight.diagnal.com/content/filters/KIDS-AND-FAMILY?origin=enhance&origin=vcms&source=enhance&region=IN&maxParentalRatings=UA&language=en-US&platform=web",
);

export const WretchService = async () => {
  let response= await instance.get().res();
  return response;
};

export const WretchServiceNoParse = async () => {
  let response= await instance.get().json();
  return response;
};
