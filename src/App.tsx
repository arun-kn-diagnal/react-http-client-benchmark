/* eslint-disable react-hooks/refs */

import GetBenchmarkMetrics from "./Hooks/UseBenchmark";
import "./App.css";
import { XmlService, XmlServiceNoParse } from "./Services/XmlService";
import { rtkApi } from "./Services/rtkqService";

import { WretchService, WretchServiceNoParse } from "./Services/WretchService";

import { FocusContext, init, useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { useEffect } from "react";
import { FetchService, FetchServiceNoParse } from "./Services/FetchService";
import { AxiosService, AxiosServiceNoParse } from "./Services/AxiosService";
import { RedAxiosService, RedAxiosServiceNoParse } from "./Services/RedAxiosService";
import { kyService, kyServiceNoparse } from "./Services/kyService";
// import { useEffect } from "react";
init({ debug: false, visualDebug: false });
const App = () => {
  const { ref, focused } = useFocusable({ trackChildren: true });

  const btn1 = useFocusable({
    onEnterPress: () => {
      runAxios();
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
  const btn3 = useFocusable({
    onEnterPress: () => {
      runKy();
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
      runKyNoparse();
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
      runredAxiosNoJson();
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
  const btn8 = useFocusable({
    onEnterPress: () => {
      runRTKQRaw();
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
      runWretch();
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
      runWretchNoParse();
    },
    onArrowPress: (direction) => {
      if (direction == "right" || direction == "left") {
        return true;
      } else {
        return false;
      }
    },
  });
  const btn11 = useFocusable({
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
  const btn12 = useFocusable({
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

  const btn13 = useFocusable({
    onEnterPress: () => {
      runXmlNoparse();
    },
    onArrowPress: (direction) => {
      if (direction == "right" || direction == "left") {
        return true;
      } else {
        return false;
      }
    },
  });
  const btn14 = useFocusable({
    onEnterPress: () => {
      runFetchNoParse();
    },
    onArrowPress: (direction) => {
      if (direction == "right" || direction == "left") {
        return true;
      } else {
        return false;
      }
    },
  });

  const runAxios = async () => {
    console.log("Starting Standard Axios...");
    const response = await GetBenchmarkMetrics(AxiosService, { iteration: 50, concurrent: 5 });
    console.table(response);
  };

  //running after disabling json parsing
  const runAxiosNoJson = async () => {
    console.log("Starting No-Parse Axios...");
    const response = await GetBenchmarkMetrics(AxiosServiceNoParse, { iteration: 50, concurrent: 5 });
    console.table(response);
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
  const [triggerAuto] = rtkApi.useLazyGetMoviesQuery();
  const [triggerManual] = rtkApi.useLazyGetRawMoviesQuery();

  const runRTKQ = async () => {
    console.log("Starting RTK Query Benchmark...");
    const rtkTask = async () => {
      const result = await triggerAuto(undefined, false).unwrap();

      console.log(result);
      return { data: result };
    };
    const response = await GetBenchmarkMetrics(rtkTask, { iteration: 50, concurrent: 10 });
    console.table(response);
  };
  const runRTKQRaw = async () => {
    console.log("Starting RTK Query no-parse Benchmark...");
    const rtkTask = async () => {
      const result = await triggerManual(undefined, false).unwrap();
      console.log(result);
      return { data: result };
    };
    const response = await GetBenchmarkMetrics(rtkTask, { iteration: 50, concurrent: 10 });
    console.table(response);
  };

  const runredAxiosNoJson = async () => {
    console.log("Starting  No-Parse reAxios Benchmark...");
    const response = await GetBenchmarkMetrics(RedAxiosService, { iteration: 50, concurrent: 5 });

    console.table(response);
  };

  const runRedAxios = async () => {
    console.log("Starting redAxios Benchmark...");
    const response = await GetBenchmarkMetrics(RedAxiosServiceNoParse, { iteration: 50, concurrent: 5 });

    console.table(response);
  };
  const runFetch = async () => {
    console.log("Starting fetch Benchmark...");
    const response = await GetBenchmarkMetrics(() => FetchService("GET"), { iteration: 50, concurrent: 10 });
    const resp = await GetBenchmarkMetrics(
      () =>
        FetchService("POST", {
          userId: 1,
          id: Math.random(),
          title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
        }),
      { iteration: 50, concurrent: 10 },
    );
    console.table(response);
    console.table(resp);
  };
  const runFetchNoParse = async () => {
    console.log("Starting fetch no parsing Benchmark...");
    const response = await GetBenchmarkMetrics(() => FetchServiceNoParse("GET"), { iteration: 50, concurrent: 10 });
    const resp = await GetBenchmarkMetrics(
      () =>
        FetchServiceNoParse("POST", {
          userId: 1,
          id: Math.random(),
          title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
        }),
      { iteration: 50, concurrent: 10 },
    );
    console.table(response);
    console.table(resp);
  };

  const runWretch = async () => {
    console.log("Starting wretch Benchmark...");

    const response = await GetBenchmarkMetrics(() => WretchService("GET"), { iteration: 50, concurrent: 10 });
    const resp = await GetBenchmarkMetrics(
      () =>
        WretchService("POST", {
          userId: 1,
          id: Math.random(),
          title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
        }),
      { iteration: 50, concurrent: 10 },
    );

    console.table(response);
    console.table(resp);
  };
  const runWretchNoParse = async () => {
    console.log("starting wretch no parsing benchmark");

    const response = await GetBenchmarkMetrics(() => WretchServiceNoParse("GET"), { iteration: 50, concurrent: 10 });
    const resp = await GetBenchmarkMetrics(
      () =>
        WretchServiceNoParse("POST", {
          userId: 1,
          id: Math.random(),
          title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
        }),
      { iteration: 5, concurrent: 1 },
    );
    console.table(response);
    console.table(resp);
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
        <button
          style={{
            padding: "16px 32px",
            backgroundColor: focused ? "#0066cc" : "#333",
            color: "white",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          ref={btn1.ref}
          onClick={runAxios}
        >
          Run Axios
        </button>
        <button
          style={{
            padding: "16px 32px",
            backgroundColor: focused ? "#0066cc" : "#333",
            color: "white",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          ref={btn2.ref}
          onClick={runAxiosNoJson}
        >
          Axios(No parse)
        </button>

        <button
          style={{
            padding: "16px 32px",
            backgroundColor: focused ? "#0066cc" : "#333",
            color: "white",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          ref={btn3.ref}
          onClick={runKy}
        >
          Run Ky
        </button>
        <button
          style={{
            padding: "16px 32px",
            backgroundColor: focused ? "#0066cc" : "#333",
            color: "white",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          ref={btn4.ref}
          onClick={runKyNoparse}
        >
          ky(No parse)
        </button>

        <button
          style={{
            padding: "16px 32px",
            backgroundColor: focused ? "#0066cc" : "#333",
            color: "white",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          ref={btn5.ref}
          onClick={runRedAxios}
        >
          RedAxios
        </button>
        <button
          style={{
            padding: "16px 32px",
            backgroundColor: focused ? "#0066cc" : "#333",
            color: "white",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          ref={btn6.ref}
          onClick={runredAxiosNoJson}
        >
          redAx(No parse)
        </button>

        <button
          style={{
            padding: "16px 32px",
            backgroundColor: focused ? "#0066cc" : "#333",
            color: "white",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          ref={btn7.ref}
          onClick={runRTKQ}
        >
          Run RTK Query
        </button>
        <button
          style={{
            padding: "16px 32px",
            backgroundColor: focused ? "#0066cc" : "#333",
            color: "white",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          ref={btn8.ref}
          onClick={runRTKQRaw}
        >
          Run RTK Query ( no parse )
        </button>

        <button
          style={{
            padding: "16px 32px",
            backgroundColor: focused ? "#0066cc" : "#333",
            color: "white",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          ref={btn9.ref}
          onClick={runWretch}
        >
          Wretch
        </button>
        <button
          style={{
            padding: "16px 32px",
            backgroundColor: focused ? "#0066cc" : "#333",
            color: "white",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          ref={btn10.ref}
          onClick={runWretchNoParse}
        >
          Wretch no parsing
        </button>

        <button
          style={{
            padding: "16px 32px",
            backgroundColor: focused ? "#0066cc" : "#333",
            color: "white",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          ref={btn11.ref}
          onClick={runFetch}
        >
          Fetch
        </button>
        <button
          style={{
            padding: "16px 32px",
            backgroundColor: focused ? "#0066cc" : "#333",
            color: "white",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          ref={btn14.ref}
          onClick={runFetchNoParse}
        >
          Fetch (no parsing)
        </button>

        <button
          style={{
            padding: "16px 32px",
            backgroundColor: focused ? "#0066cc" : "#333",
            color: "white",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          ref={btn12.ref}
          onClick={runXml}
        >
          Run XMLHttpRequest
        </button>
        <button
          style={{
            padding: "16px 32px",
            backgroundColor: focused ? "#0066cc" : "#333",
            color: "white",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          ref={btn13.ref}
          onClick={runXmlNoparse}
        >
          Ryn XMLhttprequest (no parsing)
        </button>
      </FocusContext.Provider>
    </div>
  );
};

export default App;
