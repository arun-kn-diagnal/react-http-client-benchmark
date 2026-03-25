import AxiosService from "./Services/AxiosService";
import GetBenchmarkMetrics from "./Hooks/UseBenchmark";
import kyService from "./Services/kyService";
import XmlService from "./Services/XmlService";
import { rtkApi } from "./Services/rtkqService";
import RedAxiosService from "./Services/RedAxiosService";

import WretchService from "./Services/WretchService";
import GetBenchmarkMetricsFetch from "./Hooks/UseBenchmarkFetch";
// import { useEffect } from "react";

const App = () => {
  const [trigger] = rtkApi.useLazyGetMoviesQuery();

  const runAxios = async () => {
    console.log("Starting Axios Benchmark...");
    const res = await GetBenchmarkMetrics(AxiosService(), { iteration: 50, concurrent: 10 });
    console.table(res);
  };

  const runKy = async () => {
    console.log("Starting Ky Benchmark...");
    const res = await GetBenchmarkMetrics(kyService(), { iteration: 50, concurrent: 10 });
    console.table(res);
  };

  const runXml = async () => {
    console.log("Starting XMLHttpRequest Benchmark...");
    const res = await GetBenchmarkMetrics(XmlService(), { iteration: 50, concurrent: 10 });
    console.table(res);
  };

  const runRTKQ = async () => {
    console.log("Starting RTK Query Benchmark...");
    const rtkTask = async () => {
      const result = await trigger(undefined, false).unwrap();
      return { data: result };
    };
    const res = await GetBenchmarkMetrics(rtkTask(), { iteration: 50, concurrent: 10 });
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
    <div style={{ padding: "20px", display: "flex", gap: "10px" }}>
        <button onClick={runKy}>Run Ky</button>
        <button onClick={runAxios}>Run Axios</button>
        <button onClick={runRTKQ}>Run RTK Query</button>
        <button onClick={runXml}>Run XMLHttpRequest</button>
        <button onClick={runRedAxios}>RedAxios</button>
        <button onClick={runFetch}>Fetch</button>
        <button onClick={runWretch}>Wretch</button>
    </div>
  );
};

export default App;