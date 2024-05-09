import request from '@/utils/request'

// 接诊列表
export function listsTask(query) {
  return request({
    url: '/reception',
    method: 'get',
    params: query
  })
}
export function videoTask(id) {
  return request({
    url: '/reception/videl/' + id,
    method: 'get',
  })
}
// 接诊详情
export function detailTask(id) {
  return request({
    url: '/reception/' + id,
    method: 'get',
  })
}
// 结束问诊
export function overReception(id) {
  return request({
    url: '/reception/finish/' + id,
    method: 'get'
  })
}

// 开处方
export function rescribing(id, data) {
  return request({
    url: '/recipel/receive/' + id,
    method: 'post',
    data: data
  })
}

// 接诊统计
export function countReception() {
  return request({
    url: '/reception/statistics',
    method: 'get'
  })
}