<template>
	<view class="content">
		<view class="top-bar">
			<navigator :url="'../userDetail/index?id=' + uid" hover-class="none" class="top-bar-left">
				<image :src="imgurl" class="logo"></image>
			</navigator>
			<view class="top-bar-right">
				<view class="search" @tap="toSearch"><image src="/static/user/search.png"></image></view>
				<!-- <view class="add"><image src="/static/user/add.png"></image></view> -->
			</view>
		</view>
		<view class="main">
			<view class="friends">
				<navigator url="../chatRoom/index" class="friends-list" v-for="(friend, index) in friendsList" :key="index">
                    <view class="friends-list-l">
                        <text class="tip">{{ friend.tip }}</text>
                        <image :src="friend.imgUrl" class="avatar"></image>
                    </view>
                    <view class="friends-list-r">
                        <view class="top">
                            <view class="name">{{ friend.name }}</view>
                            <view class="time">{{ friend.time }}</view>
                        </view>
                        <view class="news">{{ friend.news }}</view>
                    </view>
                </navigator>
			</view>
		</view>
	</view>
</template>

<script>
    import { getFriendsList } from './../../commons/js/datas.js';
    import { dateTime } from './../../commons/js/utils.js'; // 导入 dateTime 函数

	export default {
		data() {
			return {
                friendsList: [], // 好友列表
                uid: '', // 用户ID
                userName: '', // 用户名
                imgurl: '', // 头像URL
                token: '', // 用户token
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
		onLoad() {
            // 页面加载时获取好友列表
            this.getFriendsList()
            this.getStorages()
		},
		methods: {
            getStorages() {
                // 获取本地存储的用户信息
                const userInfo = uni.getStorageSync('userInfo');
                if (userInfo) {
                    const { uid, userName, imgurl, token } = userInfo;
                    this.uid = uid; // 用户ID
                    this.userName = userName; // 用户名
                    this.imgurl = this.serverUrl + imgurl; // 头像URL
                    this.token = token; // 用户token
                } else {
                    uni.navigateTo({
                        url: '/pages/signIn/index'
                    });
                } 
            },
            getFriendsList() {
                const rawList = getFriendsList();
                this.friendsList = rawList.map(friend => {
                    return {
                        ...friend,
                        time: dateTime(friend.time), // 格式化时间
                        imgUrl: this.imageMap[friend.imgUrl], // 默认头像
                        tip: friend.tip || '1' // 默认提示
                    };
                });
            },
            toSearch() {
                uni.navigateTo({
                    url: '/pages/search/index'
                });
            },
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
