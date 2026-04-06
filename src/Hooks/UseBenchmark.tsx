interface BenchmarkResult {
  iteration: number;
  errorRate: number;
  throughput: number;
  avgParseTime: number;
  avglatency: number;
  success: number;
  failed: number;
  totalTime: number;
}

const GetBenchmarkMetrics = async (taskFactory: () => Promise<any>, { iteration = 20, concurrent = 5 } = {}): Promise<BenchmarkResult> => {
  let success = 0,
    failed = 0;
  const latency: number[] = [],
    parsing: number[] = [];
  const start = performance.now();

  const reqStart = async () => {
    const reqStartTime = performance.now();
    try {
      const response = await taskFactory();

      const reqEndTime = performance.now();
      latency.push(reqEndTime - reqStartTime);
      // console.log(reqStartTime, reqEndTime , "time : ",reqEndTime - reqStartTime )
      //@ts-ignore
      let data;

      if (response && typeof response.json === "function") {
        const startParseTime = performance.now();
        data = await response.clone().json();
        console.log("Type:1", data);
        const endParseTime = performance.now();
        parsing.push(endParseTime - startParseTime);
      } else if (response && typeof response.data === "string") {
        const startParseTime = performance.now();
        data = JSON.parse(response.data);
        console.log("Type:2", data);

        const endParseTime = performance.now();
        parsing.push(endParseTime - startParseTime);
      } else if (response && typeof response === "string") {
        const startParseTime = performance.now();
        data = JSON.parse(response);
        console.log("Type:3", data);

        const endParseTime = performance.now();
        parsing.push(endParseTime - startParseTime);
      } else {
        data = response;
        console.log("Type:4", data);

        parsing.push(0);
      }
      success++;
    } catch (error) {
      latency.push(performance.now() - reqStartTime);
      failed++;
    }
  };

  const batches = Math.ceil(iteration / concurrent);
  for (let i = 0; i < batches; i++) {
    const promises = [];
    for (let j = 0; j < concurrent; j++) {
      if (success + failed < iteration) {
        promises.push(reqStart());
      }
    }
    await Promise.all(promises);
  }

  const totalTime = performance.now() - start;

  return {
    iteration,
    throughput: iteration / totalTime,
    avgParseTime: parsing.reduce((a, b) => a + b, 0) / (parsing.length || 1),
    avglatency: latency.reduce((a, b) => a + b, 0) / (latency.length || 1),
    success,
    failed,
    totalTime,
    errorRate: (failed / iteration) * 100,
  };
};

export default GetBenchmarkMetrics;
// export const PrintBenchmarks = async () => {
//   const result = await GetBenchmarkMetrics({ iteration: 5, concurrent: 2 });
//   return result;
// };
