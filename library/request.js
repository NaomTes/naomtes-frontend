import axios from 'axios';

import { server } from './server';

const service = axios.create({
  baseURL: new URL('/api/v1/investor', server).href,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// function isAuthError(error) {
//     const { response } = error;
//     return response && response.status === 401;
// }

service.interceptors.request.use((config) => {
  const url = config.url.match(/\/$/) ? config.url : `${config.url}/`;
  return {
    ...config,
    url,
    headers: config.headers,
  };
});

// Response Interceptor
service.interceptors.response.use(
  (data) => {
    if (data.headers['authorization']) {
      localStorage.setItem('token', data.headers['authorization']);
    }
    return data;
  },
  (error) => {
    if (!error) {
      return Promise.reject(new Error('There was an error.'));
    }
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    const { response = {} } = error;
    return Promise.reject(response.data || error);
  },
);

const cancelable = {};

export default function ({ cancelPrevious, ...config }) {
    if (cancelPrevious) {
        const key = `${config.method}-${config.url}`;
        const cancel = cancelable[key];
        if (cancel) cancel('request-cancel');
        return service({
            ...config,
            cancelToken: new axios.CancelToken((cancelRequest) => {
                cancelable[key] = cancelRequest;
            }),
        });
    }
    return service(config);
}
