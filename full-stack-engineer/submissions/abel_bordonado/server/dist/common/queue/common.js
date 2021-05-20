"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fetch = require("isomorphic-fetch");
const DefaultTTL = 30 * 1000;
const DefaultAttempts = 1;
const DefaultTimeOut = 3 * 60 * 1000;
function queue(params) {
    return __awaiter(this, void 0, void 0, function* () {
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
        const queueResponse = yield fetch(queueServiceUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reqData)
        });
        const resultText = yield queueResponse.text();
        console.log(resultText);
        let result;
        try {
            result = JSON.parse(resultText);
        }
        catch (err) {
            result = resultText;
        }
        // result = await queueResponse.json();
        console.log(`Got response from callback to notification url:  ${queueResponse.status}`, result);
        // queue error
        if (result.err)
            throw new Error(`${queueResponse.status}-${result.err}`);
        // queue success
        return result.result;
    });
}
exports.queue = queue;
//# sourceMappingURL=common.js.map