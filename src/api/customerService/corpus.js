// 语料管理
import request from '@/utils/request'

// 列表接口
export function listCorpus(query) {
  return request({
    url: '/question',
    method: 'get',
    params: query
  })
}
// 新增接口
export function addCorpus(data) {
  return request({
    url: '/question',
    method: 'post',
    data: data
  })
}
// 编辑接口
export function editCorpus(id, data) {
  return request({
    url: '/question/' + id,
    method: 'put',
    data: data
  })
}
// 详情接口
export function viewCorpus(id) {
  return request({
    url: '/question/' + id,
    method: 'get',
  })
}
// 删除接口
export function delCorpus(id) {
  return request({
    url: '/question/' + id,
    method: 'delete'
  })
}
// 分类列表
export function categoryList(query) {
  return request({
    url: '/question_category',
    method: 'get',
    params: query
  })
}
// 新增分类
export function categoryAdd(data) {
  return request({
    url: '/question_category',
    method: 'post',
    data: data
  })
}
// 删除分类
export function categoryDel(id) {
  return request({
    url: '/question_category/' + id,
    method: 'delete',
  })
}