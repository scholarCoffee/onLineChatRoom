<template>
    <view>
        <view class="submit">
            <view class="submit-chat">
                <view class="bt-img" @tap="onClickRecords">
                    <image :src="toc" class="icon gray"></image>
                </view>
                <textarea v-model="msg" auto-height="true" class="chat-send btn" :class="{ displayNone: isRecord}" @input="onClickInput" @focus="focus"></textarea>
                <view class="record btn" :class="{ displayNone: !isRecord }">按住说话</view>
                <view class="bt-img emoji-icon" @tap="onClickEmoji">
                    <image src="../../static/emoji.png" class="icon gray"></image>
                </view>
                <view class="bt-img add-icon">
                    <image src="../../static/add.png" class="icon gray"></image>
                </view>
            </view>
        </view>
        <view class="emoji" :class="{ displayNone: isEmoji }">
            <view class="emoji-send">
                <view class="emoji-send-det">
                    <image src="../../static/emojiDel.png"></image>
                </view>
                <view class="emoji-send-bt" @tap="emojiSend">发送</view>
            </view>
            <emoji @emotion="emotion" :height="260"></emoji>
        </view>
    </view>
</template>
<script>
    import emoji from './../emoji/index.vue'
    export default {
        name: 'Submit',
        components: {
            emoji
        },
        data() {
            return {
                isRecord: false,
                isEmoji: true,
                msg: '',
                toc: '../../static/yy.png'
            }
        },
        methods: {
            // 获取模块高度
            getElementHeight() {
                const query = uni.createSelectorQuery().in(this)
                query.select('.submit').boundingClientRect(data => {
                    const height = this.isEmoji ? data.height : data.height + 260
                    this.$emit('currentHeight', height)
                }).exec()
            },
            // 点击切换音频
            onClickRecords() {
                if(this.isRecord) {
                    this.toc = "../../static/clickSpeak.png"
                } else {
                    this.toc = "../../static/speak.png"
                }
                this.isRecord = !this.isRecord
            },
            // 点击表情
            onClickEmoji() {
                this.isEmoji = !this.isEmoji
                setTimeout(() => { 
                    this.getElementHeight()
                }, 0)
            },
            emotion(e) {
                this.msg = this.msg + e
            },
            focus() {
                this.isEmoji = true;
                setTimeout(() => {
                    this.msg = ''
                }, 0)
            },
            // 
            onClickInput(e) {
                const { value } = e.target || {}
                const pos = value.indexOf('\n')
                if (pos != -1 && value.length > 0) {
                    this.$emit('sendMsg', this.msg)
                    setTimeout(() => {
                        this.msg = ''
                    }, 0)
                }
            },
            emojiSend() {
                if (this.msg?.length > 0) {
                    this.$emit('sendMsg', this.msg)
                    setTimeout(() => {
                        this.msg = ''
                    }, 0)
                }
            }
        }
    }
</script>
<style lang="scss">
.submit {
    padding: 10px;
    background-color: #f8f8f8;
    border-top: 1px solid #eaeaea;
}
.submit-chat {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.btn {
    flex: 1;
    margin: 0 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
}
.chat-send {
    line-height: 44rpx;
}
.record {
    text-align: center;
    line-height: 23px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 5px;
}
.bt-img .icon {
    width: 30px;
    height: 30px;
}
.bt-img .icon.gray {
    filter: grayscale(100%);
}
.emoji-icon {
    margin-right: 10px;
}
.add-icon {
    margin-left: 10px;
}
.emoji {
    width: 100%;
    height: 460rpx;
    background: rgba(236, 237, 238, 1);
    box-shadow: 0 -1rpx 0 0 rgba(0,0,0,0.1);
    .emoji-send {
        width: 280rpx;
        height: 104rpx;
        padding-top: 24rpx;
        background-color: rgba(236,237,238,0.8);
        position: fixed;
        bottom: 0;
        right: 0;
        display: flex;
        .emoji-send-bt {
            flex: 1;
            margin: 0 32rpx 0 20rpx;
            height: 80rpx;
            background: rgba(255,228, 49, 1);
            font-size: 32rpx;
            text-align: center;
            line-height: 80rpx;
            border-radius: 12rpx;
        }
        .emoji-send-det {
            flex: 1;
            margin: 0 32rpx 0 20rpx;
            height: 76rpx;
            background: #fff;
            font-size: 32rpx;
            text-align: center;
            line-height: 106rpx;
            padding-top: 4rpx;
            border-radius: 12rpx;
            image {
                width: 62rpx;
                height: 62rpx;
            }
        }
    }
}
.displayNone {
    display: none;
}
</style>