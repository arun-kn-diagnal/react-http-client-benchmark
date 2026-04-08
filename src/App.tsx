/* eslint-disable react-hooks/refs */

import GetBenchmarkMetrics from "./Hooks/UseBenchmark";
import "./App.css";
import { XmlService, XmlServiceNoParse } from "./Services/XmlService";
import { useLazyGetMoviesQuery, useLazyGetMoviesNoParseQuery, rtkApi, benchmarkStore } from "./Services/rtkqService";



import { FocusContext, init, useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { useEffect } from "react";
import { FetchService, FetchServicenoParse } from "./Services/FetchService";
import { AxiosService, AxiosServiceNoParse } from "./Services/AxiosService";
import { RedAxiosService, RedAxiosServiceNoParse } from "./Services/RedAxiosService";
import { kyService, kyServicenoParse } from "./Services/kyService";
import { wretchService, wretchServicenoParse } from "./Services/WretchService";
// import { useEffect } from "react";
import MovieRail from "./extra/ImagesGallery";
init({ debug: false, visualDebug: false });
const App = () => {
  const { ref } = useFocusable({ trackChildren: true });

  const btn1 = useFocusable({
    onEnterPress: () => {
      runAxios();
    },
    onArrowPress: () => {
      return true
    },
  });
  const btn2 = useFocusable({
    onEnterPress: () => {
      runAxiosNoJson();
    },
    onArrowPress: () => {
      return true;
    },
  });
  const btn3 = useFocusable({
    onEnterPress: () => {
      runKy();
    },
    onArrowPress: () => {
      return true;
    },
  });
  const btn4 = useFocusable({
    onEnterPress: () => {
      runKyNoparse();
    },
    onArrowPress: () => {
      return true;
    },
  });
  const btn5 = useFocusable({
    onEnterPress: () => {
      runRedAxios();
    },
    onArrowPress: () => {
      return true;
    },
  });
  const btn6 = useFocusable({
    onEnterPress: () => {
      runredAxiosNoJson();
    },
    onArrowPress: () => {
      return true;
    },
  });
  const btn7 = useFocusable({
    onEnterPress: () => {
      runRTKQ();
    },
    onArrowPress: () => {
      return true;
    },
  });
  const btn8 = useFocusable({
    onEnterPress: () => {
      runRTKQRaw();
    },
    onArrowPress: () => {
      return true;
    },
  });
  const btn9 = useFocusable({
    onEnterPress: () => {
      runWretch();
    },
    onArrowPress: () => {
      return true;
    },
  });
  const btn10 = useFocusable({
    onEnterPress: () => {
      runWretchNoParse();
    },
    onArrowPress: () => {
      return true;
    },
  });
  const btn11 = useFocusable({
    onEnterPress: () => {
      runFetch();
    },
    onArrowPress: () => {
      return true;
    },
  });
  const btn12 = useFocusable({
    onEnterPress: () => {
      runXml();
    },
    onArrowPress: () => {
      return true;
    },
  });

  const btn13 = useFocusable({
    onEnterPress: () => {
      runXmlNoparse();
    },
    onArrowPress: () => {
      return true;
    },
  });
  const btn14 = useFocusable({
    onEnterPress: () => {
      runFetchNoParse();
    },
    onArrowPress: () => {
      return true;
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
    const response = await GetBenchmarkMetrics(kyServicenoParse, { iteration: 50, concurrent: 10 });
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
  const GENRES = ["DOCUMENTARIES", "TOP-10-MOVIES", "DRAMA", "KIDS-AND-FAMILY", "SPIDER-VERSE"];
  const LANGUAGES = ["en-US", "ar-SA"];

  const [triggerAuto] = useLazyGetMoviesQuery();
  const [triggerManual] = useLazyGetMoviesNoParseQuery();

  const runRTKQ = async () => {
    console.log("Starting RTKQ Benchmark...");
    const rtkTask = async () => {
      const chance = Math.random();

      if (chance > 0.95) {
        return await benchmarkStore.dispatch(rtkApi.endpoints.updatePost.initiate({ id: 1, body: { lastWatched: Date.now() } })).unwrap();
      }
      if (chance > 0.9) {
        return await benchmarkStore.dispatch(rtkApi.endpoints.createPost.initiate({ userId: "Arun", event: "app_launch" })).unwrap();
      }

      const genre = GENRES[Math.floor(Math.random() * GENRES.length)];
      const lang = LANGUAGES[Math.floor(Math.random() * LANGUAGES.length)];

      return await triggerAuto({ genre, lang }, false).unwrap();
    };

    const response = await GetBenchmarkMetrics(rtkTask, { iteration: 50, concurrent: 10 });
    console.table(response);
  };

  const runRTKQRaw = async () => {
    console.log("Starting RTKQ no parse Benchmark...");

    const rtkTask = async () => {
      const chance = Math.random();

      if (chance > 0.95) {
        return await benchmarkStore.dispatch(rtkApi.endpoints.updatePost.initiate({ id: 1, body: { t: Date.now() } })).unwrap();
      }
      if (chance > 0.9) {
        return await benchmarkStore.dispatch(rtkApi.endpoints.createPost.initiate({ event: "bench" })).unwrap();
      }

      const genre = GENRES[Math.floor(Math.random() * GENRES.length)];
      const lang = LANGUAGES[Math.floor(Math.random() * LANGUAGES.length)];

      return await triggerManual({ genre, lang }, false).unwrap();
    };

    const response = await GetBenchmarkMetrics(rtkTask, { iteration: 50, concurrent: 10 });
    console.table(response);
  };

  const runredAxiosNoJson = async () => {
    console.log("Starting  No-Parse reAxios Benchmark...");
    const response = await GetBenchmarkMetrics(RedAxiosServiceNoParse, { iteration: 50, concurrent: 5 });

    console.table(response);
  };

  const runRedAxios = async () => {
    console.log("Starting redAxios Benchmark...");
    const response = await GetBenchmarkMetrics(RedAxiosService, { iteration: 50, concurrent: 5 });

    console.table(response);
  };
  const runFetch = async () => {
    console.log("Starting fetch Benchmark...");
    const response = await GetBenchmarkMetrics(FetchService, { iteration: 50, concurrent: 10 });

    console.table(response);

  };
  const runFetchNoParse = async () => {
    console.log("Starting fetch no parsing Benchmark...");
    const response = await GetBenchmarkMetrics(FetchServicenoParse, { iteration: 50, concurrent: 10 });

    console.table(response);

  };

  const runWretch = async () => {
    console.log("Starting wretch Benchmark...");

    const response = await GetBenchmarkMetrics(wretchService, { iteration: 50, concurrent: 10 });


    console.table(response);

  };
  const runWretchNoParse = async () => {
    console.log("starting wretch no parsing benchmark");

    const response = await GetBenchmarkMetrics(wretchServicenoParse, { iteration: 50, concurrent: 10 });

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
    <div ref={ref} >
      <FocusContext.Provider value="SN:ROOT">
        <div style={{ display: "flex", flex: "row", flexWrap: "wrap" }}>
          <button
            style={{
              padding: "16px 32px",
              margin: "10px",
              backgroundColor: `${btn1.focused ? "#ff0000" : "#333"}`,
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
              margin: "10px",
              backgroundColor: `${btn2.focused ? "#ff0000" : "#333"}`,
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
              margin: "10px",
              backgroundColor: `${btn3.focused ? "#ff0000" : "#333"}`,
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
              margin: "10px",
              backgroundColor: `${btn4.focused ? "#ff0000" : "#333"}`,
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
              margin: "10px",
              backgroundColor: `${btn5.focused ? "#ff0000" : "#333"}`,
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
              margin: "10px",
              backgroundColor: `${btn6.focused ? "#ff0000" : "#333"}`,
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
              margin: "10px",
              backgroundColor: `${btn7.focused ? "#ff0000" : "#333"}`,
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
              margin: "10px",
              backgroundColor: `${btn8.focused ? "#ff0000" : "#333"}`,
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
              margin: "10px",
              backgroundColor: `${btn9.focused ? "#ff0000" : "#333"}`,
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
              margin: "10px",
              backgroundColor: `${btn10.focused ? "#ff0000" : "#333"}`,
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
              margin: "10px",
              backgroundColor: `${btn11.focused ? "#ff0000" : "#333"}`,
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
              margin: "10px",
              backgroundColor: `${btn14.focused ? "#ff0000" : "#333"}`,
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
              margin: "10px",
              backgroundColor: `${btn12.focused ? "#ff0000" : "#333"}`,
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
              margin: "10px",
              backgroundColor: `${btn13.focused ? "#ff0000" : "#333"}`,
              color: "white",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            ref={btn13.ref}
            onClick={runXmlNoparse}
          >
            Ryn XMLhttprequest (no parsing)
          </button>
        </div>

      </FocusContext.Provider>
      <div>
        <MovieRail ></MovieRail>

      </div>
    </div>
  );
};

export default App;
