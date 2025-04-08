<template>
    <view class="content">
		<view class="top-bar">
			<view class="top-bar-left" @click="navigateBack">
				<image src="../../static/user/back.png" class="back-img"></image>
			</view>
		</view>
        <view class="main">
            <view class="column heads">
                <view class="row" @tap="chooseImage">
                    <view class="title">头像：</view>
                    <view class="user-header" v-if="id == uid">
                        <image :src="tempFilePaths" class="user-img"></image>
                    </view>
                    <view class="more" v-if="id == uid">
                        <image src="../../static/user/arrow-right.png" mode="aspectFit"></image>
                    </view>
                    <image v-else :src="tempFilePaths" class="user-img"></image>
                </view>
                <view class="row" @tap="modify('explain', '签名', user.explain, false)" v-if="id == uid">
                    <view class="title">签名：</view>
                    <view class="cont">{{ user.explain }}</view>
                    <view class="more">
                        <image src="../../static/user/arrow-right.png" mode="aspectFit"></image>
                    </view>
                </view>
                <view class="row" v-else>
                    <view class="title">签名：</view>
                    <view class="cont">{{ user.explain }}</view>
                </view>
                <view class="row">
                    <view class="title">注册：</view>
                    <view class="cont">{{ formatDateTime2(user.register) }}</view>
                </view>
            </view>
            <view class="column">
                <view class="row" @tap="modify('markname', '昵称', user.markname, false)" v-if="id == uid">
                    <view class="title">昵称：</view>
                    <view class="cont">{{ user.markname }}</view>
                    <view class="more">
                        <image src="../../static/user/arrow-right.png" mode="aspectFit"></image>
                    </view>
                </view>
                <view class="row" v-else>
                    <view class="title">昵称：</view>
                    <view class="cont">{{ markname }}</view>
                </view>
                <view class="row">
                    <view class="title">性别：</view>
                    <view class="cont">
                        <picker @change="onChangeSex" mode="selector" :range="sexList" :value="index" v-if="id == uid">
                            <view class="picker">{{ sexList[index] }}</view>
                        </picker>
                        <view class="picker" v-else>{{ sexList[index] }}</view>
                    </view>
                    <view class="more" v-if="id == uid">
                        <image src="../../static/user/arrow-right.png" mode="aspectFit"></image>
                    </view>
                </view>
                <view class="row">
                    <view class="title">生日：</view>
                    <view class="more">
                        <picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindPickerChange" v-if="id == uid">
                            <view class="uni-input">{{ date }}</view>
                        </picker>
                        <view class="uni-input" v-else>{{ date }}</view>
                    </view>
                </view>
                <view class="row" v-if="id == uid" @tap="modify('phone', '电话', user.phone, false)">
                    <view class="title">电话：</view>
                    <view class="cont">{{ user.phone }}</view>
                    <view class="more">
                        <image src="../../static/user/arrow-right.png" mode="aspectFit"></image>
                    </view>
                </view>
                <view class="row" v-else>
                    <view class="title">电话：</view>
                    <view class="cont">{{ user.phone }}</view>
                </view>
                <view class="row" @tap="modify('email', '邮箱', user.email, true)" v-if="id == uid">
                    <view class="title">邮箱：</view>
                    <view class="cont">{{ user.email }}</view>
                    <view class="more">
                        <image src="../../static/user/arrow-right.png" mode="aspectFit"></image>
                    </view>
                </view>
                <view class="row" v-else>
                    <view class="title">邮箱：</view>
                    <view class="cont">{{ user.email }}</view>
                </view>
            </view>
            <view class="column" @tap="modify('pwd', '密码', '', true)" v-if="id == uid">
                <view class="row">
                    <view class="title">密码：</view>
                    <view class="cont">**********</view>
                    <view class="more">
                        <image src="../../static/user/arrow-right.png" mode="aspectFit"></image>
                    </view>
                </view>
            </view>
            <view class="bt2" @tap="quit" v-if="id == uid">退出登录</view>
            <view class="bt2" @tap="delFriend" v-else>删除好友</view>
        </view>
        <view class="modify" :style="{ bottom:-widHeight + 'px', 'display': isModify ? 'block' : 'none'  }" :animation="animation">
            <view class="modify-header">
                <view class="close" @tap="modify">取消</view>
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
    import { dateTime, formatDate, formatDateTime2 } from './../../commons/js/utils.js'; // 导入 dateTime 函数
    export default {
        data() {
            const currentDate = this.getDate({
                format: true
            })
            return {
                uid: '', // 用户ID
                token: '', // 用户token
                myname: '', // 用户名
                user: '',
                markname: '', // 昵称
                sexList: ['男', '女', '未知'], // 性别列表
                index: 0,
                date: currentDate,
                tempFilePaths: '/static/1.png',
                pwd: '', // 密码
                oldData: '',
                modifyTitle: '',
                data: '修改的内容', // 签名内容
                ispwd: false, 
                pwd: undefined, // 密码
                type: '', // 修改类型
                animation: {}, // 动画对象
                isModify: false, // 是否显示修改弹窗
                widHeight: 1000, // 组件高度
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
        onLoad(e) {
            const { id } = e || {}
            this.id = id
            this.getStorages(); // 获取本地存储的用户信息
            this.getUser(); // 获取用户信息
            this.getMarkName(); // 获取好友昵称
        },
        methods: {
            formatDateTime2,
            getStorages() {
                // 获取本地存储的用户信息
                const userInfo = uni.getStorageSync('userInfo');
                if (userInfo) {
                    const { userId, token, userName } = userInfo;
                    this.uid = userId; // 用户ID
                    this.token = token; // 用户token
                    this.myname = userName
                } else {
                    uni.navigateTo({
                        url: '/pages/signIn/index'
                    });
                } 
            },
            // 获取好友昵称
            getMarkName() {
                // 获取好友昵称
                if(this.id != this.uid) {
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
                                    this.marname = markname
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
							let { sex, name, imgurl, explain, birth, phone } = data || {}
                            this.tempFilePaths = this.serverUrl + imgurl; // 头像URL
                            if (!explain) {
                                explain = '这个人很懒，什么都没有留下~'
                            }
                            if (!birth) {
                                this.date = '0000-00-00'
                            } else {
                                this.date = formatDate(birth)
                            }

                            if (!phone) {
                                phone = '000'
                            }

                            // 处理markname
                            if (this.markname.length === 0) {
                                this.markname = name
                            }
                            this.sexJudge(sex)
                            this.user = {
                                ...data,
                                explain,
                                phone
                            }
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
                    this.index = 1
                } else if (e == 'female') {
                    this.index = 0
                } else {
                    this.index = 2
                }
            },
            quit() {
                // 清楚缓存
                uni.removeStorageSync('userInfo')
                uni.navigateTo({
                    url: '/pages/signIn/index?oldName=' + this.myname
                });
            },
            delFriend() {
                uni.showModal({
                    title: '提示',
                    content: '是否删除好友？',
                    success: (res) => {
                        if (res.confirm) {
                            uni.request({
                                url: this.serverUrl + '/friend/deletefriend', // 替换为你的登录接口地址,
                                method: 'POST',
                                data: {
                                    uid: this.uid,
                                    fid: this.id,
                                    token: this.token
                                },
                                success: (res) => {
                                    const { code } = res.data
                                    if (code === 200) {
                                        uni.navigateBack({
                                           url: 'pages/index/index'
                                        });
                                    } else {
                                        uni.showToast({
                                            title: '删除失败',
                                            icon: 'none',
                                            duration: 2000
                                        });
                                    }
                                },
                                fail: (err) => {
                                    uni.showToast({
                                        title: '删除失败',
                                        icon: 'none',
                                        duration: 2000
                                    });
                                }
                            })
                        }
                    }
                })
            },
			navigateBack() {
				uni.navigateBack({
					delta: 1
				});
			},
            onChangeSex(e) {
                const { value } = e.target || {}
                if ( value !== this.index) {
                    this.index = value
                    let sex = 'asexual'
                    if (this.index === 0) {
                        sex = 'male'
                    } else if (this.index ===1 ) {
                        sex = 'female'
                    }
                    this.update(sex, 'sex', undefined )
                }
            },
            bindPickerChange(e) {
                const { value } = e.target || {}
                if (value !== this.date) {
                    this.update(this.date, 'birth', undefined )
                }
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
                                uni.setStorageSync('userInfo', {
                                    'id': this.uid,
                                    'name': this.myname,
                                    'imgurl': backImg,
                                    'token': this.token
                                })
                                this.update(backImg, 'imgurl', undefined)
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
            update(value, type, pwd) {
                uni.request({
                    url: this.serverUrl + '/user/update', // 替换为你的登录接口地址,
                    method: 'POST',
                    data: {
                        uid: this.uid,
                        data: value,
                        type: type,
                        pwd: pwd,
                        token: this.token
                    },
                    success: (res) => {
                        const { code, data } = res.data
                        if (code === 200) { 
                            this.user[type] = data[type]
                            if (type === 'pwd') {
                                // 用户需重新登录
                                // 清楚缓存
                                uni.removeStorageSync('userInfo')
                                uni.navigateTo({
                                    url: '/pages/signIn/index?oldName=' + this.myname
                                });
                            }
                        } else if (code === 400) {
                            uni.showToast({
                                title: '密码错误',
                                icon: 'none',
                                duration: 2000
                            });
                        } else if (code === 201) {
                            uni.showToast({
                                title: '已被占用',
                                icon: 'none',
                                duration: 2000
                            });
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
            getElementStyle() {
                const query = uni.createSelectorQuery().in(this)
                query.select('.modify').boundingClientRect((rect) => {
                    this.widHeight = rect.height
                }).exec()
            },
            modify(type, title, data, ispwd) {
                if (ispwd) {
                    this.ispwd ='block'
                    this.pwd = ''
                } else {
                    this.ispwd = 'none'
                    this.pwd = undefined
                }
                this.type = type
                this.modifyTitle = title
                this.oldData = data
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
                if (this.data.length > 0 && this.data != this.oldData) {
                    if (this.type == 'markname') {
                        this.updateFriendName()
                        this.markname = this.data
                    } else if (this.type == 'email') {
                        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 邮箱正则表达式
                        if (this.email.length > 0 && emailPattern.test(this.email)) {
                            this.update(this.data, this.type, this.pwd)
                        } else {
                            uni.showToast({
                                title: '邮箱格式不正确',
                                icon: 'none',
                                duration: 2000
                            });
                        }	
                    } else if (this.type == 'pwd') {
                        this.update(this.data, this.type, this.pwd)
                    } else {
                        this.update(this.data, this.type, this.pwd)
                    }
                }
                this.modify()
            },
            // 好友昵称修改
            updateFriendName() {
                if (this.data.length > 0 && this.data != this.oldData) {
                    uni.request({
                        url: this.serverUrl + '/user/updatemarkname', // 替换为你的登录接口地址,
                        method: 'POST',
                        data: {
                            uid: this.uid,
                            fid: this.id,
                            name: this.data,
                            token: this.token
                        },
                        success: (res) => {
                            const { data, code } = res.data
                            if (code === 200) {

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
        padding-top: 240rpx;
        display: flex;
        flex-direction: column;
        .column {
            display: flex;
            flex-direction: column;
            padding-top: 12rpx;
            width: 100%;
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
        z-index: 1001;
        left: 0;
        width: 100%;
        height: 100%;
        background: #fff;
        .modify-header {
            width: 100%;
            height: 160rpx; // 调整高度以适配不同屏幕
            padding-top: var(--status-bar-height);
            display: flex;
            flex-direction: row;
            align-items: center;
            border-bottom: 1px solid $uni-border-color;
            .close {
                padding-left: $uni-spacing-col-base;
                padding-right: 20rpx;
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