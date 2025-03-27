<template>
    <view>
        <view class="submit">
            <view class="submit-chat">
                <view class="bt-img" @tap="onClickRecords">
                    <image :src="toc" class="icon gray"></image>
                </view>
                <textarea v-model="msg" auto-height="true" class="chat-send btn" :class="{ displayNone: isRecord}" @input="onClickInput"></textarea>
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
            表情
        </view>
    </view>
</template>
<script>
    export default {
        name: 'Submit',
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
                    this.$emit('currentHeight',data.height)
                }).exec()
            },
            // 点击切换音频
            onClickRecords() {
                if(this.isRecord) {
                    this.toc = "../../static/yy.png"
                } else {
                    this.toc = "../../static/jp.png"
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
.record {
    text-align: center;
    line-height: 40px;
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
    margin-top: 10px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    border-radius: 5px;
    padding: 10px;
}
.displayNone {
    display: none;
}
</style>