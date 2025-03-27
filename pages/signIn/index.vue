<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-right" @click="navigateToRegister">
				<view class="text">注册</view>
			</view>
		</view>
		<view class="logo">
			<image src="/static/logo.png" class="logo"></image>
		</view>
		<view class="main">
			<view class="title">登录</view>
			<view class="slogan">欢迎回来</view>
			<view class="inputs">
				<view class="input-group">
					<input type="text" placeholder="请输入用户名" class="input"></input>
				</view>
				<view class="input-group">
					<input type="password" placeholder="请输入密码" class="input"></input>
				</view>
			</view>
			<view class="tips">请输入用户名和密码</view>
			<view class="submit">登录</view>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			navigateToRegister() {
				uni.navigateTo({
					url: '/pages/register/index'
				});
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #ffffff;
		padding: 0 20rpx;
	}

	.top-bar {
		width: 100%;
		height: 50rpx;
		background: linear-gradient(90deg, #4facfe, #00f2fe);
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding: 0 20rpx;
		.text {
			color: #ffffff;
			font-size: 28rpx;
			font-weight: bold;
		}
	}

	.logo {
		margin: 40rpx 0;
		.logo {
			width: 200rpx;
			height: 200rpx;
		}
	}

	.main {
		width: 100%;
		max-width: 600rpx;
		background: #f9f9f9;
		border-radius: 20rpx;
		padding: 40rpx;
		box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.1);
		.title {
			font-size: 36rpx;
			font-weight: bold;
			color: #333333;
			text-align: left;
			margin-bottom: 20rpx;
		}
		.slogan {
			font-size: 28rpx;
			color: #666666;
			text-align: left;
			margin-bottom: 40rpx;
		}
		.inputs {
			.input-group {
				margin-bottom: 20rpx;
				.input {
					width: 100%;
					height: 80rpx;
					border: 1rpx solid #cccccc;
					border-radius: 10rpx;
					padding: 0 20rpx;
					font-size: 28rpx;
					color: #333333;
				}
				.input:focus {
					border-color: #4facfe;
					outline: none;
				}
			}
		}
		.tips {
			font-size: 24rpx;
			color: #ff4d4f;
			text-align: center;
			margin-bottom: 20rpx;
		}
		.submit {
			width: 100%;
			height: 80rpx;
			background: linear-gradient(90deg, #4facfe, #00f2fe);
			color: #ffffff;
			font-size: 28rpx;
			font-weight: bold;
			text-align: center;
			line-height: 80rpx;
			border-radius: 10rpx;
			box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.1);
		}
		.submit:active {
			background: linear-gradient(90deg, #00f2fe, #4facfe);
		}
	}
</style>
