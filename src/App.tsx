import AxiosService from "./Services/AxiosService";
import GetBenchmarkMetrics from "./Hooks/UseBenchmark";
import kyService from "./Services/kyService";
import RedAxiosService from "./Services/RedAxiosService";

import WretchService from "./Services/WretchService";
import GetBenchmarkMetricsFetch from "./Hooks/UseBenchmarkFetch";
// import { useEffect } from "react";

const App = () => {
  const runAxios = async () => {
    const res = await GetBenchmarkMetrics(AxiosService(), { iteration: 50, concurrent: 10 });
    console.table(res);
  };

  const runKy = async () => {
    const res = await GetBenchmarkMetrics(kyService(), { iteration: 50, concurrent: 10 });
    console.table(res);
  };
  const runRedAxios=async()=>{
     const res = await GetBenchmarkMetrics(RedAxiosService(), { iteration: 50, concurrent: 10 });
    console.table(res);
  }
   const runFetch=async()=>{
     const res = await GetBenchmarkMetricsFetch( { iteration: 50, concurrent: 10 });
    console.table(res);
  }
  const runWretch=async()=>{
     const res = await GetBenchmarkMetrics(WretchService(), { iteration: 50, concurrent: 10 });
    console.table(res);
  }

  // useEffect(()=>{
  //   const runAxios=async()=>{
  //     const res=await GetBenchmarkMetrics(AxiosService(),{iteration:50,concurrent:10})
  //     console.table(res);
  //   }
    
  //   runAxios();
  //   runKy();
  // },[])
  return (
    <div>
      <button onClick={runKy}>Ky</button>
      <button onClick={runAxios}>Axios</button>
        <button onClick={runRedAxios}>RedAxios</button>
        <button onClick={runFetch}>Fetch</button>
        <button onClick={runWretch}>Wretch</button>
    </div>
  );
};

export default App;
