import ky from "ky";


export const kyServiceNoparse = async () =>{
    const response= await ky.get(
        "https://api-entertainment-v1.enlight.diagnal.com/content/filters/KIDS-AND-FAMILY?origin=enhance&origin=vcms&source=enhance&region=IN&maxParentalRatings=UA&language=en-US&platform=web"
    );
    return response;
}
export const kyService= async () =>{
    const response= await ky.get(
        "https://api-entertainment-v1.enlight.diagnal.com/content/filters/KIDS-AND-FAMILY?origin=enhance&origin=vcms&source=enhance&region=IN&maxParentalRatings=UA&language=en-US&platform=web"
    ).json();
    return response;
}
