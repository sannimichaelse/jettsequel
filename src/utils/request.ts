import Bottleneck from 'bottleneck';
import request from 'request-promise-native';
import envConfig from "config"
import { TGetOptions, TPostOptions } from 'types/request';

// Allow up to 2 calls per second
const limiter = new Bottleneck({
    maxConcurrent: 2,
    minTime: 1000,
});

type TthrottleParams = TGetOptions | TPostOptions
// Throttle the requests
const throttle = async (params: TthrottleParams) => limiter.schedule(() => request(params));

export const get = async (uri: string) => {
    const options: TGetOptions = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${envConfig.JETTI_BEARER_TOKEN}`,
        },
        json: true,
        uri
    };
    return throttle(options);
};

export const post = async (uri: string, data: any) => {
    const options: TPostOptions = {
        method: 'POST',
        data,
        json: true,
        uri
    };
    return throttle(options);
};

