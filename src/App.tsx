import { useEffect } from "react";
import AxiosService from "./Services/AxiosService";
import GetBenchmarkMetrics from "./Hooks/UseBenchmark";
import kyService from "./Services/kyService";

const App = () => {
  const runAxios = async () => {
    const res = await GetBenchmarkMetrics(AxiosService(), { iteration: 50, concurrent: 10 });
    console.table(res);
  };

  const runKy = async () => {
    const res = await GetBenchmarkMetrics(kyService(), { iteration: 50, concurrent: 10 });
    console.table(res);
  };
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
    </div>
  );
};

export default App;
