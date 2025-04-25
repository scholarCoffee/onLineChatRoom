<template>
	<view class="content">
		<view class="top-bar">
			<navigator :url="'../userDetail/index?id=' + uid" hover-class="none" class="top-bar-left">
				<image :src="imgUrl" class="my-img"></image>
			</navigator>
			<view class="top-bar-right">
				<view class="search" @tap="toSearch"><image src="/static/user/search.png"></image></view>
				<view class="add" @tap="toBuildGroup"><image src="/static/user/add.png"></image></view>
			</view>
		</view>
		<view class="main">
            <view class="refresh" v-if="isRefresh">
                <image src="/static/user/refresh.png" class="refresh-icon"></image>
                <text class="ref-title">下拉刷新</text>
            </view>
            <view class="noone" v-if="isNoFriendList">
                <image src="/static/home/emptyNo.png" mode="aspectFill"></image>
                <view class="no-friends">你还没有好友~</view>
                <view class="search-bt" @tap="toSearch">搜索好友</view>
            </view>
            <!-- 好友申请数量 -->
            <view class="friends" v-if="requestData > 0" @tap="toFriendRequest">
				<view class="friends-list">
                    <view class="friends-list-l">
                        <text class="tip">{{ requestData }}</text>
                        <image src="../../static/user/applyFriend.png" class="avatar"></image>
                    </view>
                    <view class="friends-list-r">
                        <view class="top">
                            <view class="name">好友申请</view>
                            <view class="time">{{ changeTime(requestTime) }}</view>
                        </view>
                        <view class="news">茫茫人海，相聚便是缘分</view>
                    </view>
                </view>
			</view>
			<view class="friends">
				<view class="friends-list" v-for="(friend, index) in friendsList" :key="index" @tap="toChatRoom(friend)">
                    <view class="friends-list-l">
                        <text class="tip" v-if="friend.tip > 0">{{ friend.tip }}</text>
                        <image :src="friend.imgUrl" class="avatar"></image>
                        <view class="groupm" v-if="friend.chatType == 1"></view>
                    </view>
                    <view class="friends-list-r">
                        <view class="top">
                            <view class="name">{{ friend.name }}</view>
                            <view class="time">{{ changeTime(friend.lastTime) }}</view>
                        </view>
                        <view class="news">{{ friend.message }}</view>
                    </view>
                </view>
			</view>
		</view>
	</view>
</template>

<script>
    import { dateTime, sortByTip } from './../../commons/js/utils.js'; // 导入 dateTime 函数
	export default {
		data() {
			return {
                friendsList: [], // 好友列表
                groupsList:[], // 群组列表
                uid: '', // 用户ID
                userName: '', // 用户名
                imgUrl: '', // 头像URL
                token: '', // 用户token
                requestData: 0, // 好友申请数
                requestTime: '', // 最后申请时间
                isInit: false, // 是否初始化
                isRefresh: false,
                isNoFriendList: false
			}
		},
        onLoad() {
            this.isInit = true
            this.initSocketInfo()
        },
        onShow() {
            // 获取登录信息
            this.getStorages()
            // 页面加载时获取好友请求
            this.getHomeInfo()
        },
		methods: {
            initSocketInfo() {
                // 连接好友socket
                this.receiveFriendSocketMsg()
                // 接收群组消息
                this.receiveGroupSocketMsg()
                // 离开聊天室
                this.receiveLeaveChatRoomSocketMsg()
            },
            onPullDownRefresh() {
                this.getStorages()
                this.getHomeInfo()
            },
            changeTime(time) {
                return dateTime(time)
            },
            getStorages() {
                // 获取本地存储的用户信息
                const userInfo = uni.getStorageSync('userInfo');
                if (userInfo) {
                    const { userId, userName, imgUrl, token } = userInfo;
                    this.uid = userId; // 用户ID
                    this.userName = userName; // 用户名
                    this.imgUrl = this.serverUrl + imgUrl; // 头像URL
                    this.token = token; // 用户token
                    if (this.isInit) {
                        this.socket.emit('login', this.uid)
                        this.isInit = false
                    }
                } else {
                    uni.navigateTo({
                        url: '/pages/signIn/index'
                    });
                } 
            },
            // 好友申请
            getFriendsRequest() {
                return new Promise((resolve, reject) => {
                    this.requestData = 0
                    this.requestTime = ''
                    uni.request({
                        url: this.serverUrl + '/index/getFriend', // 替换为你的登录接口地址,
                        method: 'POST',
                        data: {
                            uid: this.uid,
                            state: 1, // 2表示好友申请
                            token: this.token
                        },
                        success: (res) => {
                            const { data, code } = res.data
                            if (code === 200) {
                                this.requestData = data.length; // 更新好友申请数量
                                if (data.length > 0) {
                                    this.requestTime = data[0].lastTime
                                    for(let i = 0 ; i < data.length; i++) {
                                        if (this.requestTime < data[i].lastTime) {
                                            this.requestTime = data[i].lastTime; // 更新最后申请时间
                                        }
                                    }
                                }
                                resolve()
                            } else {
                                reject('好友申请存在问题')
                            }
                        },
                        fail: (err) => {
                            reject('好友申请失败：' + err)
                        }
                    })
                })
            },
            receiveFriendSocketMsg() {
                this.socket.on('msgFront', (msg, fromid) => {
                    let nmsg = ''
                    if (msg.types === 0) {
                        nmsg = msg.message
                    } else if (msg.types === 1) {
                        nmsg = '[图片]'
                    } else if (msg.types === 2) {
                        nmsg = '[音频]'
                    } else if (msg.types === 3) {
                        nmsg = '[位置]'
                    }
                    for(let i = 0 ; i < this.friendsList.length ; i++) {
                        if (this.friendsList[i].id === fromid) {
                            let e = this.friendsList[i]
                            e.lastTime = new Date()
                            e.message = nmsg 
                            e.tip++
                            this.friendsList.splice(i, 1)
                            this.friendsList.unshift(e)
                        }
                    }
                })
            },
            receiveGroupSocketMsg() {
                this.socket.on('groupMsgFront', data => {
                    const { msg, userID, groupID, name, imgurl } = data || {}
                    let nmsg = ''
                    if (msg.types === 0) {
                        nmsg = msg.message
                    } else if (msg.types === 1) {
                        nmsg = '[图片]'
                    } else if (msg.types === 2) {
                        nmsg = '[音频]'
                    } else if (msg.types === 3) {
                        nmsg = '[位置]'
                    }
                    for(let i = 0 ; i < this.friendsList.length ; i++) {
                        if (this.friendsList[i].id === groupID) {
                            let e = this.friendsList[i]
                            e.lastTime = new Date()
                            if (userID == this.uid) {
                                e.msg = nmsg
                            } else {
                                e.msg = name + ': ' + nmsg
                            }
                            e.message = nmsg 
                            e.tip++
                            this.friendsList.splice(i, 1)
                            this.friendsList.unshift(e)
                        }
                    }
                })
            },
            receiveLeaveChatRoomSocketMsg() {
                this.socket.on('leaveChatRoomFront', (uid, fid) => {
                    // 离开聊天室更新聊天tip
                    for(let i = 0 ; i < this.friendsList.length ; i++) {
                        if (this.friendsList[i].id === fid) {
                            let e = this.friendsList[i]
                            e.tip = 0
                            this.friendsList.splice(i, 1, e)
                        }
                    }
                })
            },
            getHomeInfo() {
                this.friendsList = []
                this.groupsList = []
                this.isRefresh = true
                // 页面加载获取好友
                Promise.all([
                    this.getFriendsRequest(),
                    this.getFriendsList(),
                    this.getGroup()
                ]).then(() => {
                    this.friendsList = this.groupsList.concat(this.friendsList)
                    if (this.friendsList?.length > 0 || this.requestData > 0) {
                        this.friendsList = sortByTip(this.friendsList, 'lastTime', 0)
                        this.isNoFriendList = false
                    } else {
                        this.isNoFriendList = true
                    }
                }).catch((error) => {
                    uni.showToast({
                        title: error,
                        icon: 'none',
                        duration: 2000
                    });
                }).finally(() => {
                    this.isRefresh = false
                    uni.stopPullDownRefresh()
                })   
            },
            // 好友列表
            getFriendsList() {
                return new Promise((resolve, reject) => {
                    uni.request({
                        url: this.serverUrl + '/index/getFriend', // 替换为你的登录接口地址,
                        method: 'POST',
                        data: {
                            uid: this.uid,
                            state: 0, 
                            token: this.token
                        },
                        success: (res) => {
                            const { data, code } = res.data
                            if (code === 200) {
                                if (data.length > 0) {
                                    for(let i = 0; i < data.length ; i++) {
                                        data[i].imgUrl = this.serverUrl + data[i].imgurl
                                        if (data[i].markname) {
                                            data[i].name = data[i].markname
                                        }
                                        if (data[i].id != this.uid) {
                                            data[i].message = data[i].msg
                                        } 
                                        this.friendsList.push(data[i])
                                    }
                                }
                                resolve()
                            } else {
                                uni.showToast({
                                    title: '获取好友请求失败',
                                    icon: 'none',
                                    duration: 2000
                                });
                                reject(new Error('获取好友请求失败'));
                            }
                        },
                        fail: (err) => {
                            uni.showToast({
                                title: '获取好友请求失败',
                                icon: 'none',
                                duration: 2000
                            });
                            reject(err);
                        }
                    })
                })
            },
            // 好友列表
            getGroup() {
                return new Promise((resolve, reject) => {
                    uni.request({
                        url: this.serverUrl + '/index/getGroup', // 替换为你的登录接口地址,
                        method: 'POST',
                        data: {
                            uid: this.uid,
                            state: 0, 
                            token: this.token
                        },
                        success: (res) => {
                            const { data, code } = res.data
                            if (code === 200) {
                                if (data.length > 0) {
                                    for(let i = 0; i < data.length ; i++) {
                                        data[i].imgUrl = this.serverUrl + data[i].imgurl
                                        if (data[i].markname) {
                                            data[i].name = data[i].markname
                                        }
                                        if (data[i].id != this.uid && data[i].msg) {
                                            data[i].message = data[i].username + ': ' + data[i].msg
                                        } 
                                        this.groupsList.push(data[i])
                                        // 加入群组监听
                                        this.socket.emit('groupServer', data[i].id)
                                    }
                                }
                                resolve()
                            } else {
                                reject('获取创建群消息失败');
                            }
                        },
                        fail: (err) => {
                            reject('获取创建群消息失败' + err);
                        }
                    })
                })
            },
            toSearch() {
                uni.navigateTo({
                    url: '../search/index'
                });
            },
            toBuildGroup() {
                uni.navigateTo({
                    url: '../buildGroup/index'
                });
            },
            toFriendRequest() {
                uni.navigateTo({
                    url: '../friendRequest/index'
                });
            },
            toChatRoom(data) {
                const { id, name, imgurl, chatType } = data || {}
                uni.navigateTo({
                    url: '/pages/chatRoom/index?id=' + id + '&name=' + name + '&imgurl=' + imgurl + '&chatType=' + chatType
                });
            },
		}
	}
</script>

<style lang="scss">
    @import "../../commons/css/mycss.scss"; // 引入公共样式
    .content {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #f5f5f5; // 添加背景色
        padding: 200rpx 20rpx; // 增加左右内边距以适配小屏幕
    }

    .main {
        margin: 0rpx 20rpx 0; // 调整顶部和左右间距
        width: 100%;
    }

    .refresh {
        text-align: center;
        image {
            width: 32rpx;
            height: 32rpx;
        }

        .ref-title {
            padding-top: 10rpx;
            font-size: $uni-font-size-base;
            color: rgba(39, 40, 50, 0.4);
            line-height: 40rpx;
        }
    }
    .noone {
        text-align: center;
        image {
            height:250rpx;
            width: 150rpx;
        }
        .no-friends {
            padding: 32rpx 0;
            font-size: $uni-font-size-base;
            color: rgba(39, 40, 50, 0.4);
            line-height: 40rpx;
        }
        .search-bt {
            display: inline-block;
            width: 240rpx;
            line-height: 96rpx;
            height: 96rpx;
            background: $uni-color-primary;
            box-shadow: 0px 52rpx 36rpx -32rpx rgba(255,255,49, 0.4);
            border-radius: 48rpx;
        }
    }
    .friends-list {
        background: #ffffff; // 白色背景
        border-radius: 16rpx; // 圆角
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1); // 添加阴影
        margin-bottom: 20rpx; // 卡片间距
        padding: 20rpx; // 增加内边距
        display: flex;
        align-items: center;
        &:active, &:hover { // 添加点击和悬停效果
            background: #f0f0f0; // 点击时背景色变化
        }
        .friends-list-l {
            position: relative; // 确保子元素相对于父元素定位
            margin-right: 20rpx; // 增加左右间距

            image {
                width: 56rpx; // 调整头像大小
                height: 56rpx;
                border-radius: 50%; // 圆形头像
                background-color: $uni-color-primary;
            }
            .tip {
                position: absolute;
                z-index: 10;
                top: -8rpx; // 调整到图片右上方
                right: -8rpx; // 靠右对齐
                min-width: 36rpx;
                line-height: 36rpx;
                height: 36rpx;
                font-size: $uni-font-size-sm;
                background: $uni-color-warning;
                border-radius: $uni-border-radius-circle;
                color: $uni-text-color-inverse;
                text-align: center;
            }
            .groupm {
                position: absolute;
                z-index: 10;
                bottom: 8rpx;
                top: -8rpx; // 调整到图片右上方
                right: 0rpx; // 靠右对齐
                width: 16rpx;
                height: 16rpx;
                background: $uni-color-primary;
                border-radius: 8rpx;
                opacity: 0.8;
                box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
            }
        }

        .friends-list-r {
            flex: 1; // 占满剩余空间
            .top {
                display: flex;
                justify-content: space-between; // 左右对齐
                align-items: center;
                margin-bottom: 8rpx; // 增加间距
                .name {
                    font-size: 30rpx; // 调整字体大小
                    font-weight: 500;
                    color: #333333;
                }
                .time {
                    font-size: 26rpx; // 调整字体大小
                    color: #999999;
                }
            }
            .news {
                font-size: 26rpx; // 调整字体大小
                color: #666666;
                line-height: 36rpx; // 调整行高
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
            }
        }
    }
</style>
