<template>
    <view class="content">
		<view class="top-bar">
			<view class="top-bar-left" @click="navigateBack">
				<image src="../../static/user/back.png" class="back-img"></image>
			</view>
            <view class="top-bar-center title">
                <view class="title">
                    详情
                </view>
            </view>
            <view class="top-bar-right pice">
                <view class="pice"></view>
            </view>
		</view>
        <view class="main">
            <view class="column heads">
                <view class="row head">
                    <view class="title">头像</view>
                    <view class="user-header">
                        <image :src="imgUrl" class="user-img"></image>
                    </view>
                    <view class="more">
                        <image src="../../static/user/arrow-right.png" mode="aspectFit"></image>
                    </view>
                </view>
                <view class="row">
                    <view class="title">签名</view>
                    <view class="cont">222222222222222222222222222222222222</view>
                    <view class="more">
                        <image src="../../static/user/arrow-right.png" mode="aspectFit"></image>
                    </view>
                </view>
                <view class="row">
                    <view class="title">注册</view>
                    <view class="cont">2020-04-20</view>
                    <view class="more">
                        <image src="../../static/user/arrow-right.png" mode="aspectFit"></image>
                    </view>
                </view>
            </view>
            <view class="column">
                <view class="row">
                    <view class="title">昵称</view>
                    <view class="cont">好多课</view>
                    <view class="more">
                        <image src="../../static/user/arrow-right.png" mode="aspectFit"></image>
                    </view>
                </view>
                <view class="row">
                    <view class="title">性别</view>
                    <view class="cont">
                        <picker @change="onChangeSex" mode="selector" :range="sexList" value="0">
                            <view class="picker">{{ sexList[index] }}</view>
                        </picker>
                    </view>
                    <view class="more">
                        <image src="../../static/user/arrow-right.png" mode="aspectFit"></image>
                    </view>
                </view>
                <view class="row">
                    <view class="title">生日</view>
                    <view class="more">
                        <picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindPickerChange">
                            <view class="uni-input">{{ date }}</view>
                        </picker>
                    </view>
                </view>
                <view class="row">
                    <view class="title">电话</view>
                    <view class="cont">1333823213</view>
                    <view class="more">
                        <image src="../../static/user/arrow-right.png" mode="aspectFit"></image>
                    </view>
                </view>
                <view class="row">
                    <view class="title">邮箱</view>
                    <view class="cont">2424214124@qq.com</view>
                    <view class="more">
                        <image src="../../static/user/arrow-right.png" mode="aspectFit"></image>
                    </view>
                </view>
            </view>
            <view class="column">
                <view class="row">
                    <view class="title">密码</view>
                    <view class="cont">**********</view>
                    <view class="more">
                        <image src="../../static/user/arrow-right.png" mode="aspectFit"></image>
                    </view>
                </view>
            </view>
            <view class="bt2">退出登录</view>
        </view>
    </view>
</template>
<script>
    export default {
        data() {
            const currentDate = this.getDate({
                format: true
            })
            return {
                imgUrl: '/static/1.webp', // 头像地址
                sexList: ['男', '女', '未知'], // 性别列表
                index: 0,
                date: currentDate
            }
        },
        computed: {
            startDate() {
                return this.getDate('start')
            },
            endDate() {
                return this.getDate('end')
            }
        },
        methods: {
			navigateBack() {
				uni.navigateBack({
					delta: 1
				});
			},
            onChangeSex(e) {
                this.sexIndex = e.detail.value; // 更新性别索引
            },
            bindPickerChange(e) {
                this.index = e.target.value
            },
            getDate(type) {
                const date = new Date()
                let year = date.getFullYear()
                let month = date.getMonth() + 1
                let day = date.getDate()
                if (month < 10) {
                    month = '0' + month
                }
                if (day < 10) {
                    day = '0' + day
                }
                if (type === 'start') {
                    return `${year - 100}-${month}-${day}`
                } else if (type === 'end') {
                    return `${year - 18}-${month}-${day}`
                } else {
                    return `${year}-${month}-${day}`
                }
            }
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
        .column {
            display: flex;
            flex-direction: column;
            padding-top: 12rpx;
            width: 100%;
            border-bottom: 1px solid $uni-border-color;
            .row {
                display: flex;
                flex-direction: row;
            }
            .title {
                flex: none;
                padding: 0 $uni-spacing-col-base;
                font-size: $uni-font-size-lg;
                color: $uni-text-color;
                line-height: 112rpx;
            }
            .user-header {
                flex: auto;
            }
            .head {
                height: 148rpx;
                display: flex;
                align-items: center;
            }
            .user-img {
                width: 46rpx;
                height: 46rpx;
                border-radius: $uni-border-radius-base;
            }
            .cont {
                flex: auto;
                align-items: center;
                font-size: $uni-font-size-lg;
                color: $uni-text-color-grey;
                line-height: 112rpx;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .more {
                flex: none;
                height: 112rpx;
                display: flex;
                align-items: center;
                image {
                    width: 80rpx;
                    height: 28rpx
                }
            }
        }
        .bt2 {
            margin-top: 160rpx;
            text-align: center;
            font-size: $uni-font-size-lg;
            color: $uni-color-warning;
            line-height: 88rpx;
        }
    }
</style>