import request from '../../library/request';

export function createInvestor(data) {
  return request({
    url: 'investors/',
    method: 'post',
    data,
  });
}
