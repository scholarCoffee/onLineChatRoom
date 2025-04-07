const getFriendsList = () => {
    return [
        {
            id: 0,
            imgUrl: '5.png',
            tip: 0,
            email: '2231321312',
            name: '张队长',
            time: new Date(),
            news: '最近怎么样，有什么情况吗？',
        },
        {
            id: 1,
            imgUrl: '5.png',
            tip: 2,
            email: '2231321312',
            name: '冲锋小队长',
            time: new Date(),
            news: '怎么样，一切都ok了吧',
        },
        {
            id: 2,
            imgUrl: 'fire.png',
            tip: 0,
            email: '2231321312',
            name: '维保人员',
            time: new Date(),
            news: '那边的情况如何？',
        },
        {
            id: 3,
            imgUrl: 'fire-kt.png',
            tip: 1,
            email: '2231321312',
            name: '保障人员',
            time: new Date(),
            news: '幸福小区 3 号楼 5 单元 802 室', 
        },
        {
            id: 4,
            imgUrl: 'fire.png',
            tip: 0,
            email: '2231321312',
            name: '的点点滴滴',
            time: new Date(),
            news: 'Hello, how are you?',
        },
        {
            id: 5,
            imgUrl: 'fire-lb.png',
            tip: 2,
            email: '2231321312',
            name: '庄队长',
            time: new Date(),
            news: '在小区内开展消防知识宣传活动，向居民讲解火灾预防和逃生知识，提高居民的消防安全意识',
        },
        {
            id: 6,
            imgUrl: 'fire-lb.png',
            tip: 0,
            email: '2231321312',
            name: '张贝贝',
            time: new Date(),
            news: '核实情况如何',
        }
      ]
}

   // 聊天消息
const getMessage = function() {
    return [
        {
            id: 1,
            imgUrl: 'fire-lb.png',
            message: '火灾扑灭后，安排人员对现场进行清理，包括拆除部分受损严重的结构，清理灰烬和杂物。',
            types: 0, // 内容类型（0-文字，1-图片链接， 2-语音）
            time: new Date() - 1000,
            tip: 1,
        },
        {
            id: 1,
            imgUrl: 'fire-lb.png',
            message: '出动 3 辆消防车（水罐消防车 2 辆、泡沫消防车 1 辆），共 15 名消防队员，包括指挥员 1 名、战斗员 10 名、驾驶员 4 名。',
            types: 0,
            time: new Date() - 1000*60*60*24,
            tip: 2,
        },
        {
            id: 2,
            imgUrl: 'fire.png',
            message: {
                voice: 'a',
                time: 60
            },
            types: 2,
            time: new Date() - 1000*60*60*24,
            tip: 3,
        },
        {
            id: 3,
            imgUrl: 'fire-kt.png',
            message: '幸福小区 3 号楼 5 单元 802 室',
            types: 0,
            time: new Date() - 1000*60*60*24,
            tip: 4,
        },
        {
            id: 2,
            imgUrl: 'fire.png',
            message: '4.png',
            types: 1,
            time: new Date() - 1000*60*60*24*2,
            tip: 5,
        },
        {
            id: 2,
            imgUrl: 'fire.png',
            message: {
                voice: '222',
                time: 60
            },
            types: 2,
            time: new Date() - 1000*60*60*24*3,
            tip: 6,
        },
        {
            id: 2,
            imgUrl: 'fire.png',
            message: '到达现场后，指挥员迅速评估火势，命令水罐消防车负责控制火势蔓延，泡沫消防车对火源进行扑救',
            types: 0,
            time: new Date() - 1000*60*60*24*7,
            tip: 7,
        },
        // {
        //     id: 2,
        //     imgUrl: '6.png',
        //     message: {
        //         name: '222222222222222222222',
        //         address: '东昌接asdasdsadasda',
        //         latitude: '39.909',
        //         longitude: '166.404'
        //     },
        //     types: 3,
        //     time: new Date() - 1000*60*60*24*7,
        //     tip: 7,
        // },
        {
            id: 1,
            imgUrl: 'fire-lb.png',
            message: {
                voice: '222',
                time: 10
            },
            types: 2, // 内容类型（0-文字，1-图片链接， 2-语音）
            time: new Date() - 1000,
            tip: 8,
        },
        // {
        //     id: 1,
        //     imgUrl: '6.png',
        //     message: {
        //         name: '222222222222222222222',
        //         address: '东昌接asdasdsadasda',
        //         latitude: '39.909',
        //         longitude: '166.404'
        //     },
        //     types: 3,
        //     time: new Date() - 1000*60*60*24*7,
        //     tip: 7,
        // },
    ]
   }

const isFriendShip = () => {
    return [{
        userId: 1,
        friend: 2
    }, {
        userId: 1,
        friend: 3
    }, {
        userId: 1,
        friend: 4
    }, {
        userId: 1,
        friend: 5
    }, {
        userId: 1,
        friend: 6
    }, {
        userId: 1,
        friend: 7
    }, {
        userId: 1,
        friend: 8
    }]
}
export {
    getFriendsList,
    getMessage,
    isFriendShip
}