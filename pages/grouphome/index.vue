<template>
    <view>
        <view class="top-bar">
            <view class="top-bar-left" @tap="navigateBack">
                <image src="../../static/user/back1.png" class="back-img"></image>
            </view>
            <view class="top-bar-center"></view>
            <view class="top-bar-right">
                <view class="more-img">
                    <image src="../../static/user/more1.png" class="more-img"></image>
                </view>
            </view>
        </view>
        <view class="top-bar bgbar" :animation="animationData1">
            <view class="top-bar-left" @tap="navigateBack">
                <image src="../../static/user/back.png" class="back-img"></image>
            </view>
            <view class="top-bar-center"></view>
            <view class="top-bar-right">
                <view class="more-img">
                    <image src="../../static/user/more.png" class="more-img"></image>
                </view>
            </view>
        </view>
        <view class="bg">
            <image :src="gimg" class="bg-img" mode="aspectFill"></image>
        </view>
        <view class="main">
            <view class="main-inner">
                <view class="inf">
                    <view class="name">今天很好</view>
                    <view class="time">2022/11/1</view>
                    <view class="notice">特别的爱给特别的你</view>
                </view>
                <view class="member">
                    <view class="top">
                        <view class="title">群成员</view>
                        <view class="more">管理群成员</view>
                        <image src="../../static/user/more.png" mode="aspectFill" class="more-img"></image>
                    </view>
                    <view class="member-ls">
                        <view class="member-li" v-for="(item, index) in groupmember" :key="index">
                            <view class="imgs">
                                <image src="../../static/delete.png" mode="aspectFill" class="delete-img"></image>
                                <image :src="item.imgurl" mode="aspectFill" class="user-img"></image>
                            </view>
                            <view class="name">{{ item.name }}</view>
                        </view>
                        <view class="member-li">
                            <view class="imgs">
                                <image src="../../static/add.png" mode="aspectFill" class="user-add"></image>
                            </view>
                            <view class="name">邀请</view>
                        </view>
                    </view>
                    <view class="clear"></view>
                </view>
                <view class="mitem">
                    <view class="row">
                        <view class="title">群名称</view>
                        <view class="cont">今天天气真好</view>
                        <view class="more">
                            <image src="../../static/user/more.png" mode="aspectFill" class="more-img"></image>
                        </view>
                    </view>
                    <view class="row">
                        <view class="title">群头像</view>
                        <view class="cont">
                            <image :src="gimg" class="bg-img" mode="aspectFill"></image>
                        </view>
                        <view class="more">
                            <image src="../../static/user/more.png" mode="aspectFill" class="more-img"></image>
                        </view>
                    </view>
                    <view class="row">
                        <view class="title">群公告</view>
                        <view class="cont">今天天气真好</view>
                        <view class="more">
                            <image src="../../static/user/more.png" mode="aspectFill" class="more-img"></image>
                        </view>
                    </view>
                    <view class="row">
                        <view class="title">群内名</view>
                        <view class="cont">1111</view>
                        <view class="more">
                            <image src="../../static/user/more.png" mode="aspectFill" class="more-img"></image>
                        </view>
                    </view>
                    <view class="row">
                        <view class="title">消息免打扰</view>
                        <view class="cont"></view>
                        <view class="more">
                            <switch :checked="swit" @change="switchChange" color="rgba(255, 288, 49, 1)" class="switch"/>
                        </view>
                    </view>
                </view>
                <view class="bt2">解散群</view>
            </view>
        </view>
    </view>
</template>
<script>
    import { getFriendsList } from '../../commons/js/datas'
    export default {
        data() {
            return {
                gid: '',
                gimg: '',
                swit: false,
                groupmember: [],
                top: 0,
                animationData1: {}
            }
        },
        onLoad(e) {
            const { gid, gimg } = e || {}
            this.gid = gid || ''
            this.gimg = gimg || ''
            this.getMemberList()
            
        },
        onReady() {
            this.getTop()
        },
        method: {
            navigateBack() {
                uni.navigateTo({
                    url: '../index/index'
                })
            },
            switchChange(e) {

            },
            getMemberList() {
                let members = getFriendsList(this.gid)
                for (let i = 0; i < members.length; i++) {
                    members[i].imgurl = '../../static/' + members[i].imgurl
                    this.groupmember.push(member)
                }
            },
            getTop() {
                const query = uni.createSelectorQuery().in(this)
                query.select('.main-inner').boundingClientRect((rect) => {
                    this.top = data.top
                }).exec()
            },
            // 顶部切换动画
            addAnimat() {
                var animation = uni.createAnimation({
                    duration: 300,
                    timingFunction: 'ease'
                })
                if (this.top < 60) {
                    animation.opacity(1).step()
                } else {
                    animation.opacity(0).step()
                }
            }
        },
        onPageScroll() {
            this.getTop()
            this.addAnimat()
        }
    }
</script>
<style lang="scss">
    @import "../../commons/css/mycss.scss"; // 引入公共样式
    .clear {
        clear: both;
    }
    .bgbar {
        background-color: #fff;
    }
    .bg {
        width: 100%;
        height: 100%;
        background-color: #fff;
        position: fixed;
        top: 0;
        left: 0;
        z-index: -1;
        .bg-img {
            width: 100%;
            height: 750rpx;
        }
    }
    .main {
        padding-top: 360rpx;
        .main-inner {
            width: 100%;
            min-height: 600rpx;
            background-color: #fff;
            border-radius: 40rpx 40rpx 0 0;
        }
        .inf {
            padding: $uni-spacing-row-base $uni-spacing-col-base 0;
            padding-bottom: 40rpx;
            box-sizing: border-box;
            border-bottom: 1px solid #eee;
            .name {
                float: left;
                font-size: 48rpx;
                font-weight: 600;
                color: #272832;
                line-height: 66rpx;
            }
            .time {
                float: right;
                font-size: 28rpx;
                color: rgba(39, 40, 50, 0.5);
                line-height: 66rpx;
            }
            .notice {
                padding-top: 20rpx;
                font-size: 28rpx;
                color: #272832;
                line-height: 40rpx;
                clear: both;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
        }
        .member {
            border-bottom: 1px solid #eee;
            .top {
                padding: $uni-spacing-row-base $uni-spacing-col-base 0;
                box-sizing: border-box;
                height: 100rpx;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .title {
                    flex: 1;
                    font-size: 36rpx;
                    font-weight: 600;
                    color: #272832;
                }
                .more {
                    float: right;
                    padding-right: 20rpx;
                    font-size: 32rpx;
                    font-weight: 400;
                    color: rgba(39, 40, 50, 0.6)
                }
                .more-img {
                    width: 16rpx;
                    height: 28rpx;
                }

            }
            .member-ls {
                width: 100%;
                padding: 20rpx 16rpx;
                box-sizing: border-box;
            }
            .member-li {
                padding-bottom: 32rpx;
                width: 20%;
                float: left;
                text-align: center;
                .imgs {
                    display: inline-block;
                    position: relative;
                    width: 104rpx;
                    height: 104rpx;
                    border-radius: 20rpx;
                    background-color: $uni-color-primary;
                }
                .user-img {
                    width: 104rpx;
                    height: 104rpx;
                    border-radius: 20rpx;
                }
                .delete-img {
                    position: absolute;
                    top: -16rpx;
                    right: -16rpx;
                    z-index: 10;
                    width: 40rpx;
                    height: 40rpx;
                }
                .name {
                    padding:0 8rpx;
                    font-size: 28rpx;
                    color: #272832;
                    line-height: 40rpx;
                    display: --webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden; 
                }
                .user-add {
                    width: 104rpx;
                    height: 104rpx;
                    padding: 32rpx;
                    box-sizing: border-box;
                }
            }
        }
        .mitem {
            display: flex;
            flex-direction: column;
            padding-top: 22rpx;
            width: 100%;
            border-bottom: 1px solid #eee;
            .row {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;
                border-bottom: 1px solid $uni-border-color; 
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
                height: 108rpx;
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
                height: 112rpx;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .group-img {
                width: 80rpx;
                height: 80rpx;
                border-radius: 20rpx;
                margin-top: 16rpx;
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
            .switch {
                margin-right: 22rpx;
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
</style>