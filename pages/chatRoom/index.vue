<template>
    <view class="content">
        <view class="top-bar fixed-top">
            <view class="top-bar-left" @tap="backOne">
                <image src="/static/user/back.png" class="back-img"></image>
            </view>
            <view class="top-bar-right">
                <view class="pice"></view>
                <view class="group-img">
                    <image src="/static/fire.png"></image>
                </view>
            </view>
        </view>
        <scroll-view class="chat" scroll-y="true" :scroll-with-animation="scrollAnimation" :scroll-into-view="scrollToView" @scrolltoupper="nextPage">
            <view class="chat-main" :style="{ 'padding-bottom': inputh + 'px'}">
                <view class="loading" :class="{ 'displayNone': isLoading }">
                    <image src="../../static/loading.png" class="loading-img" :animation="animationData"></image>
                </view>
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
                        <view class="message" v-if="item.types === 2">
                            <view class="msg-text voice" :style="{
                                'width': item.message.time*4 + 'px'
                            }" @tap="playVoice(item.message.voice)"> 
                                <image src="../../static/yy.png" class="voice-img"></image>
                                {{ item.message.time }}"
                            </view>    
                        </view>
                        <!-- <view class="message" v-if="item.types === 3" @tap="openLocation(item.message)">
                            <view class="msg-map">
                                <view class="map-name">{{ item.message.name }}</view>
                                <view class="map-address">{{ item.message.address }}</view>   
                                <image src="../../static/6.png" class="msg-img" mode="aspectFit"></image>                 -->
                                <!-- <map class="map" :longitude="item.message.longitude" :latitude="item.message.latitude" :markers="cover(item.message)"></map>     -->
                            <!-- </view> -->
                        <!-- </view> -->
                    </view>
                    <view class="msg-m msg-right" v-else>
                        <image :src="item.imgUrl" class="user-img"></image>
                        <view class="message" v-if="item.types === 0">
                            <view class="msg-text">{{ item.message }}</view>
                        </view>
                        <view class="message" v-if="item.types === 1">
                            <image :src="item.message" class="msg-img" @tap="previewImg(item.message)" mode="widthFix"></image>
                        </view>
                        <view class="message" v-if="item.types === 2">
                            <view class="msg-text voice" :style="{
                                'width': item.message.time*4 + 'px'
                            }" @tap="playVoice(item.message.voice)">
                                {{ item.message.time }}"
                                <image src="../../static/yy.png" class="voice-img"></image>
                            </view>    
                        </view> 
                        <!-- <view class="message" v-if="item.types === 3">
                            <view class="msg-map" @tap="openLocation(item.message)">
                                <view class="map-name">{{ item.message.name }}</view>
                                <view class="map-address">{{ item.message.address }}</view>                    
                                <image src="../../static/6.png" class="msg-img" mode="aspectFit"></image> -->
                                <!-- <map class="map" :longitude="item.message.longitude" :latitude="item.message.latitude" :markers="cover(item.message)"></map>     -->
                            <!-- </view> -->
                        <!-- </view> -->
                    </view>
                </view>
            </view>
            <!-- <view class="padbt"></view> -->
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
const innerAudioContext = uni.createInnerAudioContext()
export default {
    data() {
        return {
            uid: '',
            uimgurl: '',
            token: '',
            uname: '',
            msg: [],
            imgMsg: [],
            scrollToView: '',
            oldTime: new Date(),
            inputh: '96',
            animationData: '',
            nowpage: 0,
            loading: '',
            isLoading: true,
            scrollAnimation: true,
            beginLoading: true,
            imageMap: {
                '1.png': '/static/1.png',
                '2.png': '/static/2.png',
                'fire.png': '/static/fire.png',
                'fire-kt.png': '/static/fire-kt.png',
                'fire-lb.png': '/static/fire-lb.png',
                '5.png': '/static/5.png',
                '4.png': '/static/4.png',
            }
        }
    },
    components: {
        Submit
    },
    onLoad() {
        this.getMsg(this.nowpage)
        // this.nextPage()
    },
    methods: {
        dateTime,
        getStorages() {
            // 获取本地存储的用户信息
            const userInfo = uni.getStorageSync('userInfo');
            if (userInfo) {
                const { userId, userName, imgUrl, token } = userInfo;
                this.uid = userId; // 用户ID
                this.uname = userName; // 用户名
                this.uimgurl = this.serverUrl + imgUrl; // 头像URL
                this.token = token; // 用户token
            } else {
                uni.navigateTo({
                    url: '/pages/signIn/index'
                });
            } 
        },
        backOne() {
            uni.navigateBack({
                delta: 1
            });
        },
        nextPage() {
            if (this.nowpage > 0  && this.beginLoading) {
                this.isLoading = false
                var animation = uni.createAniamtion({
                    duration: 1000,
                    timingFunction: 'step-start'
                })
                this.beginLoading = false
                this.animation = animation
                animation.scale(2,2).rotate(45).step()
                this.animationData = animation.export()
                let i = 1;
                this.loading = setInterval(function(){
                    animation.translate(i*30).step()
                    this.animationData = animation.export()
                    i++
                    if(i > 20) {
                        this.getMsg(this.nowpage)
                    }
                    
                }.bind(this), 100)
            }

        },
        getMsg(page) {
            // 获取消息列表
            this.msg = getMessage();
            let maxpages = this.msg.length;
            if (this.msg.length > page*10 + 10) {
                maxpages = page*10 + 10
                this.nowpage++ 
            } else {
                this.nowpage = -1
            }
            for (var i = page*10; i < maxpages; i++) {
                this.msg[i].imgUrl = this.imageMap[this.msg[i].imgUrl];
                if (i < this.msg.length - 1) {
                    let t = spaceTime(this.oldTime, this.msg[i].time);
                    if (t) {
                        this.oldTime = t
                    }
                    this.msg[i].time = t;
                    if(this.msg[i].types === 1) {
                        this.msg[i].message =  this.imageMap[this.msg[i].message];
                        this.imgMsg.unshift(this.msg[i].message)
                    }
                } else {
                    this.msg[i].time = '';
                }
            }
            // 反转消息列表
            this.msg.reverse();
            // 滚动到最底部
            setTimeout(() => {
                this.scrollToView = ''
                this.scrollAnimation = false
                this.$nextTick(() => {
                    const lastItem = this.msg[maxpages- page*10 - 1];
                    if (lastItem) {
                        this.scrollToView = 'msg' + lastItem.tip;
                    }
                });     
            }, 100);
            clearInterval(this.loading)
            this.isLoading = true
            this.beginLoading = true
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
        playVoice(e) {
            innerAudioContext.src = e
            innerAudioContext.play();
        },
        cover(e) {
            const { longitude, latitude, name, address } = e || {}
            let map = [{
                latitude: latitude,
                longitude: longitude,
                iconPath: '/static/6.png',
            }] 
            return map
        },
        openLocation(e) {
            const { longitude, latitude, name, address } = e || {}
            uni.openLocation({
                latitude: latitude,
                longitude: longitude,
                name: name,
                address: address,
                success: function (res) {
                    console.log(res)
                },
                fail: function (res) {
                    console.log(res.errMsg)
                }
            });
        },
        sendMessage(e) {
            const { message, types } = e || {}
            this.scrollAnimation = true
            let len = this.msg.length
            let nowTime = new Date();
            let t = spaceTime(this.oldTime, nowTime);
            if (t) {
                this.oldTime = t
            }
            nowTime = t;
            const data = {
                id: 1, // 假设 1 表示当前用户
                message: message,
                types: types, // 假设 0 表示文本消息
                time: nowTime,
                imgUrl: '/static/6.png', // 假设当前用户头像
                tip: len + 1
            }
            // 添加新消息到消息列表
            this.msg.push(data);
            this.$nextTick(() => {
                this.scrollToView = 'msg' + (len + 1);
            }); 
            if (types === 1) {
                this.imgMsg.push(data.message)
            }
        },
        currentHeight(value) {
            this.inputh = value
            this.scrollToBottom()
        },
        scrollToBottom() {
            this.scrollAnimation = true
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
.displayNone {
    display: none;
}
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
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .group-img {
        // position: absolute;
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
    .loading {
        text-align: center;
        .loading-img {
            width: 60rpx;
            height: 60rpx;
        }
    }
    .chat-main {
        padding-left: $uni-spacing-col-base;
        padding-right: $uni-spacing-col-base;
        padding-top: 220rpx;
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
            .msg-map {
                background: #fff;
                width: 464rpx;
                height: 284rpx;
                overflow: hidden;
                .map-name {
                    font-size: $uni-font-size-lg;
                    color: $uni-text-color;
                    line-height: 44rpx;
                    padding: 18rpx 24rpx 0 24rpx;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                }
                .map-address {
                    font-size: $uni-font-size-sm;
                    color: $uni-text-color-disable;
                    padding: 0rpx 24rpx;;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                }
                .map-img {
                    padding-top: 8rpx;
                    width: 480rpx;
                    height: 190rpx;
                }
            }
            .voice {
                min-width: 100rpx;
                max-width: 400rp;
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
            .msg-map {
                margin-left: 16rpx;
                border-radius: 0px 20rpx 20rpx 20rpx;
            }
            .voice {
                text-align: right;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .voice-img {
                float: left;
                transform: rotate(180deg);
                padding-bottom: 4rpx;
                width: 36rpx;
                height: 36rpx;
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
            .msg-map {
                margin-right: 16rpx;
                border-radius: 0px 20rpx 20rpx 20rpx;
            }
            .voice {
                text-align: left;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .voice-img {
                float: right;
                padding-bottom: 0rpx;
                width: 36rpx;
                height: 36rpx;
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