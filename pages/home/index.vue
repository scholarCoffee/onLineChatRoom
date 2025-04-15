<template>
	<view>
		<view class="top-bar">
			<view class="top-bar-left" @tap="navigateBack">
				<image src="../../static/user/back.png" class="back-img"></image>
			</view>
            <view class="top-bar-title">用户信息</view>
            <view class="top-bar-right">
                <view class="more-img" v-if="relation === 1 || relation === 0" @tap="userDetail">
                    <image src="../../static/user/more.png"></image>
                </view>
            </view>
		</view>
        <view class="bg">
            <view class="bg-bai" :animation="animationData4"></view>
            <image :src="user.imgurl" class="bg-img" mode="aspectFill"></image>
        </view>
        <view class="main">
            <view class="user-header">
                <view class="sex" :style=" {'background-color': sexColor}" :animation="animationData3">
                    <image :src="sexImg"></image>
                </view>
                <image :src="user.imgurl" class="user-img" mode="aspectFill" :animation="animationData2"></image>
            </view>
            <view class="user-img">
                <view class="name"> {{ user.name }}</view>
                <view class="nick" v-if="markname">昵称： {{ markname }}</view>
                <view class="intr"> {{ user.explain }}</view>
            </view>
        </view>
        <view class="bottom-bar">
            <view class="bottom-btn btn1" @tap="onAddFriend" v-if="relation === 2">加为好友</view>
            <view class="bottom-btn btn1" @tap="sendMessage" v-if="relation === 1">发送消息</view>
        </view>
        <view class="add-misg" :style="{ 'height': addHeight + 'px', 'bottom': (-addHeight) + 'px' }" :animation="animationData">
            <view class="name"> {{ user.name }}</view>
            <textarea v-model="msg" maxlength="120" class="add-main" :cursor-spacing="0" ></textarea>
        </view>
        <view class="add-bt bottom-bar" :animation="animationData1">
            <view class="close btn1" @tap="addFrinedAnimat">取消</view>
            <view class="send btn1" @tap="addSubmit">发送</view>            
        </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
                id: '', // 对象
                uid: '', // 用户ID
                token: '', // 用户token
                user: {},
                sexImg: '../../static/user/male.png', // 性别
                sexColor: 'rgb(255, 93, 91 ,1)', // 性别颜色
                relation: '', // 用户关系 0-自己，1-好友，2-陌生人
                userName: '', // 用户名
                markname: '',
                msg: '', // 消息内容
                addHeight: 0, // 弹出框高度
                animationData: {}, // 动画
                animationData1: {}, // 动画
                animationData2: {}, // 动画
                animationData3: {}, // 动画
                animationData4: {}, // 动画
                isAdd: false,
                
			};
		},
		computed: {
		},
        onLoad(e) {
            const { id } = e || {}
            this.id = id
            this.getStorages(); // 获取本地存储的用户信息
            this.getUser(); // 获取用户信息
            this.judgeFriend(); // 判断用户关系
        },
        onReady(){
            this.getElementStyle();
        },
		methods: {
            getStorages() {
                // 获取本地存储的用户信息
                const userInfo = uni.getStorageSync('userInfo');
                if (userInfo) {
                    const { userId, token, userName } = userInfo;
                    this.uid = userId; // 用户ID
                    this.token = token; // 用户token
                    this.userName = userName
                } else {
                    uni.navigateTo({
                        url: '/pages/signIn/index'
                    });
                } 
            },
            // 获取用户信息
            getUser() {
                uni.request({
					url: this.serverUrl + '/user/detail', // 替换为你的登录接口地址,
					method: 'POST',
					data: {
						id: this.id,
						token: this.token
					},
					success: (res) => {
						const { data, code } = res.data
						if (code === 200) {
							let { sex, imgurl, explain } = data || {}
                            imgurl = this.serverUrl + imgurl; // 头像URL
                            if (!explain) {
                                explain = '这个人很懒，什么都没有留下~'
                            }
                            this.sexJudge(sex)
                            this.user = {
                                ...data,
                                imgurl,
                                explain
                            }
                            this.getMarkName()
						} else {
							uni.showToast({
                                title: '获取用户信息失败',
                                icon: 'none',
                                duration: 2000
                            });
						}
					},
					fail: (err) => {
						uni.showToast({
							title: '获取用户信息失败',
							icon: 'none',
							duration: 2000
						});
					}
				})
            },
            // 性别判断
            sexJudge(e) {
                if (e == 'male') {
                    this.sexImg = '../../static/user/male.png'
                    this.sexColor = 'rgb(255, 93, 91 ,1)'
                } else if (e == 'female') {
                    this.sexImg = '../../static/user/female.png'
                    this.sexColor = 'rgb(87, 153, 255 ,1)'
                } else {
                    this.sexImg = '../../static/user/asexual.png'
                    this.sexColor = 'rgb(39, 40, 50 ,1)'
                }
            },
            // 判断用户关系
            judgeFriend() {
                if (this.id == this.uid) {
                    this.relation = 0
                } else {
                    uni.request({
                        url: this.serverUrl + '/search/isfriend', // 替换为你的登录接口地址,
                        method: 'POST',
                        data: {
                            uid: this.uid,
                            fid: this.id,
                            token: this.token
                        },
                        success: (res) => {
                            const { data, code } = res.data
                            if (code === 200) {
                               this.relation = 1
                            } else {
                               this.relation = 2
                            }
                        },
                        fail: (err) => {
                            uni.showToast({
                                title: '获取用户关系失败',
                                icon: 'none',
                                duration: 2000
                            });
                        }
                    })
                }
            },
            // 获取好友昵称
            getMarkName() {
                uni.request({
                    url: this.serverUrl + '/user/getmarkname', // 替换为你的登录接口地址,
                    method: 'POST',
                    data: {
                        uid: this.uid,
                        fid: this.id,
                        token: this.token
                    },
                    success: (res) => {
                        const { data, code } = res.data
                        if (code === 200) {
                           const { markname } = data
                           if (!this.markname) {
                             this.markname = markname
                           }
                        }
                    },
                    fail: (err) => {
                        uni.showToast({
                            title: '获取好友昵称失败',
                            icon: 'none',
                            duration: 2000
                        });
                    }
                })
            },
			navigateBack() {
				uni.navigateBack({
                    delta: 1
                });
			},
            getElementStyle() {
                const query = uni.createSelectorQuery().in(this);
                query.select('.bg').boundingClientRect((rect) => {
                    this.addHeight = rect.height - 186; // 获取元素的高度
                }).exec();
            },
            // 添加好友动画
            addFrinedAnimat() {
                this.isAdd = !this.isAdd; // 切换状态
                const animation = uni.createAnimation({
                    duration: 300,
                    timingFunction: 'ease'
                });
                const animation1 = uni.createAnimation({
                    duration: 300,
                    timingFunction: 'ease'
                });
                const animation2 = uni.createAnimation({
                    duration: 300,
                    timingFunction: 'ease'
                });
                const animation3 = uni.createAnimation({
                    duration: 300,
                    timingFunction: 'ease'
                });
                const animation4 = uni.createAnimation({
                    duration: 300,
                    timingFunction: 'ease'
                });
                if (this.isAdd) {
                    animation.bottom(0).step(); // 设置动画的初始状态
                    animation1.bottom(0).step(); // 设置动画的初始状态
                    animation2.width(120).height(120).top(-60).step(); // 设置动画的初始状态
                    animation3.opacity(0).step(); // 设置动画的初始状态
                    animation4.backgroundColor('rgba(255, 228, 49, 0.6)').step(); // 设置动画的初始状态
                } else {
                    animation.bottom(-this.addHeight).step(); // 设置动画的初始状态
                    animation1.bottom(-100).step(); // 设置动画的初始状态
                    animation2.width(200).height(200).top(0).step(); // 设置动画的初始状态
                    animation3.opacity(1).step(); // 设置动画的初始状态
                    animation4.backgroundColor('rgba(255, 228, 49, 0)').step();
                }
                this.animationData = animation.export();
                this.animationData1 = animation1.export();
                this.animationData2 = animation2.export();
                this.animationData3 = animation3.export();
                this.animationData4 = animation4.export();
            },
            onAddFriend() {
                this.msg = this.userName + ' 请求添加好友~'
                this.addFrinedAnimat() // 弹出添加好友框
            },
            addSubmit() {
                if (this.msg.length > 0) {
                    this.addFrinedAnimat() // 关闭添加好友框
                    // 搜索用户
                    uni.request({
                        url: this.serverUrl + '/friend/applyfriend', // 替换为你的登录接口地址,
                        method: 'POST',
                        data: {
                            uid: this.uid,
                            fid: this.id,
                            token: this.token,
                            msg: this.msg
                        },
                        success: (res) => {
                            const { data, code } = res.data || {}
                            if (code === 200) {
                                // 是好友
                                uni.showToast({
                                    title: '添加好友成功',
                                    icon: 'success',
                                    duration: 2000
                                });
                            }
                        },
                        fail: (err) => {
                            uni.showToast({
                                title: '没有搜索到相关用户',
                                icon: 'none',
                                duration: 2000
                            });
                        }
                    })
                }
            },
            // 跳转到用户详情页
            userDetail() {
                uni.navigateTo({
                    url: '/pages/userDetail/index?id=' + this.id
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
        padding-top: 240rpx;
        .user-header {
            position: relative;
            width: 412rpx;
            height: 412rpx;
            margin: 0 auto;
            .sex {
                position: absolute;
                z-index: 11;
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
                z-index: 10;
                top: 0;
                width: 400rpx;
                height: 400rpx;
                border-radius: 48rpx;
                border: 6px solid rgba(255, 255, 255, 1);
                box-shadow: 0 36rpx 40rpx 0rpx rgba(39, 40, 50, 0.1);
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
        bottom-btn {
            background-color: $uni-color-primary;
            margin: 0 $uni-spacing-col-base;
        }
    }
    .add-misg {
        position: fixed;
        bottom: 0;
        width: 100%;
        box-sizing: border-box;
        padding: 0 56rpx;
        background: rgba(255,255,255, 1);
        border-radius: 40rpx 40rpx 0rpx 0rpx;
        .name {
            padding-top: 168rpx 0 40rpx;
            font-size: 52rpx;
            color: $uni-text-color;
            line-height: 74rpx;
        }
        .add-main {
            padding: 18rpx 22rpx;
            box-sizing: border-box;
            width: 100%;
            height: 420rpx;
            background: $uni-bg-color-grey;
            border-radius: $uni-border-radius-base;
            font-size: $uni-font-size-lg;
            line-height: 44px;
            color: $uni-text-color;
        }   
    }
    .add-bt {
        bottom: -200rpx;
        z-index: 100;
        display: flex;
        align-items: center;
        .close {
            width: 172rpx;
            background: $uni-bg-color-hover;
            margin-left: $uni-spacing-col-base;
        }
        .send {
            flex: auto;
            margin:0 $uni-spacing-col-base;
            background: $uni-color-primary;
        }
    }
</style>
