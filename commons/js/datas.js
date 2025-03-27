const friendFn = {
    getFriendsList: function () {
      return [
        {
            id: 0,
            imgUrl: '.../../static/6.webp',
            tip: 0,
            name: 'Friend 1',
            time: new Date(),
            news: 'Hello, how are you?',
        },
        {
            id: 1,
            imgUrl: '.../../static/6.webp',
            tip: 2,
            name: 'Friend 2',
            time: new Date(),
            news: 'Let\'s meet up this weekend!',
        },
        {
            id: 2,
            imgUrl: '.../../static/6.webp',
            tip: 0,
            name: 'Friend 3',
            time: new Date(),
            news: 'Did you finish the project?',
        },
        {
            id: 3,
            imgUrl: '.../../static/6.webp',
            tip: 1,
            name: 'Friend 4',
            time: new Date(),
            news: 'I have a question about the assignment.', 
        },
        {
            id: 0,
            imgUrl: '.../../static/6.webp',
            tip: 0,
            name: 'Friend 1',
            time: new Date(),
            news: 'Hello, how are you?',
        },
        {
            id: 1,
            imgUrl: '.../../static/6.webp',
            tip: 2,
            name: 'Friend 2',
            time: new Date(),
            news: 'Let\'s meet up this weekend!',
        },
        {
            id: 2,
            imgUrl: '.../../static/6.webp',
            tip: 0,
            name: 'Friend 3',
            time: new Date(),
            news: 'Did you finish the project?',
        },
        {
            id: 3,
            imgUrl: '.../../static/6.webp',
            tip: 1,
            name: 'Friend 4',
            time: new Date(),
            news: 'I have a question about the assignment.', 
        },
        {
            id: 0,
            imgUrl: '.../../static/6.webp',
            tip: 0,
            name: 'Friend 1',
            time: new Date(),
            news: 'Hello, how are you?',
        },
        {
            id: 1,
            imgUrl: '.../../static/6.webp',
            tip: 2,
            name: 'Friend 2',
            time: new Date(),
            news: 'Let\'s meet up this weekend!',
        },
        {
            id: 2,
            imgUrl: '.../../static/6.webp',
            tip: 0,
            name: 'Friend 3',
            time: new Date(),
            news: 'Did you finish the project?',
        },
        {
            id: 3,
            imgUrl: '.../../static/6.webp',
            tip: 1,
            name: 'Friend 4',
            time: new Date(),
            news: 'I have a question about the assignment.', 
        }
      ]
   },
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
            message: '5.webp',
            types: 1,
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
            message: '3.webp',
            types: 1,
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
        }
    ]
   }
export {
    friendFn,
    getMessage
}