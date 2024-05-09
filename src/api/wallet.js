// 钱包
import request from '@/utils/request'
// 列表接口
export function list(query) {
    return request({
        url: '/settlement-order',
        method: 'get',
        params: query
    })
}
