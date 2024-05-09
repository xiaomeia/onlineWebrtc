import request from '@/utils/request'

// 获取路由
export const getRouters = () => {
  return request({
    url: '/getRouters',
    method: 'get'
  })
}

export const dynamicRoutes = [
  {
    "msg": "操作成功",
    "code": 200,
    "data": [
      {
        "name": "doctor",
        "path": "/doctor",
        "hidden": false,
        "redirect": "noRedirect",
        "component": "Layout",
        "alwaysShow": true,
        "meta": {
          "title": "我的接诊",
          "icon": "system",
          "noCache": false,
          "link": null
        },
        "children": [
          {
            "name": "mytask",
            "path": "mytask",
            "hidden": false,
            "component": "hospital/doctor/mytask",
            "meta": {
              "title": "接诊窗口",
              "icon": "user",
              "noCache": false,
              "link": null
            }
          },
          {
            "name": "userdetail",
            "path": "userdetail",
            "hidden": false,
            "component": "hospital/doctor/userdetail",
            "meta": {
              "title": "患者详情",
              "icon": "peoples",
              "noCache": false,
              "link": null
            }
          },
          {
            "name": "mylist",
            "path": "menu",
            "hidden": false,
            "component": "hospital/doctor/mylist",
            "meta": {
              "title": "接诊记录",
              "icon": "tree-table",
              "noCache": false,
              "link": null
            }
          }

        ]
      },
      {
        "name": "Monitor",
        "path": "/monitor",
        "hidden": false,
        "redirect": "noRedirect",
        "component": "Layout",
        "alwaysShow": true,
        "meta": {
          "title": "药房页面",
          "icon": "monitor",
          "noCache": false,
          "link": null
        },
        "children": [
          {
            "name": "Online",
            "path": "online",
            "hidden": false,
            "component": "monitor/online/index",
            "meta": {
              "title": "在线用户",
              "icon": "online",
              "noCache": false,
              "link": null
            }
          }

        ]
      },
      {
        "name": "Tool",
        "path": "/tool",
        "hidden": false,
        "redirect": "noRedirect",
        "component": "Layout",
        "alwaysShow": true,
        "meta": {
          "title": "组织管理",
          "icon": "tool",
          "noCache": false,
          "link": null
        },
        "children": [
          {
            "name": "Build",
            "path": "build",
            "hidden": false,
            "component": "tool/build/index",
            "meta": {
              "title": "设置",
              "icon": "build",
              "noCache": false,
              "link": null
            }
          }
        ]
      },
      {
        "name": "System",
        "path": "/system",
        "hidden": false,
        "redirect": "noRedirect",
        "component": "Layout",
        "alwaysShow": true,
        "meta": {
          "title": "系统管理",
          "icon": "system",
          "noCache": false,
          "link": null
        },
        "children": [
          {
            "name": "Menu",
            "path": "menu",
            "hidden": false,
            "component": "system/menu/index",
            "meta": {
              "title": "菜单管理",
              "icon": "tree-table",
              "noCache": false,
              "link": null
            }
          }
        ]
      }
    ]
  }
]
export const saveRouters = (data) => {
  return request({
    url: '/update-routers',
    method: 'post',
    data: data
  })
}