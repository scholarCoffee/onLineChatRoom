<template>
	<view>
        <view class="top-bar">
            <view class="search-div">
				<image src="../../static/user/search.png" class="search-img"></image>
                <input type="text" placeholder="搜索用户/群" class="search" placeholder-style="color:#999;font-weight:400;" @input="onInputUser">
            </view>            
			<view class="top-bar-right">
                <view class="text" @tap="back">取消</view>
			</view>
		</view>
        <view class="main">
            <view class="search-user result">
                <view class="title" v-if="qryUserInfo.length > 0">用户</view>
                <view class="list user" v-for="(item, index) in qryUserInfo" :key="index">
                    <navigator url="../home/index?id=aaa">
                        <image :src="item.imgUrl"></image>
                    </navigator>
                    <view class="names">
                        <view class="name" v-html="item.name"></view>
                        <view class="email" v-html="item.email"></view>
                    </view>
                    <view class="right-bt send" v-if="item.tip === 1">发消息</view>
                    <view class="right-bt add" v-if="item.tip === 0">加好友</view>
                </view>
            </view>
        </view>
	</view>
</template>

<script>
    import { getFriendsList, isFriendShip } from '../../commons/js/datas.js'
	export default {
		data() {
			return {
                qryUserInfo: [], // 搜索用户
			}
		},
		methods: {
            onInputUser(e) {
                this.qryUserInfo = []
                const { value } = e.target || {}
                if (value.length > 0) {
                    this.searchUser(value)
                }
                
            },
            searchUser(e) {
                const arr = getFriendsList()
                const exp = eval("/" + e + "/g")
                for(let i = 0; i < arr.length ; i++) {
                    if (arr[i].name.search(e) != -1 || arr[i].email.search(e) != -1) {
                        this.isFriend(arr[i])
                        arr[i].imgUrl = '../../static' + arr[i].imgUrl
                        arr[i].name = arr[i].name.replace(exp, "<span style='color: #4A4AFF;'>" + e + "</span>")
                        arr[i].email = arr[i].email.replace(exp, "<span style='color: #4A4AFF;'>" + e + "</span>")
                        this.qryUserInfo.push(arr[i])
                    }
                }
            },
            // 判断是否是好友
            isFriend(e) {
                let tip = 0
                const arr = isFriendShip()
                for (let i = 0 ;i < arr.length ; i++) {
                    if (arr[i].friend == e.id) {
                        tip = 1
                        break
                    }
                }
                e.tip = tip
            },
            back() {
                uni.navigateBack({
                    delta: 1
                });
            }
		}
	}
</script>

<style lang="scss">
    @import "../../commons/css/mycss.scss"; // 引入公共样式
	.top-bar {
        .search-div {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            z-index: -1;
            box-sizing: border-box;
            padding: 14rpx 118rpx 14rpx $uni-spacing-col-base;
        }
        .search {
            padding: 0 60rpx 0 12rpx;
            height: 60rpx;
            border-radius: 10rpx;
            background: $uni-bg-color-grey;
        }
        .search-img {
            position: absolute;
            right: 128rpx;
            top: 26rpx;
            width: 40rpx;
            height: 40rpx;
        }
	}
    .main {
        padding: 88rpx $uni-spacing-col-base;
        .result {
            padding-top: $uni-spacing-col-base;
            .title {
                font-size: 44rpx;
                font-weight: 600;
                color: $uni-text-color;
                line-height: 60rpx;
            }
        }
        .list{
            width: 100%;
            height: 100rpx;
            padding: 20rpx 0;
            image {
                float: left;
                width: 80rpx;
                height: 80rpx;
                border-radius: $uni-border-radius-base;
            }
        }
        .names {
            float: left;
            padding-left: $uni-spacing-col-base;
        }
        .name {
            font-size: 36rpx;
            font-weight: 500;
            color: $uni-text-color;
            line-height: 50rpx;
        }
        .email {
            font-size: $uni-font-size-sm;
            line-height: 28rpx;
            color: $uni-text-color;
        }
        .right-bt {
            float: right;
            width: 120rpx;
            height: 48rpx;
            border-radius: 24rpx;
            font-size: $uni-font-size-sm;
            font-family: PingFangSC-Medium;
            line-height: 48rpx;
            margin-top: 16rpx; 
            text-align: center;
        }
        .send {
            color: $uni-text-color;
            background: $uni-color-primary;
        }
        .add {
            color: $uni-color-success;
            background: rgba(74, 170, 255, 0.1);
        }
    }
</style>
