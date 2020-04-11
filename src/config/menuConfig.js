const menuList = [{
        title: '首页', // 菜单标题名称
        key: '/home', // 对应的path
        icon: 'home', // 图标名称
    },
    {
        title: '商品', // 菜单标题名称
        key: '/products', // 对应的path
        icon: 'appstore', // 图标名称
        children: [ // 子菜单列表
            {
                title: '品类管理', // 菜单标题名称
                key: '/category', // 对应的path
                icon: 'bars' // 图标名称
            },
            {
                title: '商品管理', // 菜单标题名称
                key: '/product', // 对应的path
                icon: 'tool' // 图标名称
            }
        ]
    },
    {
        title: '用户管理', // 菜单标题名称
        key: '/user', // 对应的path
        icon: 'user', // 图标名称
    },
    {
        title: '角色管理', // 菜单标题名称
        key: '/role', // 对应的path
        icon: 'team', // 图标名称
    },
    {
        title: '图形图表', // 菜单标题名称
        key: '/charts', // 对应的path
        icon: 'area-chart', // 图标名称
        children: [ // 子菜单列表
            {
                title: '折线图', // 菜单标题名称
                key: '/charts/line', // 对应的path
                icon: 'line-chart' // 图标名称
            },
            {
                title: '柱状图', // 菜单标题名称
                key: '/charts/bar', // 对应的path
                icon: 'bar-chart' // 图标名称
            },
            {
                title: '饼状图', // 菜单标题名称
                key: '/charts/pie', // 对应的path
                icon: 'pie-chart' // 图标名称
            }
        ]
    },

]
export default menuList