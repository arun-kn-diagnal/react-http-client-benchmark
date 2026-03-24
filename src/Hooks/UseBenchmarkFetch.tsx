const GetBenchmarkMetricsFetch = async ({ iteration = 20, concurrent = 5 } = {}) => {
  const url = "https://api-entertainment-v1.enlight.diagnal.com/content/filters/KIDS-AND-FAMILY?origin=enhance&origin=vcms&source=enhance&region=IN&maxParentalRatings=UA&language=en-US&platform=web";
  let errorCount = 0;

  let success = 0,
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

    const res = await fetch(url);

    if (!res.ok) {
      errorCount++;
    }
    const startParseTime = performance.now();
    void (await res.json());

    const endParseTime = performance.now();
    parsing.push(endParseTime - startParseTime);
    const reqEndTime = performance.now();
    latency.push(reqEndTime - reqStartTime);

    success++;
  };
  const batches = Math.ceil(iteration / concurrent);
  for (let i = 0; i < batches; i++) {
    const promises = [];
    for (let j = 0; j < concurrent; j++) {
      if (success + errorCount < iteration) {
        promises.push(reqStart());
      }
    }
    await Promise.all(promises);
  }
  const end = performance.now();
  const totalTime = end - start;
  const throughput = iteration / totalTime;
  const errorRate = (errorCount / iteration) * 100;
  const avgParseTime = parsing.reduce((a, b) => a + b, 0) / parsing.length;
  const avglatency = latency.reduce((a, b) => a + b, 0) / latency.length;
  return {
    iteration,
    errorRate,
    throughput,
    avgParseTime,
    avglatency,
    success,
    errorCount,
  };
};
export default GetBenchmarkMetricsFetch;
