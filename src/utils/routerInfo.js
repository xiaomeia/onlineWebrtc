export function saveRouterInfo() {
  const routerList = [
    {
      "name": "doctor",
      "path": "/doctor",
      "hidden": false,
      "redirect": "noRedirect",
      "component": "Layout",
      "alwaysShow": true,
      "meta": {
        "title": "我的接诊",
        "icon": "jiezhen",
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
            "icon": "people",
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
      "path": "",
      "hidden": false,
      "component": "Layout",
      "redirect": "noRedirect",
      "children": [
        {
          "name": "PharmacyManagementIndex",
          "path": "pharmacyManagementIndex",
          "hidden": false,
          "component": "pharmacyManagement/index",
          "meta": {
            "title": "药房页面",
            "icon": "yaofang",
            "noCache": false,
            "link": null
          }
        }
      ]
    },


    {
      "name": "OrganizationalManagement",
      "path": "/organizationalManagement",
      "hidden": false,
      "redirect": "noRedirect",
      "component": "Layout",
      "alwaysShow": true,
      "meta": {
        "title": "组织管理",
        "icon": "tree-table",
        "noCache": false,
        "link": null
      },
      "children": [
        {
          "name": "Role",
          "path": "role",
          "hidden": false,
          "component": "organizationalManagement/role/index",
          "meta": {
            "title": "角色管理",
            "icon": "peoples",
            "noCache": false,
            "link": null
          }
        },
        {
          "name": "Doctor",
          "path": "doctor",
          "hidden": false,
          "component": "organizationalManagement/doctor/index",
          "meta": {
            "title": "医生管理",
            "icon": "user",
            "noCache": false,
            "link": null
          }
        },
        {
          "name": "Department",
          "path": "department",
          "hidden": false,
          "component": "organizationalManagement/department/index",
          "meta": {
            "title": "科室管理",
            "icon": "tree",
            "noCache": false,
            "link": null
          }
        },
        {
          "name": "Treatment",
          "path": "treatment",
          "hidden": false,
          "component": "organizationalManagement/treatment/index",
          "meta": {
            "title": "接诊管理",
            "icon": "tree-table",
            "noCache": false,
            "link": null
          }
        },
        {
          "name": "Pharmacy",
          "path": "pharmacy",
          "hidden": false,
          "component": "organizationalManagement/pharmacy/index",
          "meta": {
            "title": "药房管理",
            "icon": "yaofang",
            "noCache": false,
            "link": null
          }
        },
      ]
    },


    {
      "path": "",
      "hidden": false,
      "component": "Layout",
      "redirect": "noRedirect",
      "children": [
        {
          "name": "DrugManagementIndex",
          "path": "drugManagementIndex",
          "hidden": false,
          "component": "drugManagement/index",
          "meta": {
            "title": "药品管理",
            "icon": "drug",
            "noCache": false,
            "link": null
          }
        }
      ]
    },
    {
      "name": "CustomerService",
      "path": "/customerService",
      "hidden": false,
      "redirect": "noRedirect",
      "component": "Layout",
      "alwaysShow": true,
      "meta": {
        "title": "智能客服",
        "icon": "message",
        "noCache": false,
        "link": null
      },
      "children": [
        {
          "name": "Corpus",
          "path": "corpus",
          "hidden": false,
          "component": "customerService/corpus/index",
          "meta": {
            "title": "语料管理",
            "icon": "yuliao",
            "noCache": false,
            "link": null
          }
        },
        {
          "name": "Robot",
          "path": "robot",
          "hidden": false,
          "component": "customerService/robot/index",
          "meta": {
            "title": "机器人设置",
            "icon": "robot",
            "noCache": false,
            "link": null
          }
        }
      ]
    },
    {
      "path": "/drugManagementIndex/drugManagementDetail",
      "component": "Layout",
      "hidden": true,
      "children": [
        {
          "name": "DrugManagementAdd",
          "path": "add",
          "component": "drugManagement/drugAdd",
          "meta": {
            "title": "新增",
            "icon": "#",
            "noCache": false,
            "link": null,
            "activeMenu": "/drugManagementIndex"
          }
        },
        {
          "name": "DrugManagementView",
          "path": "view",
          "hidden": true,
          "component": "drugManagement/drugView",
          "meta": {
            "title": "查看",
            "icon": "#",
            "noCache": false,
            "link": null,
            "activeMenu": "/drugManagementIndex"
          }
        },
        {
          "name": "DrugManagementEdit",
          "path": "edit",
          "hidden": true,
          "component": "drugManagement/drugEdit",
          "meta": {
            "title": "编辑",
            "icon": "#",
            "noCache": false,
            "link": null,
            "activeMenu": "/drugManagementIndex"
          }
        }
      ]
    },
    {
      "path": "/pharmacyManagementIndex/pharmacyManagementDetail",
      "component": "Layout",
      "hidden": true,
      "children": [
        {
          "name": "PharmacyManagementExpress",
          "path": "express",
          "hidden": true,
          "component": "pharmacyManagement/express",
          "meta": {
            "title": "寄送详情",
            "icon": "#",
            "noCache": false,
            "link": null,
            "activeMenu": "pharmacyManagement/index"
          }
        },
        {
          "name": "PharmacyManagementSelfTake",
          "path": "selfTake",
          "hidden": true,
          "component": "pharmacyManagement/selfTake",
          "meta": {
            "title": "自取信息",
            "icon": "#",
            "noCache": false,
            "link": null,
            "activeMenu": "pharmacyManagement/index"
          }
        }
      ]
    },
    {
      "path": "/organizationalManagement/role",
      "component": "Layout",
      "hidden": true,
      "children": [
        {
          "name": "Add",
          "path": "add",
          "hidden": true,
          "component": "organizationalManagement/role/add",
          "meta": {
            "title": "新增角色",
            "activeMenu": "/organizationalManagement/role"
          }
        },
        {
          "name": "Edit",
          "path": "edit",
          "hidden": true,
          "component": "organizationalManagement/role/edit",
          "meta": {
            "title": "编辑角色",
            "activeMenu": "/organizationalManagement/role"
          }
        }
      ]
    },
    {
      "path": "/organizationalManagement/doctor",
      "component": "Layout",
      "hidden": true,
      "children": [
        {
          "name": "Add",
          "path": "add",
          "hidden": true,
          "component": "organizationalManagement/doctor/add",
          "meta": {
            "title": "新增医生",
            "activeMenu": "/organizationalManagement/doctor"
          }
        },
        {
          "name": "Edit",
          "path": "edit",
          "hidden": true,
          "component": "organizationalManagement/doctor/edit",
          "meta": {
            "title": "编辑医生",
            "activeMenu": "/organizationalManagement/doctor"
          }
        }
      ]
    }
  ]
  return routerList
}
// {
//   "name": "Tool",
//   "path": "/tool",
//   "hidden": false,
//   "redirect": "noRedirect",
//   "component": "Layout",
//   "alwaysShow": true,
//   "meta": {
//     "title": "组织管理",
//     "icon": "tool",
//     "noCache": false,
//     "link": null
//   },
//   "children": [
//     {
//       "name": "Build",
//       "path": "build",
//       "hidden": false,
//       "component": "tool/build/index",
//       "meta": {
//         "title": "设置",
//         "icon": "build",
//         "noCache": false,
//         "link": null
//       }
//     }
//   ]
// },
// {
//   "name": "System",
//   "path": "/system",
//   "hidden": false,
//   "redirect": "noRedirect",
//   "component": "Layout",
//   "alwaysShow": true,
//   "meta": {
//     "title": "系统管理",
//     "icon": "system",
//     "noCache": false,
//     "link": null
//   },
//   "children": [
//     {
//       "name": "Menu",
//       "path": "menu",
//       "hidden": false,
//       "component": "system/menu/index",
//       "meta": {
//         "title": "菜单管理",
//         "icon": "tree-table",
//         "noCache": false,
//         "link": null
//       }
//     }
//   ]
// },