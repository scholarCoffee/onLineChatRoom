<template>
    <view class="content">
        <view class="top-bar fixed-top">
            <view class="top-bar-left" @tap="backOne">
                <image src="/static/user/back.png" class="back-img"></image>
            </view>
            <view class="top-bar-center">
                <view class="title">{{ title }}</view>
            </view>
            <view class="top-bar-right">
                <view class="pice"></view>
                <view class="group-img">
                    <image src="/static/6.webp"></image>
                </view>
            </view>
        </view>
        <scroll-view class="chat" scroll-y="true" scroll-with-animation="true" :scroll-into-view="scrollToView" >
            <view class="chat-main" :style="{ 'padding-bottom': inputh + 'px'}">
                <view class="chat-ls" v-for="(item, index) in msg" :key="index" :id="'msg' + item.tip">     
                    <view class="chat-time" v-if="item.time != ''">{{ dateTime(item.time) }}</view>
                    <view class="msg-m msg-left" v-if="item.id !== 1">
                        <image :src="item.imgUrl" class="user-img"></image>
                        <view class="message" v-if="item.types === 0">
                            <view class="msg-text">{{ item.message }}</view>
                        </view>
                        <view class="message" v-if="item.types === 1">
                            <image :src="item.message" class="msg-img" @tap="previewImg(item.message)" mode="widthFix"></image>
                        </view>
                    </view>
                    <view class="msg-m msg-right" v-else>
                        <image :src="item.imgUrl" class="user-img"></image>
                        <view class="message" v-if="item.types === 0">
                            <view class="msg-text">{{ item.message }}</view>
                        </view>
                        <view class="message" v-if="item.types === 1">
                            <image :src="item.message" class="msg-img" @tap="previewImg(item.message)" mode="widthFix"></image>
                        </view>
                    </view>
                </view>
            </view>
            <view class="padbt"></view>
        </scroll-view>
        <view class="submit-container">
            <submit @currentHeight="currentHeight" @sendMsg="sendMessage"></submit>
        </view>
    </view>
</template>
<script>
import { getMessage } from '../../commons/js/datas.js'
import { dateTime, spaceTime } from './../../commons/js/utils.js'; // 导入 dateTime 函数
import Submit from './../../componets/submit'
export default {
    data() {
        return {
            title: 'Hello',
            msg: [],
            imgMsg: [],
            scrollToView: '',
            oldTime: new Date(),
            inputh: '60'
        }
    },
    components: {
        Submit
    },
    onLoad() {
        this.getMsg();
    },
    methods: {
        dateTime,
        backOne() {
            uni.navigateBack({
                delta: 1
            });
        },
        getMsg() {
            // 获取消息列表
            this.msg = getMessage();
            // 遍历消息列表，添加时间戳
            this.msg.forEach((item, index) => {
                item.imgUrl = '/../static/' + item.imgUrl;
                if (index < this.msg.length - 1) {
                    let t = spaceTime(this.oldTime, item.time);
                    if (t) {
                        this.oldTime = t
                    }
                    item.time = t;
                    if(item.types === 1) {
                        item.message = '/../static/' + item.message;
                        this.imgMsg.unshift(item.message)
                    }
                } else {
                    item.time = '';
                }
                
            });
            // 反转消息列表
            this.msg.reverse();

            // 滚动到最底部
            this.scrollToBottom();
        },
        // 预览图片
        previewImg(e) {
            let index = 0
            for(let i = 0; i < this.imgMsg.length; i++) {
                if(this.imgMsg[i] === e) {
                    index = i
                }
            }
            uni.previewImage({
                current: index,
                urls: this.imgMsg,
                longPressAction: {
                    itemList: ['保存图片', '发送给朋友', '收藏'],
                    success: function (res) {
                        console.log(res.tapIndex)
                    },
                    fail: function (res) {
                        console.log(res.errMsg)
                    }
                }
            });
        },
        sendMessage(message) {
            let len = this.msg.length 
            const data = {
                id: 1, // 假设 1 表示当前用户
                message: message,
                types: 0, // 假设 0 表示文本消息
                time: new Date().toISOString(),
                imgUrl: '/static/6.webp', // 假设当前用户头像
                tip: len + 1
            }
            // 添加新消息到消息列表
            this.msg.push(data);
            this.$nextTick(() => {
                this.scrollToView = 'msg' + (len + 1);
            }); 
        },
        currentHeight(value) {
            this.inputh = value
            this.scrollToBottom()
        },
        scrollToBottom() {
            setTimeout(() => {
                this.scrollToView = ''
                this.$nextTick(() => {
                    const lastItem = this.msg[this.msg.length - 1];
                    if (lastItem) {
                        this.scrollToView = 'msg' + lastItem.tip;
                    }
                });     
            }, 100);
        }
    }
}
</script>
<style lang="scss">
@import "../../commons/css/mycss.scss"; // 引入公共样式
page {
    height: 100%;
}
.content {
    height: 100%;
    background: rgba(244, 244, 244 ,1)
}
.top-bar {
    background: rgba(244, 244, 244 ,1);
    border-bottom: 1px solid $uni-border-color;
    .group-img {
        position: absolute;
        bottom: 10rpx;
        right: $uni-spacing-col-base;
        width: 78rpx;
        height: 78rpx;
        image {
            border-radius: 16rpx
        }
    }
}
.chat {
    height: 100%; // 减去头部高度
    .padbt {
        height: var(--status-bar-height);
        width: 100%;
    }
    .chat-main {
        padding-left: $uni-spacing-col-base;
        padding-right: $uni-spacing-col-base;
        padding-top: 100rpx;
        display: flex;
        flex-direction: column;        
    }
    .chat-ls {
        .chat-time {
            font-size: $uni-font-size-sm;
            color: rgba(39, 40, 50, 0.3);
            line-height: 34rpx;
            padding: 20rpx 0;
            text-align: center;
        }
        .msg-m {
            display: flex;
            padding: 20rpx 0;
            .user-img {
                flex: none;
                width: 58rpx;
                height: 58rpx;
                border-radius: $uni-border-radius-base;
            }
            .message {
               flex: none;
               max-width: 480rpx;
            }
            .msg-text {
                padding: 20rpx;
                border-radius: 20rpx;
                font-size: 28rpx;
                line-height: 44rpx;
                word-wrap: break-word; // 添加换行支持
                word-break: break-word; // 添加换行支持
            }
            .msg-img {
                max-width: 400rpx;
                border-radius: $uni-border-radius-base;
            }
        }
        .msg-left {
            flex-direction: row;
            .msg-text {
                margin-left: 16rpx;
                background-color: #fff;
                color: #333;
                border-radius: 20rpx;
            }
            .msg-img {
                margin-left: 16rpx;
            }
        }
        .msg-right {
            flex-direction: row-reverse;
            .msg-text {
                margin-right: 16rpx;
                background-color: rgba(255, 228, 49, 0.8);
                color: #333;
                border-radius: 20rpx;
            }
            .msg-img {
                margin-right: 16rpx;
            }
        }
    }
}
.submit-container {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    border-top: 1px solid #eaeaea;
    z-index: 10;
}
</style>    