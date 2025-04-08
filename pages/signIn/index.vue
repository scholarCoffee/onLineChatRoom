<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-right" @click="navigateToRegister">
				<view class="text">注册</view>
			</view>
		</view>
		<view class="logo">
			<image src="/static/fire.png"></image>
		</view>
		<view class="main">
			<view class="title">登录</view>
			<view class="slogan">欢迎回来</view>
			<view class="inputs">
				<input type="text" v-model="username" placeholder="请输入用户名/邮箱" class="user" placeholder-style="color:#999;font-weight:400;"></input>
				<input type="password" v-model="password" placeholder="请输入密码" class="psw" placeholder-style="color:#999;font-weight:400;"></input>
			</view>
			<view class="tips" v-show="isOk">输入用户或密码错误！</view>
		</view>
		<view class="submit" @tap="navigateToLogin">登录</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: '',
				isOk: false
			}
		},
		onLoad(e) {
			const { username, oldName } = e || {}
			if (username) {
				this.username = username
				uni.showToast({
					title: '注册成功请登录',
					icon: 'none',
					duration: 2000
				});
			} else if (oldName) {
				this.username = oldName
				uni.showToast({
					title: '登录过期请重新登录',
					icon: 'none',
					duration: 2000
				});
			}
		},
		methods: {
			navigateToRegister() {
				uni.navigateTo({
					url: '/pages/register/index'
				});
			},
			navigateToLogin() {
				if (this.username.length === 0 || this.password.length === 0) {
					uni.showToast({
						title: '用户名或密码不能为空',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				uni.request({
					url: this.serverUrl + '/signin/match', // 替换为你的登录接口地址,
					method: 'POST',
					data: {
						name: this.username,
						pwd: this.password
					},
					success: (res) => {
						this.isOk = false; // 隐藏错误提示
						const { data, code } = res.data
						if (code === 200) {
							uni.setStorageSync('userInfo', {
								name: data.name,
								imgurl: data.imgurl,
								token: data.token,
								id: data.id
							}); // 存储用户信息
							uni.showToast({
								title: '登录成功',
								icon: 'success',
								duration: 2000
							});
							uni.navigateTo({
								url: '/pages/index/index'
							});
						} else {
							this.isOk = true; // 显示错误提示
							this.password = ''; // 清空密码
						}
					},
					fail: (err) => {
						this.isOk = true
						this.password = ''; // 清空密码
						uni.showToast({
							title: '登录失败，请稍后再试',
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
