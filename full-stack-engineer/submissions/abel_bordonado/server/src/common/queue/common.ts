const fetch = require("isomorphic-fetch");

const DefaultTTL = 30 * 1000;
const DefaultAttempts = 1;
const DefaultTimeOut = 3 * 60 * 1000;

export type CallerApiResponse<T = any> = {
  url: string;
  method: string;
  headers: {
    [key: string]: string;
  };
  body: T;
  status: number;
};
export async function queue<T = any>(params: {
  queueService: string;
  data: object;
  name: string;
  attempts?: number;
  isAwait?: boolean;
  ttl?: number;
  timeOut?: number;
}): Promise<CallerApiResponse<T>> {
  const queueServiceUrl = params.queueService + "/queue";
  const reqData = {
    jobName: params.name,
    jobData: params.data,
    attempts: params.attempts || DefaultAttempts,
    await: params.isAwait || true,
    ttl: params.ttl || DefaultTTL,
    timeOut: params.timeOut || DefaultTimeOut // set timeout
  };

  // console.log(
  //   `call to url ${queueServiceUrl} with data ${JSON.stringify(reqData)}`
  // );
  const queueResponse = await fetch(queueServiceUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reqData)
  });
  const resultText = await queueResponse.text();
  console.log(resultText);
  let result;
  try {
    result = JSON.parse(resultText);
  } catch (err) {
    result = resultText;
  }
  // result = await queueResponse.json();
  console.log(`Got response from callback to notification url:  ${queueResponse.status}`, result);
  // queue error
  if (result.err) throw new Error(`${queueResponse.status}-${result.err}`);

  // queue success
  return result.result as CallerApiResponse<T>;
}
