import request from '@/utils/request'

export function listDept(query) {
    return request({
        url: '/department',
        method: 'get',
        params: query
    })
}

export function addDept(data) {
    return request({
        url: '/department',
        method: 'post',
        data: data
    })
}
export function editDept(id, data) {
    return request({
        url: '/department/' + id,
        method: 'put',
        data: data
    })
}
export function detailDept(id) {
    return request({
        url: '/department/' + id,
        method: 'get'
    })
}
export function delDept(id) {
    return request({
        url: '/department/' + id,
        method: 'delete'
    })
}
