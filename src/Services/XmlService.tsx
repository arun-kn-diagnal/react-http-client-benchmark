const requestCounter = [0, 0, 0];
const genres = ["DOCUMENTARIES", "TOP-10-MOVIES", "DRAMA", "KIDS-AND-FAMILY", "SPIDER-VERSE"];
const languages = ["en-US", "ar-SA"];

const xhrRequest = (method: string, url: string, body: any = null, parse: boolean = true): Promise<any> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    
    if (method !== "GET") {
      xhr.setRequestHeader("Content-Type", "application/json");
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const responseData = parse ? JSON.parse(xhr.responseText) : xhr.responseText;
        resolve({ data: responseData });
      } else {
        reject(new Error(`XHR Error: ${xhr.status}`));
      }
    };

    xhr.onerror = () => reject(new Error("XHR Network Error"));
    xhr.send(body ? JSON.stringify(body) : null);
  });
};

export const XmlService = async () => {
  const chance = Math.random();

  if (chance > 0.95) {
    requestCounter[0] += 1;
    const url = "https://jsonplaceholder.typicode.com/posts/1";
    return await xhrRequest("PUT", url, { lastWatched: Date.now() }, true);
  } else if (chance > 0.9) {
    requestCounter[1] += 1;
    const url = "https://jsonplaceholder.typicode.com/posts";
    return await xhrRequest("POST", url, { userId: "Arun", event: "app_launch" }, true);
  } else {
    const genre = genres[Math.floor(Math.random() * genres.length)];
    const lang = languages[Math.floor(Math.random() * languages.length)];
    const dynamicUrl = `https://api-entertainment-v1.enlight.diagnal.com/content/filters/${genre}?origin=enhance&origin=vcms&source=enhance&region=IN&maxParentalRatings=UA&language=${lang}&platform=web`;
    requestCounter[2] += 1;
    return await xhrRequest("GET", dynamicUrl, null, true);
  }
};

export const XmlServiceNoParse = async () => {
  const chance = Math.random();

  if (chance > 0.95) {
    requestCounter[0] += 1;
    const url = "https://jsonplaceholder.typicode.com/posts/1";
    return await xhrRequest("PUT", url, { lastWatched: Date.now() }, false);
  } else if (chance > 0.9) {
    requestCounter[1] += 1;
    const url = "https://jsonplaceholder.typicode.com/posts";
    return await xhrRequest("POST", url, { userId: "Arun", event: "app_launch" }, false);
  } else {
    const genre = genres[Math.floor(Math.random() * genres.length)];
    const lang = languages[Math.floor(Math.random() * languages.length)];
    const dynamicUrl = `https://api-entertainment-v1.enlight.diagnal.com/content/filters/${genre}?origin=enhance&origin=vcms&source=enhance&region=IN&maxParentalRatings=UA&language=${lang}&platform=web`;
    requestCounter[2] += 1;
    return await xhrRequest("GET", dynamicUrl, null, false);
  }
};