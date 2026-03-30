interface BenchmarkResult {
  iteration: number;
  errorRate: number;
  throughput: number;
  avgParseTime: number;
  avglatency: number;
  success: number;
  failed: number;
}

const GetBenchmarkMetrics = async (fun: Promise<any>, { iteration = 20, concurrent = 5 } = {}): Promise<BenchmarkResult> => {
  let success = 0,
    failed = 0,
    active = 0,
    maxconcurrent = 0;

  const latency: number[] = [],
    parsing: number[] = [];

  const start = performance.now();

  const reqStart = async () => {
    active++;
    if (active > maxconcurrent) maxconcurrent = active;

    const reqStartTime = performance.now();
    try {
      let response = await fun;
      const reqEndTime = performance.now();
      if (response === "") {
        throw "error";
      }

      latency.push(reqEndTime - reqStartTime);
      // console.log(reqStartTime, reqEndTime , "time : ",reqEndTime - reqStartTime )
      //@ts-ignore
      let data;

      if (response && typeof response.json === "function") {
        const startParseTime = performance.now();
        data = await response.clone().json();
        const endParseTime = performance.now();
        parsing.push(endParseTime - startParseTime);
      } else if (response && typeof response.data === "string") {
        const startParseTime = performance.now();
        data = JSON.parse(response.data);
        const endParseTime = performance.now();
        parsing.push(endParseTime - startParseTime);
      } else {
        data = response;
      }

      success++;
    } catch (error) {
      const reqEndTime = performance.now();

      latency.push(reqEndTime - reqStartTime);
      failed++;
    } finally {
      active--;
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

  const end = performance.now();

  const totalTime = end - start;
  const throughput = iteration / totalTime;
  const errorRate = (failed / iteration) * 100;
  // console.table(latency);
  const avgParseTime = parsing.reduce((a, b) => a + b, 0) / parsing.length;
  const avglatency = latency.length > 0 ? latency.reduce((a, b) => a + b, 0) / latency.length : 0;
  return {
    iteration,
    errorRate,
    throughput,
    avgParseTime,
    avglatency,
    success,
    failed,
  };
};

export default GetBenchmarkMetrics;
// export const PrintBenchmarks = async () => {
//   const result = await GetBenchmarkMetrics({ iteration: 5, concurrent: 2 });
//   return result;
// };
