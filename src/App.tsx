/* eslint-disable react-hooks/refs */

import GetBenchmarkMetrics from "./Hooks/UseBenchmark";

import { XmlService, XmlServiceNoParse } from "./Services/XmlService";
import { rtkApi } from "./Services/rtkqService";

import { WretchService, WretchServiceNoParse } from "./Services/WretchService";

import { FocusContext, init, useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { useEffect } from "react";
import FetchService from "./Services/FetchService";
import { AxiosService, AxiosServiceNoParse } from "./Services/AxiosService";
import { RedAxiosService, RedAxiosServiceNoParse } from "./Services/RedAxiosService";
import { kyService, kyServiceNoparse } from "./Services/kyService";
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
  const btn8 = useFocusable({
    onEnterPress: () => {
      runAxiosNoJson();
    },
    onArrowPress: (direction) => {
      if (direction == "right" || direction == "left") {
        return true;
      } else {
        return false;
      }
    },
  });
  const btn9 = useFocusable({
    onEnterPress: () => {
      runredAxiosNoJson();
    },
    onArrowPress: (direction) => {
      if (direction == "left" || direction == "right") {
        return true;
      } else {
        return false;
      }
    },
  });
  const btn10 = useFocusable({
    onEnterPress: () => {
      runKyNoparse();
    },
    onArrowPress: (direction) => {
      if (direction == "left") {
        return true;
      } else {
        return false;
      }
    },
  });
  const btn11 = useFocusable({
    onEnterPress: () => {
      runXmlNoparse();
    },
    onArrowPress: (direction) => {
      if (direction == "left") {
        return true;
      } else {
        return false;
      }
    },
  });
  const btn12 = useFocusable({
    onEnterPress: () => {
      runWretchNoParse();
    },
    onArrowPress: (direction) => {
      if (direction == "left") {
        return true;
      } else {
        return false;
      }
    },
  });
  // runWretchNoParse
  const [trigger] = rtkApi.useLazyGetMoviesQuery();

  const runAxios = async () => {
    console.log("Starting Standard Axios...");
    const res1 = await GetBenchmarkMetrics(AxiosService, { iteration: 50, concurrent: 5 });
    console.table(res1);
  };

  //running after disabling json parsing
  const runAxiosNoJson = async () => {
    console.log("Starting No-Parse Axios...");
    const res2 = await GetBenchmarkMetrics(AxiosServiceNoParse, { iteration: 50, concurrent: 5 });
    console.table(res2);
  };

  const runKyNoparse = async () => {
    console.log("Starting Ky no-parse Benchmark...");
    const response = await GetBenchmarkMetrics(kyServiceNoparse, { iteration: 50, concurrent: 10 });
    console.table(response);
  };
  const runKy = async () => {
    console.log("Starting Ky Benchmark...");
    const response = await GetBenchmarkMetrics(kyService, { iteration: 50, concurrent: 10 });
    console.table(response);
  };
  const runXml = async () => {
    console.log("Starting XMLHttpRequest Benchmark...");
    const response = await GetBenchmarkMetrics(XmlService, { iteration: 50, concurrent: 10 });
    console.table(response);
  };

  const runXmlNoparse = async () => {
    console.log("Starting XMl benchmarking ");
    const response = await GetBenchmarkMetrics(XmlServiceNoParse, { iteration: 50, concurrent: 10 });
    console.table(response);
  };
  const runRTKQ = async () => {
    console.log("Starting RTK Query Benchmark...");
    const rtkTask = async () => {
      const result = await trigger(undefined, false).unwrap();
      return { data: result };
    };
    const response = await GetBenchmarkMetrics(rtkTask, { iteration: 50, concurrent: 10 });
    console.table(response);
  };

  const runredAxiosNoJson = async () => {
    console.log("Starting  No-Parse reAxios Benchmark...");
    const response = await GetBenchmarkMetrics(RedAxiosServiceNoParse, { iteration: 50, concurrent: 10 });
    console.table(response);
  };

  const runRedAxios = async () => {
    console.log("Starting redAxios Benchmark...");
    const response = await GetBenchmarkMetrics(RedAxiosService, { iteration: 50, concurrent: 10 });
    console.table(response);
  };
  const runFetch = async () => {
    console.log("Starting fetch Benchmark...");
    const response = await GetBenchmarkMetrics(FetchService, { iteration: 50, concurrent: 10 });
    console.table(response);
  };
  const runWretch = async () => {
    console.log("Starting wretch Benchmark...");
    const response = await GetBenchmarkMetrics(WretchService, { iteration: 50, concurrent: 10 });
    console.table(response);
  };
  const runWretchNoParse = async () => {
    console.log("starting wretch no parsing benchmark");
    const response = await GetBenchmarkMetrics(WretchServiceNoParse, { iteration: 50, concurrent: 10 });
    console.table(response);
  };

  useEffect(() => {
    btn1.focusSelf();
  }, []);
  // useEffect(()=>{
  //   const runAxios=async()=>{
  //     const res=await GetBenchmarkMetrics(AxiosService(),{iteration:50,concurrent:10})
  //     console.table(response);
  //   }

  //   runAxios();
  //   runKy();
  // },[])
  return (
    <div ref={ref} style={{ padding: "20px", display: "flex", gap: "10px" }}>
      <FocusContext.Provider value="SN:ROOT">
        <button ref={btn2.ref} onClick={runAxios}>
          Run Axios
        </button>
        <button ref={btn8.ref} onClick={runAxiosNoJson}>
          Axios(No parse)
        </button>

        <button ref={btn1.ref} onClick={runKy}>
          Run Ky
        </button>
        <button ref={btn10.ref} onClick={runKyNoparse}>
          ky(No parse)
        </button>

        <button ref={btn5.ref} onClick={runRedAxios}>
          RedAxios
        </button>
        <button ref={btn9.ref} onClick={runredAxiosNoJson}>
          redAx(No parse)
        </button>

        <button ref={btn3.ref} onClick={runRTKQ}>
          Run RTK Query
        </button>

        <button ref={btn7.ref} onClick={runWretch}>
          Wretch
        </button>
        <button ref={btn12.ref} onClick={runWretchNoParse}>
          Wretch no parsing
        </button>

        <button ref={btn6.ref} onClick={runFetch}>
          Fetch
        </button>

        <button ref={btn4.ref} onClick={runXml}>
          Run XMLHttpRequest
        </button>
        <button ref={btn11.ref} onClick={runXmlNoparse}>
          Ryn XMLhttprequest (no parsing)
        </button>
      </FocusContext.Provider>
    </div>
  );
};

export default App;
