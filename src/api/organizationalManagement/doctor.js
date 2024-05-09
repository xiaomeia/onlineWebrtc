import request from '@/utils/request'

export function listDoctor(query) {
    return request({
        url: '/doctor',
        method: 'get',
        params: query
    })
}
export function addDoctor(data) {
    return request({
        url: '/doctor',
        method: 'post',
        data: data
    })
}
export function editDoctor(id, data) {
    return request({
        url: '/doctor/' + id,
        method: 'put',
        data: data
    })
}
export function viewDoctor(id) {
    return request({
        url: '/doctor/' + id,
        method: 'get'
    })
}
// 删除接口
export function delDoctor(id) {
    return request({
        url: '/doctor/' + id,
        method: 'delete'
    })
}