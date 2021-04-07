import request from '../../library/request';
import userRequest from '../../library/userRequest';

export function createInvestor(data) {
  return request({
    url: 'investors/',
    method: 'post',
    data,
  });
}

export function createStartup(data) {
  return request({
    url: 'startups/',
    method: 'post',
    data,
  });
}

export function investorSuggestion(data) {
  console.log(data)
  return request({
    url: 'investors/process_results',
    method: 'post',
    data,
  })
}

export function startupSuggestion(data) {
  return request({
    url: 'startups/process_results',
    method: 'post',
    data,
  })
}

export function adminLogin(data) {
  return request({
    url: 'user/sign_in',
    method: 'post',
    data
  })
}

export function bulkUploadData(data) {
  return userRequest({
    url: 'admins/bulk_upload_data',
    method: 'post',
    data
  })
}
