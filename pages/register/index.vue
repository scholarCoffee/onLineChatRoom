<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left" @click="navigateBack">
				<image src="../../static/user/back.png" class="back-img"></image>
			</view>
		</view>
		<view class="logo">
			<image src="/static/6.png" class="logo"></image>
		</view>
		<view class="main">
			<view class="title">注册</view>
			<view class="inputs">
				<view class="inputs-div">
					<input v-model="userName" type="text" placeholder="请输入用户名" class="user" placeholder-style="color:#999;font-weight:400;" @input="onInputUser"></input>
					<view class="employ" v-if="isUserEmploy">已占用</view>
					<image src="../../static/user/checked.png" class="ok" v-if="isUser"></image>
				</view>
				<view class="inputs-div">
					<input v-model="email" type="text" placeholder="请输入邮箱" class="email" placeholder-style="color:#999;font-weight:400;" @input="onInupuEmails"></input>
					<view class="employ" v-if="isEmailEmploy">已占用</view>
					<view class="invalid" v-if="isInvalid">邮箱无效</view>
					<image src="../../static/user/checked.png" class="ok" v-if="isEmail"></image>
				</view>
				<view class="inputs-div">
					<input :type="type" placeholder="设置密码" class="password" placeholder-style="color:#999;font-weight:400;" @input="onInputPassword"></input>
					<image :src="lookUrkl" class="look" @tap="looks"></image>
				</view>
			</view>
			<view :class="{
				'submit': isSubmitOk,
				'submit-disabled': !isSubmitOk
			}" @click="register">注册</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 'password', // 密码输入框类型
				isUser: false, // 用户名是否有效
				isEmail: false, // 邮箱是否有效
				email: '', // 邮箱输入值
				userName: '', // 用户名输入值
				password: '', // 密码输入值
				isOk: false, // 注册按钮是否可用
				isLook: false, // 密码是否可见
				isInvalid: false, // 邮箱是否无效
				isUserEmploy: false, // 用户名是否已占用
				isEmailEmploy: false, // 邮箱是否已占用
				lookUrkl: '../../static/user/noShow.png', // 密码可见图标
			};
		},
		computed: {
			isSubmitOk() {
				// 注册按钮是否可用的计算属性
				return this.isUser && this.isEmail && this.password.length > 0;
			}
		},
		methods: {
			looks() {
				this.isLook = !this.isLook; // 切换密码可见状态
				this.type = this.isLook ? 'text' : 'password'; // 根据状态设置输入框类型
				this.lookUrkl = this.isLook ? '../../static/user/noShow.png' : '../../static/user/show.png'; // 根据状态设置图标
			},
			onInupuEmails(e) {
				// 邮箱验证逻辑
				this.email = e.target.value;
				const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 邮箱正则表达式	
				if (emailPattern.test(email)) {
					this.isEmailEmploy = true
					this.isInvalid = false; // 邮箱无效提示隐藏
				} else {
					this.isEmailEmploy = false; // 邮箱无效
					this.isInvalid = true; // 显示邮箱无效提示
				}
			},
			onInputUser(e) {
				// 用户名验证逻辑
				this.userName = e.target.value;
				if (userName.length > 0) {
					this.isUser = true; // 用户名有效
					this.isUserEmploy = false; // 用户名已占用提示隐藏
				} else {
					this.isUser = false; // 用户名无效
					this.isUserEmploy = true; // 显示用户名已占用提示
				}
			},
			onInputPassword(e) {
				// 密码验证逻辑
				this.password = e.target.value;

			},
			navigateBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			register() {
				// 注册逻辑
				if (!this.isOk) {
					uni.showToast({
						title: '请填写完整信息',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				// 这里可以添加注册请求的逻辑，例如调用API进行注册
				uni.showToast({
					title: '注册成功',
					icon: 'success',
					duration: 2000
				});
				setTimeout(() => {
					uni.redirectTo({
						url: '/pages/signin/index'
					});
				}, 2000);
			}
		}
	}
</script>

<style lang="scss">
    @import "../../commons/css/mycss.scss"; // 引入公共样式
	.content {
		padding-top: var(--status-bar-height);
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
		.inputs {
			padding-top: 8rpx;
			input, .password {
				padding-top: 40rpx;
				height: 40rpx;
				font-size: $uni-font-size-lg;
				font-weight: 500;
				color: $uni-text-color;
				line-height: 88rpx;
				border-bottom: 1px solid $uni-border-color;
			}
		}
		.inputs-div {
			position: relative;
		}
		.employ, .invalid{
			position: absolute;
			top: 18rpx;
			right: 0;
			float: right;
			font-size: $uni-font-size-base;
			font-weight: 500;
			color: $uni-color-warning;
			line-height: 88rpx;
		}
		.ok {
			position: absolute;
			top: 44rpx;
			right: 0;
			width: 38rpx;
			height: 38rpx;
		}
		.look {
			position: absolute;
			top: 48rpx;
			right: 0;
			width: 32rpx;
			height: 32rpx;
		}
	}
	.submit {
		margin: 40rpx auto 0 auto;
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
	.submit-disabled {
		margin: 40rpx auto 0 auto;
		width: 520rpx;
		height: 96rpx;
		background: $uni-text-color-grey;
		box-shadow: 0 50rpx 32rpx -36rpx $uni-text-color-grey;
		border-radius: 48rpx;
		font-size: $uni-font-size-lg;
		color: #fff;
		line-height: 96rpx;
		text-align: center;
	}
</style>
