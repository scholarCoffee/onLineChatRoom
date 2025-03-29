<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-right" @click="navigateToRegister">
				<view class="text">注册</view>
			</view>
		</view>
		<view class="logo">
			<image src="/static/6.webp"></image>
		</view>
		<view class="main">
			<view class="title">登录</view>
			<view class="slogan">欢迎回来</view>
			<view class="inputs">
				<input type="text" placeholder="请输入用户名/邮箱" class="user" placeholder-style="color:#999;font-weight:400;" @blur="getUserInfo"></input>
				<input type="password" placeholder="请输入密码" class="psw" placeholder-style="color:#999;font-weight:400;" @blur="getPassword"></input>
			</view>
			<view class="tips">输入用户或密码错误！</view>
		</view>

		<view class="submit" @tap="navigateToLogin">登录</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: '',
				password: ''
			}
		},
		methods: {
			navigateToRegister() {
				uni.navigateTo({
					url: '/pages/register/index'
				});
			},
			navigateToLogin() {
				if (this.user.length == 0 || this.password.length == 0) {
					uni.showToast({
						title: '请输入用户名或密码',
						icon: 'none'
					})
					return
				}
				uni.navigateTo({
					url: '/pages/index/index'
				});
			},
			getUserInfo(e) {
				const { value } = e.target || {}
				this.user = value
			},
			getPassword(e) {
				const { value } = e.target || {}
				this.password = value
			}
		}
	}
</script>

<style lang="scss">
    @import "../../commons/css/mycss.scss"; // 引入公共样式
	.content {
		padding-top: var(--status-bar-height);
	}
	.top-bar-right {
		line-height: 88rpx;
	}

	.logo {
		text-align: center;
		image{
			padding-top: 226rpx;
			width: 194rpx;
			height: 194rpx;
			margin: 0 atuo;
		}
	}


	.main {
		padding: 54rpx $uni-spacing-row-lg 120rpx;
		.title {
			font-size: 56rpx;
			font-weight: 500;
			color: $uni-text-color;
			line-height: 80rpx;
		}
		.slogan {
			font-size: 40rpx;
			color: $uni-text-color-grey;
			line-height: 56rpx;
		}
		.inputs {
			padding-top: 8rpx;
			input {
				padding-top: 40rpx;
				height: 40rpx;
				font-size: $uni-font-size-lg;
				font-weight: 500;
				color: $uni-text-color;
				line-height: 88rpx;
				border-bottom: 1px solid $uni-border-color;
			}
		}
		.tips {
			float: left;
			font-size: $uni-font-size-lg;
			color: $uni-color-warning;
			line-height: 56rpx;
		}
	}
	.submit {
		margin: 0 auto;
		width: 520rpx;
		height: 96rpx;
		background: $uni-color-primary;
		box-shadow: 0 50rpx 32rpx -36rpx rgba(255,228,49,0.4);
		border-radius: 48rpx;
		font-size: $uni-font-size-lg;
		color: $uni-text-color;
		line-height: 96rpx;
		text-align: center;
	}
	.submit:active {
		background: linear-gradient(90deg, #00f2fe, #4facfe);
	}
</style>
