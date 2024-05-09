import request from '@/utils/request'

export function listRole(query) {
    return request({
        url: '/role',
        method: 'get',
        params: query
    })
}

export function addRole(data) {
    return request({
        url: '/role',
        method: 'post',
        data: data
    })
}
export function editRole(id, data) {
    return request({
        url: '/role/' + id,
        method: 'put',
        data: data
    })
}
export function viewRole(id) {
    return request({
        url: '/role/' + id,
        method: 'get',
    })
}