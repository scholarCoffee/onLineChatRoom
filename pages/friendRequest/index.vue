
<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left" @tap="navigateBack">
				<image src="../../static/user/back.png" class="back-img"></image>
			</view>
            <view class="top-bar-center">
                <view class="title">好友请求</view>
            </view>
            <view class="top-bar-right">
                <view class="pice"></view>
            </view>
		</view>
		<view class="main" v-if="requesters.length > 0">
            <view class="requester" v-for="(item, index) in requesters" :key="index">
                <view class="request-top">
                   <view class="reject btn" @tap="refuse(item.id)">拒绝 </view>
                   <view class="header-img">
                        <image :src="item.imgUrl"></image> 
                   </view>
                   <view class="aggree btn" @tap="agree(item.id)">同意 </view>
                </view>
                <view class="request-center">
                    <view class="title">{{ item.name }}</view>
                    <view class="time">{{ changeTime(item.lastTime) }}</view>
                </view>
                <view class="notic">
                    <text>留言：</text>
                    {{ item.message }}
                </view>
            </view>
        </view>
        <view class="main" v-else>
            <view class="requester">
                <view class="request-top">
                   <view class="header-img">
                        <image src="../../static/user/empty.png"></image> 
                   </view>
                </view>
                <view class="request-center">
                    <view class="title">暂无好友请求</view>
                </view>
            </view>
        </view>
	</view>
</template>

<script>
    import { dateTime } from './../../commons/js/utils.js'; // 导入 dateTime 函数
	export default {
		data() {
			return {
                requesters: [],
                uid: '',
                userName: '',
                token: ''
			};
		},
        onLoad() {
            this.getStorages()
            this.friendRequest()
        },
		methods: {
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
			navigateBack() {
				uni.navigateBack({
					delta: 1
				});
			},
            changeTime(time) {
                return dateTime(time)
            },
            friendRequest() {
                uni.request({
					url: this.serverUrl + '/index/getFriend', // 替换为你的登录接口地址,
					method: 'POST',
					data: {
						uid: this.uid,
                        state: 1,
						token: this.token
					},
					success: (res) => {
						const { data, code } = res.data
						if (code === 200) {
                            for(let i = 0 ; i < data.length; i ++) {
                                data[i].imgurl = this.serverUrl + data[i].imgurl
                                this.getLeave(data, i)
                            }
                            this.requesters = data
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
            // 获取留言
            getLeave(arr, i) {
                uni.request({
					url: this.serverUrl + '/index/getlastmsg', // 替换为你的登录接口地址,
					method: 'POST',
					data: {
						uid: this.uid,
                        fid: arr[i].id, // 2表示好友申请
						token: this.token
					},
					success: (res) => {
						const { data, code } = res.data
						if (code === 200) {
                            arr[i].message = data.message
                            arr.splice(i, 1, arr[i])
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
            // 拒绝好友申请
            refuse(fid) {
                uni.request({
					url: this.serverUrl + '/friend/deleteFriend', // 替换为你的登录接口地址,
					method: 'POST',
					data: {
						uid: this.uid,
                        fid: fid, // 2表示好友申请
						token: this.token
					},
					success: (res) => {
						const { data, code } = res.data
						if (code === 200) {
                            for(let i = 0 ; i < this.requesters.length; i++) {
                                if (this.requesters[i].id == fid) {
                                    this.requesters.splice(i, 1)
                                }
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
            agree(fid) {
                uni.request({
					url: this.serverUrl + '/friend/updateFriendState', // 替换为你的登录接口地址,
					method: 'POST',
					data: {
						uid: this.uid,
                        fid: fid, // 2表示好友申请
						token: this.token
					},
					success: (res) => {
						const { data, code } = res.data
						if (code === 200) {
                            for(let i = 0 ; i < this.requesters.length; i++) {
                                if (this.requesters[i].id == fid) {
                                    this.requesters.splice(i, 1)
                                }
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
            }
		}
	}
</script>

<style lang="scss">
    @import "../../commons/css/mycss.scss"; // 引入公共样式
	.top-bar {
        background: rgba(255,255,255,0.96);
        border-bottom:1px solid $uni-border-color;
    }
    .main {
        padding: 108rpx $uni-spacing-col-base;
        .requester {
            margin-top: 80rpx;
            padding: $uni-spacing-col-base;
            background: rgba(255,255,255,1);
            box-shadow: 0rpx 24rpx 65rpx -8rpx #d5d5d6;
            border-radius: $uni-border-radius-base;
        }
        .request-top {
            display: flex;
            flex-direction: row;
            .btn {
                flex: none;
                width: 160rpx;
                text-align: center;
                width: 160rpx;
                height: 64rpx;
                background: rgba(255,93,91, 0.1);
                border-radius: 40rpx;
                line-height: 64rpx;
                font-size: $uni-font-size-lg;
            }
            .reject {
                color: $uni-color-warning;
                background-color: rgba(255,93,91,0.1)
            }
            .aggree {
                color: $uni-text-color;
                background-color: $uni-color-primary
            }
        }

        .header-img {
            flex: auto;
            margin-top: -72rpx;
            text-align: center;
            image {
                width: 144rpx;
                height: 144rpx;
                border-radius: 50%;
            }
        }
        .request-center {
            padding-top: 20rpx;
            padding-bottom: 40rpx;
            text-align: center;
            .title {
                font-size: 36rpx;
                font-weight: 500;
                color: $uni-text-color;
                line-height:50rpx
            }
            .time {
                font-size: $uni-font-size-sm;
                color: $uni-text-color-disable;
                line-height:34rpx
            }
        }
        .notic {
            padding: 20rpx $uni-spacing-col-base;
            border-radius: $uni-border-radius-base;
            font-size: $uni-font-size-sm;
            background-color: $uni-bg-color-grey;
            color:$uni-text-color;
            line-height: 40rpx;
        }
    }

    

</style>
