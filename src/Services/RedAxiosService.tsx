import axios from "redaxios"
 const instance=axios.create({baseURL:"https://api-entertainment-v1.enlight.diagnal.com"})
const RedAxiosService =async () => {
   const response=instance.get('/content/filters/KIDS-AND-FAMILY?origin=enhance&origin=vcms&source=enhance&region=IN&maxParentalRatings=UA&language=en-US&platform=web');
  return response;
}

export default RedAxiosService