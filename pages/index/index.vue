<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left">
				<image src="/static/logo.png" class="logo"></image>
			</view>
			<view class="top-bar-center">
				<text class="title">{{ title }}</text>
			</view>
			<view class="top-bar-right">
				<view class="search"><image src="/static/logo.png"></image></view>
				<view class="add"><image src="/static/logo.png"></image></view>
			</view>
		</view>
		<view class="main">
			<view class="friends">
				<view class="friends-list" v-for="(friend, index) in friendsList" :key="index">
                    <view class="friends-list-l">
                        <text class="tip">{{ friend.tip }}</text>
                        <image :src="friend.avatar" class="avatar"></image>
                    </view>
                    <view class="friends-list-r">
                        <view class="top">
                            <view class="name">{{ friend.name }}</view>
                            <view class="time">{{ friend.time }}</view>
                        </view>
                        <view class="news">{{ friend.news }}</view>
                    </view>
                </view>
			</view>
			<view class="friends">
				<view class="friends-list">
					<view class="friends-list-l">
						<text class="tip">1</text>
						<image src="/static/logo.png" class="avatar"></image>
					</view>
					<view class="friends-list-r">
						<view class="top">
							<view class="name">2</view>
							<view class="time">13:43</view>
						</view>
						<view class="news">3</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
    import { friendFn } from './../../commons/js/datas.js';
    import { dateTime } from './../../commons/js/utils.js'; // 导入 dateTime 函数

	export default {
		data() {
			return {
				title: 'Hello',
                friendsList: [], // 好友列表
			}
		},
		onLoad() {
            // 页面加载时获取好友列表
            this.getFriendsList()
		},
		methods: {
            getFriendsList() {
                const rawList = friendFn.getFriendsList();
                this.friendsList = rawList.map(friend => ({
                    ...friend,
                    time: dateTime(friend.time) // 格式化时间
                }));
            },
		}
	}
</script>

<style lang="scss">
    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #f5f5f5; // 添加背景色
        padding: 0 20rpx; // 增加左右内边距以适配小屏幕
    }

    .top-bar {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        height: 100rpx; // 调整高度以适配不同屏幕
        width: 100%;
        box-sizing: border-box;
        background: linear-gradient(90deg, #4facfe, #00f2fe); // 渐变背景
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); // 添加阴影
        .top-bar-left {
            padding-left: $uni-spacing-col-base;
            float: left;
            image {
                margin-top: 10rpx;
                width: 60rpx; // 调整图标大小
                height: 60rpx;
                border-radius: 16rpx;
            }
        }
        .top-bar-center {
            position: absolute;
            text-align: center;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            flex: 1;
            margin: auto;
            .title {
                font-size: 32rpx; // 调整字体大小
                font-weight: bold;
                color: #ffffff; // 白色字体
            }
        }
        .top-bar-right {
            float: right;
            padding-right: 14rpx;
            .search, .add {
                width: 72rpx; // 调整按钮大小
                height: 72rpx;
                display: inline-block;
            }
            image {
                padding: 18rpx 0 0 18rpx;
                width: 48rpx; // 调整图标大小
                height: 48rpx;
            }
        }
    }

    .main {
        padding: 140rpx 20rpx 0; // 调整顶部和左右间距
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
				display: flex;
                font-size: 26rpx; // 调整字体大小
                color: #666666;
                line-height: 36rpx; // 调整行高
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap; // 单行显示并省略
            }
        }
    }
</style>
