const XmlService = () => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const url = 'https://api-entertainment-v1.enlight.diagnal.com/content/filters/DOCUMENTARIES?origin=enhance&origin=vcms&source=enhance&region=IN&maxParentalRatings=UA&language=en-US&platform=web';
    
    xhr.open('GET', url);
    
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve({ data: JSON.parse(xhr.responseText) });
      } else {
        reject(new Error(`XHR Error: ${xhr.status}`));
      }
    };
    
    xhr.onerror = () => reject(new Error('XHR Network Error'));
    xhr.send();
  });
};

export default XmlService;