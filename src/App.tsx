/* eslint-disable react-hooks/refs */
import AxiosService from "./Services/AxiosService";
import GetBenchmarkMetrics from "./Hooks/UseBenchmark";
import kyService from "./Services/kyService";
import XmlService from "./Services/XmlService";
import { rtkApi } from "./Services/rtkqService";
import RedAxiosService from "./Services/RedAxiosService";

import WretchService from "./Services/WretchService";

import { FocusContext, init, useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { useEffect } from "react";
import FetchService from "./Services/FetchService";
// import { useEffect } from "react";
init({ debug: false, visualDebug: false });
const App = () => {
  const { ref } = useFocusable({ trackChildren: true });
  const btn1 = useFocusable({
    onEnterPress: () => {
      runKy();
    },
    onArrowPress: (direction) => {
      if (direction == "right") {
        return true;
      } else {
        return false;
      }
    },
  });
  const btn2 = useFocusable({
    onEnterPress: () => {
      runAxios();
    },
    onArrowPress: (direction) => {
      if (direction == "right" || direction == "left") {
        return true;
      } else {
        return false;
      }
    },
  });
  const btn3 = useFocusable({
    onEnterPress: () => {
      runRTKQ();
    },
    onArrowPress: (direction) => {
      if (direction == "right" || direction == "left") {
        return true;
      } else {
        return false;
      }
    },
  });
  const btn4 = useFocusable({
    onEnterPress: () => {
      runXml();
    },
    onArrowPress: (direction) => {
      if (direction == "right" || direction == "left") {
        return true;
      } else {
        return false;
      }
    },
  });
  const btn5 = useFocusable({
    onEnterPress: () => {
      runRedAxios();
    },
    onArrowPress: (direction) => {
      if (direction == "right" || direction == "left") {
        return true;
      } else {
        return false;
      }
    },
  });
  const btn6 = useFocusable({
    onEnterPress: () => {
      runFetch();
    },
    onArrowPress: (direction) => {
      if (direction == "right" || direction == "left") {
        return true;
      } else {
        return false;
      }
    },
  });
  const btn7 = useFocusable({
    onEnterPress: () => {
      runWretch();
    },
    onArrowPress: (direction) => {
      if (direction == "left") {
        return true;
      } else {
        return false;
      }
    },
  });
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

  const runRedAxios = async () => {
    console.log("Starting redAxios Benchmark...");
    const res = await GetBenchmarkMetrics(RedAxiosService(), { iteration: 50, concurrent: 10 });
    console.table(res);
  };
  const runFetch = async () => {
    console.log("Starting fetch Benchmark...");
    const res = await GetBenchmarkMetrics(FetchService(), { iteration: 50, concurrent: 10 });
    console.table(res);
  };
  const runWretch = async () => {
    console.log("Starting wretch Benchmark...");
    const res = await GetBenchmarkMetrics(WretchService(), { iteration: 50, concurrent: 10 });
    console.table(res);
  };
  useEffect(() => {
    btn1.focusSelf();
  }, []);
  // useEffect(()=>{
  //   const runAxios=async()=>{
  //     const res=await GetBenchmarkMetrics(AxiosService(),{iteration:50,concurrent:10})
  //     console.table(res);
  //   }

  //   runAxios();
  //   runKy();
  // },[])
  return (
    <div ref={ref} style={{ padding: "20px", display: "flex", gap: "10px" }}>
      <FocusContext.Provider value="SN:ROOT">
        <button ref={btn1.ref} onClick={runKy}>
          Run Ky
        </button>
        <button ref={btn2.ref} onClick={runAxios}>
          Run Axios
        </button>
        <button ref={btn3.ref} onClick={runRTKQ}>
          Run RTK Query
        </button>
        <button ref={btn4.ref} onClick={runXml}>
          Run XMLHttpRequest
        </button>
        <button ref={btn5.ref} onClick={runRedAxios}>
          RedAxios
        </button>
        <button ref={btn6.ref} onClick={runFetch}>
          Fetch
        </button>
        <button ref={btn7.ref} onClick={runWretch}>
          Wretch
        </button>
      </FocusContext.Provider>
    </div>
  );
};

export default App;
