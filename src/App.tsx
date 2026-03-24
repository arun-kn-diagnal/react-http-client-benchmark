
import { useEffect } from "react";
import AxiosService from "./Services/AxiosService";
import GetBenchmarkMetrics from "./Hooks/UseBenchmark";



const App = () => {
  useEffect(()=>{
    const runAxios=async()=>{
      const res=await GetBenchmarkMetrics(AxiosService(),{iteration:50,concurrent:10})
      console.table(res);
    }
    runAxios();
  },[])
  return (
    <div>App</div>
  )
}

export default App