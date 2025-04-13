<template>
	<view class="content">
		<view class="top-bar">
			<navigator :url="'../userDetail/index?id=' + uid" hover-class="none" class="top-bar-left">
				<image :src="imgUrl" class="logo"></image>
			</navigator>
			<view class="top-bar-right">
				<view class="search" @tap="toSearch"><image src="/static/user/search.png"></image></view>
				<!-- <view class="add"><image src="/static/user/add.png"></image></view> -->
			</view>
		</view>
		<view class="main">
            <view class="refresh" v-if="!isRefresh">
                <image src="/static/user/refresh.png" class="refresh-icon"></image>
                <text class="ref-title">下拉刷新</text>
            </view>
            <view class="noone" v-if="isNoone">
                <image src="/static/user/noone.png" mode="aspectFill"></image>
                <view class="no-title">你还没有好友~</view>
                <view class="search-bt" @tap="toSearch">搜索好友</view>
            </view>
            <!-- 好友申请数量 -->
            <view class="friends" v-if="requestData > 0" @tap="goFriendRequest">
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
                uid: '', // 用户ID
                userName: '', // 用户名
                imgUrl: '', // 头像URL
                token: '', // 用户token
                requestData: 0, // 好友申请数
                requestTime: '', // 最后申请时间
                isRefresh: false,
                isNoone: false,
                imageMap: {
                    '1.png': '/static/1.png',
                    '2.png': '/static/2.png',
                    'fire.png': '/static/fire.png',
                    'fire-kt.png': '/static/fire-kt.png',
                    'fire-lb.png': '/static/fire-lb.png',
                    '5.png': '/static/5.png',
                }
			}
		},
        onShow() {
            this.getStorages()
            // 页面加载时获取好友请求
            this.getFriendsRequest()
            // 页面加载获取好友
            this.getFriendsList()
            this.join(this.uid)
        },
		methods: {
            onPullDownRefresh() {
                this.friendsList = []
                this.getStorages()
                // 下拉刷新
                this.getFriendsRequest()
                this.getFriendsList()
                setTimeout(() => {  
                    uni.stopPullDownRefresh(); // 停止下拉刷新动画
                }, 500)
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
                } else {
                    uni.navigateTo({
                        url: '/pages/signIn/index'
                    });
                } 
            },
            // 好友申请
            getFriendsRequest() {
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
                            this.isNoone = false
                            this.requestData = data.length; // 更新好友申请数量
                            if (data.length > 0) {
                                this.requestTime = data[0].lastTime
                                for(let i = 0 ; i < data.length; i++) {
                                    if (this.requestTime < data[i].lastTime) {
                                        this.requestTime = data[i].lastTime; // 更新最后申请时间
                                    }
                                }
                            } else {
                                this.isNoone = true
                            }
						} else {
							uni.showToast({
                                title: '获取好友请求失败',
                                icon: 'none',
                                duration: 2000
                            });
						}
					},
					fail: (err) => {
						uni.showToast({
							title: '获取好友请求失败',
							icon: 'none',
							duration: 2000
						});
					}
				})
            },
            // socket模块
            join(uid) {
                this.socket.emit('login', uid)
            },
            toSearch() {
                uni.navigateTo({
                    url: '/pages/search/index'
                });
            },
            goFriendRequest() {
                this.join()
                uni.navigateTo({
                    url: '/pages/friendRequest/index'
                });
            },
            // 好友列表
            getFriendsList() {
                this.friendsList = []
                uni.request({
					url: this.serverUrl + '/index/getFriend', // 替换为你的登录接口地址,
					method: 'POST',
					data: {
						uid: this.uid,
                        state: 0, // 2表示好友申请
						token: this.token
					},
					success: (res) => {
                        this.isRefresh = true
						const { data, code } = res.data
						if (code === 200) {
                            if (data.length > 0) {
                                this.isNoone = false
                                for(let i = 0; i < data.length ; i++) {
                                    data[i].imgUrl = this.serverUrl + data[i].imgUrl
                                    this.friendsList.push(data[i])
                                }
                                this.friendsList = sortByTip(this.friendsList, 'lastTime', 0)
                                for(let i = 0 ; i < this.friendsList.length; i++) {
                                    this.getLastMsg(this.friendsList, i)
                                    this.getUnread(this.friendsList, i)
                                }
                                // this.getGroup()
                            } else {
                                this.isNoone = true
                            }
						} else {
							uni.showToast({
                                title: '获取好友请求失败',
                                icon: 'none',
                                duration: 2000
                            });
						}
					},
					fail: (err) => {
						uni.showToast({
							title: '获取好友请求失败',
							icon: 'none',
							duration: 2000
						});
					}
				})
            },
            getLastMsg(arr, i) {
                uni.request({
					url: this.serverUrl + '/index/getlastmsg', // 替换为你的登录接口地址,
					method: 'POST',
					data: {
						uid: this.uid,
                        fid: arr[i].id,
						token: this.token
					},
					success: (res) => {
						const { data, code } = res.data
						if (code === 200) {
                            if (data.types == 0) {
                                // 文字
                            } else if (data.types == 1) {
                                // 图片
                                data.message = '[图片]'
                            } else if (data.types == 2) {
                                data.message = '[音频]'
                            } else if (data.types == 3) {
                                data.message = '[位置]'
                            }
                            arr[i].message = data.message
                            arr.splice(i, 1, arr[i])
						} else {
							uni.showToast({
                                title: '获取最后一条消息失败',
                                icon: 'none',
                                duration: 2000
                            });
						}
					},
					fail: (err) => {
						uni.showToast({
							title: '获取好友请求失败',
							icon: 'none',
							duration: 2000
						});
					}
				})
            },
            getUnread(arr, i) {
                uni.request({
					url: this.serverUrl + '/index/unreadmsg', // 替换为你的登录接口地址,
					method: 'POST',
					data: {
						uid: this.uid,
                        fid: arr[i].id,
						token: this.token
					},
					success: (res) => {
						const { data, code } = res.data
						if (code === 200) {
                            let e = arr[i]
                            e.tip = data
                            arr.splice(i, 1, e)
						} else {
							uni.showToast({
                                title: '获取最后一条消息失败',
                                icon: 'none',
                                duration: 2000
                            });
						}
					},
					fail: (err) => {
						uni.showToast({
							title: '获取好友请求失败',
							icon: 'none',
							duration: 2000
						});
					}
				})
            },
            // 好友列表
            getGroup() {
                uni.request({
					url: this.serverUrl + '/index/getgroup', // 替换为你的登录接口地址,
					method: 'POST',
					data: {
						uid: this.uid,
						token: this.token
					},
					success: (res) => {
						const { data, code } = res.data
						if (code === 200) {
                            for(let i = 0; i < data.length ; i++) {
                                data[i].imgUrl = this.serverUrl + data[i].imgUrl
                                if (data[i].markname) {
                                    data[i].name = data[i].markname
                                }
                                this.friendsList.push(data[i])
                            }
                            this.friendsList = sortByTip(this.friendsList, 'lastTime', 0)
                            for(let i = 0 ; i < this.friendsList.length; i++) {
                                this.getLastMsg(this.friendsList, i)
                                this.getUnread(this.friendsList, i)
                            }
						} else {
							uni.showToast({
                                title: '获取好友请求失败',
                                icon: 'none',
                                duration: 2000
                            });
						}
					},
					fail: (err) => {
						uni.showToast({
							title: '获取好友请求失败',
							icon: 'none',
							duration: 2000
						});
					}
				})
            },
            toChatRoom(data) {
                const { id, name, imgurl, type } = data || {}
                uni.navigateTo({
                    url: '/pages/chatRoom/index?id=' + id + '&name=' + name + '&imgurl=' + imgurl + '&type=' + type
                });
            }
		}
	}
</script>

<style lang="scss">
    @import "../../commons/css/mycss.scss"; // 引入公共样式
    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #f5f5f5; // 添加背景色
        padding: 0 20rpx; // 增加左右内边距以适配小屏幕
    }

    .main {
        margin: 240rpx 20rpx 0; // 调整顶部和左右间距
        width: 100%;
    }

    .refresh {
        text-align: center;
        padding-top: 480rpx;
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
        padding-top: 480rpx;
        image {
            height:250rpx;
            width: 150rpx;
        }
        .no-title {
            padding-top: 32rpx 0;
            font-size: $uni-font-size-base;
            color: rgba(39, 40, 50, 0.4);
            line-height: 40rpx;
        }
        .search-bt {
            display: inline-block;
            width: 240rpx;
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
