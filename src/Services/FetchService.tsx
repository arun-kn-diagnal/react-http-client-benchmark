/* eslint-disable @typescript-eslint/no-explicit-any */
export const FetchService = async (method:"GET"|"POST",body?:any) => {
  const url = "https://jsonplaceholder.typicode.com/posts";
  //    let errorCount=0;

  return (await fetch(url,{method,body:method=="POST"?JSON.stringify(body):undefined})).json();
};

export const FetchServiceNoParse = async (method:"GET"|"POST",body?:any) => {
  const url = "https://jsonplaceholder.typicode.com/posts";
  //    let errorCount=0;

  return (await fetch(url,{method,body:method=="POST"?JSON.stringify(body):undefined})).text();
};
