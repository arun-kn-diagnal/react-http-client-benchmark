import wretch from 'wretch';
const instance=wretch("https://api-entertainment-v1.enlight.diagnal.com/content/filters/KIDS-AND-FAMILY?origin=enhance&origin=vcms&source=enhance&region=IN&maxParentalRatings=UA&language=en-US&platform=web");
const WretchService = () => {
    const res=instance.get().json()
  return res;
}

export default WretchService