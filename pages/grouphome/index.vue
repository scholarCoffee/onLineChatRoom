<template>
    <view>
        <view class="top-bar">
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
                </view>
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
                groupmember: []
            }
        },
        onLoad(e) {
            const { gid, gimg } = e || {}
            this.gid = gid || ''
            this.gimg = gimg || ''
            this.getMemberList()
        },
        method: {
            navigateBack() {
                uni.navigateTo({
                    url: '../index/index'
                })
            },
            getMemberList() {
                let members = getFriendsList(this.gid)
                for (let i = 0; i < members.length; i++) {
                    members[i].imgurl = '../../static/' + members[i].imgurl
                    this.groupmember.push(member)
                }
            }
        }
    }
</script>
<style lang="scss">
    @import "../../commons/css/mycss.scss"; // 引入公共样式
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
        }
    }
</style>