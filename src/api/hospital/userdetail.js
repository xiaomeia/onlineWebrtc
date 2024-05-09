import request from '@/utils/request'

export function patient(id) {
    return request({
        url: '/patient/' + id,
        method: 'get'
    })
}
