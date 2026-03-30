export const FetchService = async () => {
  const url = "https://api-entertainment-v1.enlight.diagnal.com/content/filters/KIDS-AND-FAMILY?origin=enhance&origin=vcms&source=enhance&region=IN&maxParentalRatings=UA&language=en-US&platform=web";
  //    let errorCount=0;

  return (await fetch(url)).json();
};

export const FetchServiceNoParse = async () => {
  const url = "https://api-entertainment-v1.enlight.diagnal.com/content/filters/KIDS-AND-FAMILY?origin=enhance&origin=vcms&source=enhance&region=IN&maxParentalRatings=UA&language=en-US&platform=web";
  //    let errorCount=0;

  return (await fetch(url)).text();
};
