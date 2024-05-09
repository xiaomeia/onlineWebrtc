// 药房管理
import request from '@/utils/request'
export function listPharmacy(query) {
    return request({
        url: '/pharmacy_order',
        method: 'get',
        params: query
    })
}

export function addPharmacy(data) {
    return request({
        url: '/pharmacy_order',
        method: 'post',
        data: data
    })
}

// export function editPharmacy(id, data) {
//     return request({
//         url: '/pharmacy_order/' + id,
//         method: 'put',
//         data: data
//     })
// }

export function viewPharmacy(id) {
    return request({
        url: '/pharmacy_order/' + id,
        method: 'get',
    })
}

// export function deletePharmacy(id) {
//     return request({
//         url: '/pharmacy_order/' + id,
//         method: 'delete'
//     })
// }