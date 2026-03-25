

const FetchService = async() => {
    const url="https://api-entertainment-v1.enlight.diagnal.com/content/filters/KIDS-AND-FAMILY?origin=enhance&origin=vcms&source=enhance&region=IN&maxParentalRatings=UA&language=en-US&platform=web";
   let errorCount=0;
    const response= fetch(url);
if(! (await response).ok){
    errorCount++;
}
    const start=performance.now();
   const data=await (await response).json();
    const end=performance.now();
    const parsing=end-start;

  return {data,parsing,errorCount}
}

export default FetchService