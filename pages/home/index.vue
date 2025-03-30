<template>
	<view>
		<view class="top-bar">
			<view class="top-bar-left" @tap="navigateBack">
				<image src="../../static/user/back.png" class="back-img"></image>
			</view>
            <view class="top-bar-right">
                <view class="more-img">
                    <image src="../../static/user/more.png"></image>
                </view>
            </view>
		</view>
        <view class="bg">
            <view class="bg-bai"></view>
            <image src="../../static/1.webp" class="bg-img" mode="aspectFill"></image>
        </view>
        <view class="main">
            <view class="user-header">
                <view class="sex" :style=" {'background-color': sexColor}">
                    <image src="../../static/user/male.png"></image>
                </view>
                <image src="../../static/1.webp" class="user-img" mode="aspectFill"></image>
            </view>
            <view class="user-imf">
                <view class="name"> {{ user.name }}</view>
                <view class="nick">昵称： {{ user.nick }}</view>
                <view class="intr"> {{ user.intr }}</view>
            </view>
        </view>
        <view class="bottom-bar">
            <view class="bottom-btn">加为好友</view>
        </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
                sexColor: 'rgb(255, 93, 91 ,1)', // 性别颜色
                user: {
                    name: '张三',
                    nick: '秋之果',
                    intr: 'do yourself'
                }
			};
		},
		computed: {
		},
		methods: {
			navigateBack() {
				uni.navigateBack({
                    delta: 1
                });
			}
		}
	}
</script>

<style lang="scss">
    @import "../../commons/css/mycss.scss"; // 引入公共样式
	.bg {
        position: fixed;
        z-index: -2;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        .bg-bai {
            width: 100%;
            height: 100%;
        }
        .bg-img {
            opacity: 0.4;
            position: absolute;
            z-index: -1;
            left: -10rpx;
            top: -10rpx;
            width: 110%;
            height: 110%;
            filter: blur(16px);
        }
    }
    .main {
        text-align: center;
        padding-top: 148rpx;
        .user-header {
            position: relative;
            width: 412rpx;
            height: 412rpx;
            margin: 0 auto;
            .sex {
                position: absolute;
                z-index: 10;
                right: 22rpx;
                bottom: 22rpx;
                width: 64rpx;
                height: 64rpx;
                border-radius: $uni-border-radius-circle;
                image {
                    padding: 16rpx;
                    width: 32rpx;
                    height: 32rpx;
                }
            }
            .user-img {
                width: 400rpx;
                height: 400rpx;
                border-radius: 48rpx;
                border: 6px solid rgba(255, 255, 255, 1)
            }
        }
        .user-imf {
            padding-top: 42rpx;
            .name {
                font-size: 52rpx;
                font-weight: 500;
                color: $uni-text-color;
                line-height: 74rpx;
            }
            .nick {
                font-size: $uni-font-size-base;
                color:  $uni-text-color;
                line-height: 40rpx;
            }
            .intr {
                padding-top: 20rpx 100rpx;
                font-size: $uni-font-size-base;
                font-weight: 300;
                color:  $uni-text-color;
                line-height: 48rpx;
            }
        }
    }
    .bottom-bar {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 104rpx;
        // background-color: #eee;
        .bottom-btn {
            position:absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            text-align: center;
            font-size: $uni-font-size-lg;
            color: $uni-text-color;
            line-height: 80rpx;
            width: 684rpx;
            height: 80rpx;
            background: $uni-color-primary;
            border-radius: $uni-border-radius-base;
        }
    }
</style>
