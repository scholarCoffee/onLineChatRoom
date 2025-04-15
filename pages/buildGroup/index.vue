<template>
    <view class="top-bar">
        <view class="top-bar-left" @click="navigateBack">
            <image src="../../static/user/back.png" class="back-img"></image>
        </view>
        <view class="top-bar-center">

        </view>
        <view class="top-bar-right">
            <view class="pice"></view>
        </view>
        <view class="main">
            <!-- 群头像 -->
            <view class="group-img" @tap="chooseImage">
                <image :src="tempFilePaths" class="group-img"></image>
            </view>
            <!-- 群名字 -->
            <view class="group-name">
                <input class="group-name-input" type="text" placeholder="为群取个名字吧" placeholder-style="color:#aaa;" />
            </view>
        </view>
    </view>
</template>
<script>
    export default {
        data() {
            return {
                tempFilePaths: '../../static/user/user.png'
            }
        },
        methods: {
            navigateBack() {
                uni.navigateTo({
                    url: '../index/index'
                })
            },
            chooseImage() {
                uni.chooseImage({
                    count: 1,
                    sizeType: ['original', 'compressed'],
                    sourceType: ['album', 'camera'],
                    success: (res) => {
                         this.tempFilePaths = res.tempFilePaths.shift()
                         uni.uploadFile({
                            url: this.serverUrl + 'files/upload', // 替换为你的上传接口地址
                            filePath: this.tempFilePaths,
                            name: 'file',
                            fileType: 'image',
                            formData: {
                                url: 'user',
                                name: this.uid,
                                token: this.token
                            },
                            success: (res) => {
                                const backImg = JSON.parse(res.data)
                               
                            },
                            fail: (err) => {
                                uni.showToast({
                                    title: '头像修改失败',
                                    icon: 'none',
                                    duration: 2000
                                });
                            }
                        })
                    }
                })
            },
        }
    }
</script>
<style lang="scss">
    @import "../../commons/css/mycss.scss"; // 引入公共样式
    .top-bar {
        background: rgba(255,255,255,0.96);
        border-bottom: 1px solid $uni-border-color;
    }
    .main {
        padding-top: 118rpx;
        display: flex;
        flex-direction: column;
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
            padding: 62rpx $uni-spacing-col-base;
        }
        .group-name-input {
            text-align: center;
            height: 92rpx;
            background: $uni-bg-color-grey;
            border-radius: 46rpx;
            font-size: 32rpx;
            color: $uni-text-color;
        }
    }
</style>