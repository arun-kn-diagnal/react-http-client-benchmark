import ky from "ky";


const kyService = async () =>{
    const res = await ky.get(
        "https://api-entertainment-v1.enlight.diagnal.com/content/filters/KIDS-AND-FAMILY?origin=enhance&origin=vcms&source=enhance&region=IN&maxParentalRatings=UA&language=en-US&platform=web"
    ).json();
    console.log(res)
    return res;
}

export default kyService;