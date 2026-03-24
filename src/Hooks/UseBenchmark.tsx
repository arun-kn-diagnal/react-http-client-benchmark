/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

const GetBenchmarkMetrics = async (fun: Promise<any>, { iteration = 20, concurrent = 5 } = {}) => {
  let success = 0,
    failed = 0,
    active = 0,
    maxconcurrent = 0;
  const latency: number[] = [],
    parsing: number[] = [];
  const start = performance.now();
  const reqStart = async () => {
    const reqStartTime = performance.now();
    active++;
    if (active > maxconcurrent) {
      maxconcurrent = active;
    }
    try {
      const res = await fun;
      const startParseTime = performance.now();
      const data = res.data;
      const endParseTime = performance.now();
      parsing.push(endParseTime - startParseTime);
      const reqEndTime = performance.now();
      latency.push(reqEndTime - reqStartTime);
      console.log(latency);
      success++;
    } catch (error) {
      console.log(error);
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
  const avgParseTime = parsing.reduce((a, b) => a + b, 0) / parsing.length;
  const avglatency = latency.reduce((a, b) => a + b, 0) / latency.length;
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
