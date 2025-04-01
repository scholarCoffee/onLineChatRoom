const getFriendsList = () => {
    return [
        {
            id: 0,
            imgUrl: '6.webp',
            tip: 0,
            email: '2231321312',
            name: 'Friend 1',
            time: new Date(),
            news: 'Hello, how are you?',
        },
        {
            id: 1,
            imgUrl: '6.webp',
            tip: 2,
            email: '2231321312',
            name: 'Friend 2',
            time: new Date(),
            news: 'Let\'s meet up this weekend!',
        },
        {
            id: 2,
            imgUrl: '6.webp',
            tip: 0,
            email: '2231321312',
            name: 'Friend 3',
            time: new Date(),
            news: 'Did you finish the project?',
        },
        {
            id: 3,
            imgUrl: '6.webp',
            tip: 1,
            email: '2231321312',
            name: 'Friend 4',
            time: new Date(),
            news: 'I have a question about the assignment.', 
        },
        {
            id: 4,
            imgUrl: '6.webp',
            tip: 0,
            email: '2231321312',
            name: '的点点滴滴',
            time: new Date(),
            news: 'Hello, how are you?',
        },
        {
            id: 5,
            imgUrl: '6.webp',
            tip: 2,
            email: '2231321312',
            name: '12312收拾收拾',
            time: new Date(),
            news: 'Let\'s meet up this weekend!',
        },
        {
            id: 6,
            imgUrl: '6.webp',
            tip: 0,
            email: '2231321312',
            name: '张张贝贝',
            time: new Date(),
            news: 'Did you finish the project?',
        },
        {
            id: 7,
            imgUrl: '6.webp',
            tip: 1,
            email: '2231321312',
            name: 'Friend 4',
            time: new Date(),
            news: 'I have a question about the assignment.', 
        },
        {
            id: 8,
            imgUrl: '6.webp',
            tip: 0,
            email: '2231321312',
            name: '收拾收拾',
            time: new Date(),
            news: 'Hello, how are you?',
        },
        {
            id: 9,
            imgUrl: '6.webp',
            tip: 2,
            email: '2231321312',
            name: '23121312',
            time: new Date(),
            news: 'Let\'s meet up this weekend!',
        },
        {
            id: 10,
            imgUrl: '6.webp',
            tip: 0,
            email: '2231321312',
            name: 'Friend 3',
            time: new Date(),
            news: 'Did you finish the project?',
        },
        {
            id: 11,
            imgUrl: '6.webp',
            tip: 1,
            email: '2231321312',
            name: 'Friend 4',
            time: new Date(),
            news: 'I have a question about the assignment.', 
        }
      ]
}

   // 聊天消息
const getMessage = function() {
    return [
        {
            id: 1,
            imgUrl: '6.webp',
            message: 'Hello, how are you?',
            types: 0, // 内容类型（0-文字，1-图片链接， 2-语音）
            time: new Date() - 1000,
            tip: 1,
        },
        {
            id: 1,
            imgUrl: '6.webp',
            message: 'Let\'s meet up this weekend!',
            types: 0,
            time: new Date() - 1000*60*60*24,
            tip: 2,
        },
        {
            id: 2,
            imgUrl: '6.webp',
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
            imgUrl: '6.webp',
            message: 'I have a question about the assignment.',
            types: 0,
            time: new Date() - 1000*60*60*24,
            tip: 4,
        },
        {
            id: 2,
            imgUrl: '6.webp',
            message: '4.webp',
            types: 1,
            time: new Date() - 1000*60*60*24*2,
            tip: 5,
        },
        {
            id: 2,
            imgUrl: '6.webp',
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
            imgUrl: '6.webp',
            message: '222222222222222222222',
            types: 0,
            time: new Date() - 1000*60*60*24*7,
            tip: 7,
        },
        {
            id: 1,
            imgUrl: '6.webp',
            message: {
                voice: '222',
                time: 60
            },
            types: 0, // 内容类型（0-文字，1-图片链接， 2-语音）
            time: new Date() - 1000,
            tip: 8,
        },
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