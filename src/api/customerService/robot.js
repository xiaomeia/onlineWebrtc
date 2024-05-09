// 机器人管理
import request from '@/utils/request'

// 列表接口
export function detail() {
    return request({
        url: '/robot',
        method: 'get'
    })
}
// 新增接口
export function edit(data) {
    return request({
        url: '/robot',
        method: 'put',
        data: data
    })
}
