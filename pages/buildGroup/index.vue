<template>
    <view>
        <view class="top-bar">
            <view class="top-bar-left" @tap="navigateBack">
                <image src="../../static/user/back.png" class="back-img"></image>
            </view>
            <view class="top-bar-center">创建群聊</view>
            <view class="top-bar-right">
                <view class="pice"></view>
            </view>
        </view>
        <view class="main">
            <view class="top">
                <!-- 群头像 -->
                <view class="group-img" @tap="chooseImage">
                    <image :src="tempFilePaths" class="group-img"></image>
                </view>
                <!-- 群名字 -->
                <view class="group-name">
                    <input v-model="name" class="group-name-input" type="text" placeholder="为群取个名字吧" placeholder-style="color:#aaa;" />
                </view>
            <view class="title">用户</view>
            </view>
            <!-- 选择用户 -->
            <view class="friends">
                <view class="user" v-for="(item, index) in friendsList" :key="index" @tap="selectFriend(index)">
                    <view class="selected" :class="{
                        'isselected':item.selected
                    }">
                        <image src="../../static/choose_bold.png" class="selected-img" v-if="item.selected"></image>
                    </view>
                    <image class="user-img" :src="item.imgurl"></image>
                    <view class="user-name">{{item.name}}</view>
                </view>
            </view>
        </view>
        <view class="bottom-bar">
            <view class="bottom-btn btn1" :class="{
                'selected': selectedNo > 0 && name.length > 0
            }" @tap="createGroup">创建({{ selectedNo }})</view>
        </view>
    </view> 
</template>
<script>
    export default {
        data() {
            return {
                friendsList: [],
                uid: '',
                token: '',
                gimgurl: '/group/group.png',
                tempFilePaths: '../../static/1.png',
                selectedNo: 0,
                name: '',
            }
        },
        onLoad() {
            this.onSelectNumber()
            this.getStorages()
            this.getFriendsList()
        },
        methods: {
            navigateBack() {
                uni.navigateTo({
                    url: '../index/index'
                })
            },
            getStorages() {
                // 获取本地存储的用户信息
                const userInfo = uni.getStorageSync('userInfo');
                if (userInfo) {
                    const { userId, token } = userInfo;
                    this.uid = userId; // 用户ID
                    this.token = token; // 用户token
                } else {
                    uni.navigateTo({
                        url: '/pages/signIn/index'
                    });
                } 
            },
            chooseImage() {
                uni.chooseImage({
                count: 1,
                sizeType: ['original', 'compressed'],
                sourceType: ['album', 'camera'],
                success: (res) => {
                    this.tempFilePaths = res.tempFilePaths.shift();
                    // 显示加载提示
                    uni.showLoading({
                        title: '正在上传图片...'
                    });
                    uni.uploadFile({
                        url: this.serverUrl + 'files/upload', // 替换为你的上传接口地址
                        filePath: this.tempFilePaths,
                        name: 'file',
                        fileType: 'image',
                        formData: {
                            url: 'user',
                            name: this.uid + new Date().getTime(),
                            token: this.token
                        },
                        success: (res) => {
                            try {
                                const backImg = JSON.parse(res.data);
                                this.gimgurl = backImg;
                                uni.showToast({
                                    title: '头像修改成功',
                                    icon: 'success',
                                    duration: 2000
                                });
                            } catch (error) {
                                uni.showToast({
                                    title: '解析返回数据失败',
                                    icon: 'none',
                                    duration: 2000
                                });
                            }
                        },
                        fail: (err) => {
                            uni.showToast({
                                title: '头像修改失败',
                                icon: 'none',
                                duration: 2000
                            });
                        },
                        complete: () => {
                            // 隐藏加载提示
                            uni.hideLoading();
                        }
                    });
                },
                fail: (err) => {
                    uni.showToast({
                        title: '选择图片失败',
                        icon: 'none',
                        duration: 2000
                    });
                }
});
            },
            // 获取已选择个数
            onSelectNumber() {
                for(let i = 0; i < this.friendsList.length; i++) {
                    if(this.friendsList[i].selected) {
                        this.selectedNo++
                    }
                }
            },
            selectFriend(e) {
                if (this.friendsList[e].selected) {
                    this.friendsList[e].selected = false
                    this.selectedNo--
                } else {
                    this.selectedNo++
                    this.friendsList[e].selected = true
                }
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
                                // this.isNoone = false
                                for(let i = 0; i < data.length ; i++) {
                                    data[i].imgurl = this.serverUrl + data[i].imgurl
                                    data[i].selected = false
                                    if (data[i].markname) {
                                        data[i].name = data[i].markname
                                    }
                                    this.friendsList.push(data[i])
                                }
                            }
						} else {
							uni.showToast({
                                title: '获取好友列表失败',
                                icon: 'none',
                                duration: 2000
                            });
						}
					},
					fail: (err) => {
						uni.showToast({
							title: '获取好友列表失败' + err,
							icon: 'none',
							duration: 2000
						});
					}
				})
            },
            // 创建群聊
            createGroup() {
                if (this.selectedNo > 0 && this.name.length > 0) {
                    for(let i = 0 ;i < this.friendsList.length; i++) {
                        if (this.friendsList[i].selected) {
                            this.user.push(this.friendsList[i].id)
                        }
                    }
                    uni.request({
                        url: this.serverUrl + '/group/createGroup', // 替换为你的登录接口地址,
                        method: 'POST',
                        data: {
                            uid: this.uid,
                            token: this.token,
                            name: this.name,
                            imgurl: this.gimgurl,
                            user: this.user
                        },
                        success: (res) => {
                            const { data, code } = res.data
                            if (code === 200) {
                                uni.showToast({
                                    title: '创建成功',
                                    icon: 'none',
                                    duration: 2000
                                });
                                uni.navigateTo({
                                    url: '../index/index'
                                })
                            } else {
                                uni.showToast({
                                    title: '创建失败',
                                    icon: 'none',
                                    duration: 2000
                                });
                            }
                        },
                        fail: (err) => {
                            uni.showToast({
                                title: '创建失败',
                                icon: 'none',
                                duration: 2000
                            });
                        }
                    })
                } else {
                    uni.showToast({
                        title: '请至少选择一个好友并输入群名称',
                        icon: 'none',
                        duration: 2000
                    });
                }
            }
        }
    }
</script>
<style lang="scss">
    @import "../../commons/css/mycss.scss"; // 引入公共样式
    .top-bar {
        background: rgba(255,255,255, 1);
        border-bottom: 1px solid $uni-border-color;
    }
    .main {
        display: flex;
        flex-direction: column;
        .top {
            position: fixed;
            padding-top: 188rpx;
            background-color: #fff;
            width: 100%;
            z-index: 99;
        }
        .group-img {
            width: 196rpx;
            height: 196rpx;
            margin: 0 auto;
            background: $uni-color-primary;
            box-shadow: 0px 36px 40px 0 rgba(39,40,50,0.1);
            border-radius: 40rpx;
            overflow: hidden;
            .img {
                width: 196rpx;
                height: 196rpx;
            }
        }
        .group-name {
            padding: 62rpx $uni-spacing-col-base 0;
        }
        .group-name-input {
            text-align: center;
            height: 92rpx;
            background: $uni-bg-color-grey;
            border-radius: 46rpx;
            font-size: 32rpx;
            color: $uni-text-color;
        }
        .title {
            padding: $uni-spacing-col-base $uni-spacing-row-base 20rpx;
            font-size: 44rpx;
            font-weight: 600;
            color: $uni-text-color;
            line-height: 60px;
        }
        .friends {
            padding: 700rpx $uni-spacing-row-base 100rpx;
            .user {
                display: flex;
                flex-direction: row;
                align-items: center;
                height: 120rpx;
                .selected {
                    flex: none;
                    margin-right: 30rpx;
                    width: 48rpx;
                    height: 48rpx;
                    background: rgba(255, 228, 49, 0.5);
                    border-radius: 24rpx;
                    position: relative;
                    .selected-img {
                        width: 30rpx;
                        height: 20rpx;
                        position: absolute;
                        left: 10rpx;
                        top: 16rpx
                    }
                    .isselected {
                        background: rgba(255, 228, 49, 1); 
                    }
                }
                .user-img {
                    width: 80rpx;
                    height: 80rpx;
                    background: rgba(255, 228, 49, 1); 
                    border-radius: $uni-border-radius-base;
                }
                .user-name {
                    padding-left: 32rpx;
                    font-size: 30rpx;
                    color: $uni-text-color;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                }
            }
        }
    }
    .bottom-bar {
        background: rgba(250, 250, 250, 0.9);
        box-shadow: 0px 1px 0px 0px rgba(0, 0, 0 , 0.25);
        .bottom-btn {
            background: $uni-bg-color-grey;
            margin: 0 $uni-spacing-col-base;
        }
        .selected {
            background: $uni-color-primary;
        }
    }
</style>