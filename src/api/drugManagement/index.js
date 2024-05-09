// 药品管理
import request from '@/utils/request'
// 列表接口
export function listDrug(query) {
    return request({
        url: '/medicine',
        method: 'get',
        params: query
    })
}
// 新增接口
export function addDrug(data) {
    return request({
        url: '/medicine',
        method: 'post',
        data: data
    })
}
// 编辑接口
export function editDrug(id, data) {
    return request({
        url: '/medicine/' + id,
        method: 'put',
        data: data
    })
}
// 详情接口
export function viewDrug(id) {
    return request({
        url: '/medicine/' + id,
        method: 'get',
    })
}
// 删除接口
export function delDrug(id) {
    return request({
        url: '/medicine/' + id,
        method: 'delete'
    })
}
// 上架接口
export function upShelfDrug(id) {
    return request({
        url: '/medicine/enable/' + id,
        method: 'get'
    })
}
// 下架接口
export function downShelfDrug(id) {
    return request({
        url: '/medicine/disable/' + id,
        method: 'get'
    })
}
// 批量上架
export function upShelfDrugs(data) {
    return request({
        url: '/medicine/batch-enable',
        method: 'post',
        data: data
    })
}
// 批量下架
export function downShelfDrugs(data){
    return request({
        url: '/medicine/batch-disable',
        method: 'post',
        data: data
    })
}