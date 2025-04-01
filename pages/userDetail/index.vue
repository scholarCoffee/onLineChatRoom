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
                        <image :src="tempFilePaths" class="user-img" @tap="chooseImage"></image>
                    </view>
                    <view class="more">
                        <image src="../../static/user/arrow-right.png" mode="aspectFit"></image>
                    </view>
                </view>
                <view class="row" @tap="modify('签名', dataArr.sign, false)">
                    <view class="title">签名</view>
                    <view class="cont">{{ dataArr.sign }}</view>
                    <view class="more">
                        <image src="../../static/user/arrow-right.png" mode="aspectFit"></image>
                    </view>
                </view>
                <view class="row">
                    <view class="title">注册</view>
                    <view class="cont">{{ changeTime(dataArr.time) }}</view>
                    <view class="more">
                        <image src="../../static/user/arrow-right.png" mode="aspectFit"></image>
                    </view>
                </view>
            </view>
            <view class="column">
                <view class="row" @tap="modify('昵称', dataArr.name, false)">
                    <view class="title">昵称</view>
                    <view class="cont">{{ dataArr.name }}</view>
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
                    <view class="cont">{{ dataArr.tell }}</view>
                    <view class="more">
                        <image src="../../static/user/arrow-right.png" mode="aspectFit"></image>
                    </view>
                </view>
                <view class="row"  @tap="modify('邮箱', dataArr.mail, false)">
                    <view class="title">邮箱</view>
                    <view class="cont">{{ dataArr.mail }}</view>
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
        <view class="modify" :style="{ bottom:-widHeight + 'px' }" :animation="animation">
            <view class="modify-header">
                <view class="close" @tap="modify">取消</view>
                <view class="title">签名</view>
                <view class="define" @tap="modifySubmit">确定</view>
            </view>
            <view class="modify-main">
                <input type="text" v-model="pwd" class="modify-pwd" placeholder="请输入原密码" placeholder-style="color:#aaa; font-weight: 400;" :style="{
                    'display': ispwd
                }"/>
                <textarea v-model="data" class="modify-content" ></textarea>
            </view>
        </view>
    </view>
</template>
<script>
    import { dateTime } from './../../commons/js/utils.js'; // 导入 dateTime 函数
    export default {
        data() {
            const currentDate = this.getDate({
                format: true
            })
            return {
                dataArr: {
                    name: 'xxx',
                    sign: 'zxxx',
                    time: new Date(),   
                    sex: '男',
                    birth: '1998-4-12',
                    tell: '12312312312',
                    mail: '2312321@qq.com'
                },// 模拟数据
                sexList: ['男', '女', '未知'], // 性别列表
                index: 0,
                date: currentDate,
                tempFilePaths: '/static/1.webp',
                headImg: '',
                pwd: '', // 密码
                modifyTitle: '',
                data: '修改的内容', // 签名内容
                ispwd: false, 
                animation: {}, // 动画对象
                isModify: false, // 是否显示修改弹窗
                widHeight: 0, // 组件高度
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
        onReady() {
            this.getElementStyle()
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
            changeTime(date) {
                return dateTime(date)
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
            },
            chooseImage() {
                uni.chooseImage({
                    count: 1,
                    sizeType: ['original', 'compressed'],
                    sourceType: ['album', 'camera'],
                    success: (res) => {
                         this.tempFilePaths = res.tempFilePaths.shift()
                    }
                })
            },
            getElementStyle() {
                const query = uni.createSelectorQuery().in(this)
                query.select('.modify').boundingClientRect((rect) => {
                    this.widHeight = rect.height
                }).exec()
            },
            modify(type, data, ispwd) {
                if (ispwd) {
                    this.ispwd ='block'
                } else {
                    this.ispwd = 'none'
                }
                this.modifyTitle = type
                this.data = data
                this.isModify = !this.isModify
                const animation = uni.createAnimation({
                    duration: 300,
                    timingFunction: 'ease',
                })
                if (this.isModify) {
                    animation.bottom(0).step()
                } else {
                    animation.bottom(-this.widHeight).step()
                }
                this.animation = animation.export()
            },
            modifySubmit() {
                this.modify()
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
        padding-top: 86rpx;
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
            margin: 36rpx 0;
            text-align: center;
            font-size: $uni-font-size-lg;
            color: $uni-color-warning;
            line-height: 88rpx;
        }
    }
    .modify {
        position:fixed; 
        z-index: 1002;
        left: 0;
        width: 100%;
        height: 100%;
        background: #fff;
        .modify-header {
            width: 100%;
            height: 88rpx;
            padding-top: var(--status-bar-height);
            display: flex;
            flex-direction: row;
            align-items: center;
            border-bottom: 1px solid $uni-border-color;
            .close {
                padding-left: $uni-spacing-col-base;
                font-size: $uni-font-size-lg;
                color: $uni-text-color;
                line-height: 88rpx;
            }
            .title {
                flex: auto;
                text-align: center;
                font-size: $uni-font-size-lg;
                color: $uni-text-color;
                line-height: 88rpx;
            }
            .define {
                padding-right: $uni-spacing-col-base;
                font-size: $uni-font-size-lg;
                color: $uni-color-success;
                line-height: 88rpx;
            }
        }
        .modify-main {
            display: flex;
            padding: $uni-spacing-col-base;
            flex-direction: column;
            .modify-pwd {
                margin-bottom: $uni-spacing-col-base;
                padding: 12rpx 20rpx;
                box-sizing: border-box;
                flex: auto;
                width: 100%;
                height: 88rpx;
                background-color: $uni-bg-color-grey;
                border-radius: $uni-border-radius-base;
                font-size: $uni-font-size-lg;
                color: $uni-text-color;
                line-height: 88rpx;
            }
            .modify-content {
                padding: 16rpx 20rpx;
                flex: auto;
                width: 100%;
                box-sizing: border-box;
                height: 386rpx;
                background: $uni-bg-color-grey;
                border-radius: $uni-border-radius-base;
                font-size: $uni-font-size-lg;
                color: $uni-text-color;
                line-height: 44rpx;
            }
        }
    }
</style>