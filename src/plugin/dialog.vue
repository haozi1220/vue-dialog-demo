/** dialog vue*/
<template>
    <div v-if="showDialog" @click.stop="stopPropagation">
        <div class="dialog_mask"></div>
        <div class="dialog_wrap">
            <!-- 标题 -->
            <div class="dialog_header" v-if="title">{{title}}</div>
            <!-- 主体 -->
            <div class="dialog_body">{{content}}</div>
            <!-- 按钮 -->
            <div class="dialog_footer">
                <a href="javascript:;" class="confirm_btn" @click="closeDialog('ok')">{{confirmText}}</a>
                <a href="javascript:;" class="cancle_btn" @click="closeDialog('no')">{{cancleText}}</a>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: "提示"
            },
            content: {
                type: String,
                default: "我是提示主体"
            },
            confirmText: {
                type: String,
                default: '确定'
            },
            cancleText: {
                type: String,
                default: '取消'
            },
            confirmCallBack: {
                type: Function,
                required: false
            },
            cancleCallBack: {
                type: Function,
                required: false
            }
        },
        data(){
            return {
                showDialog: this.show
            }
        },
        watch: {
            show(showFlag){
                this.showDialog = showFlag;
            }
        },
        methods: {
            closeDialog(eventString){
                this.showDialog = false;
                this.$emit('close');
                eventString == 'ok' && this.confirmCallBack && typeof this.confirmCallBack == 'function' && this.confirmCallBack();
                eventString == 'no' && this.cancleCallBack && typeof this.cancleCallBack == 'function' && this.cancleCallBack();
            },
            // 最外层添加事件阻止冒泡
            stopPropagation(){
                // do nothing
            }
        }
    }
</script>
<style scoped>
    .dialog_mask {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(27, 25, 24, .6);
        z-index: 99;
    }
    .dialog_wrap {
        position: fixed;
        left: 50%;
        top: 50%;
        min-width: 200px;
        transform: translate(-50%, -50%);
        background-color: #fff;
        z-index: 100;
        padding: 20px 50px;
        border-radius: 10px;
        text-align: center;
    }
    .dialog_header {
        padding-bottom: 10px;
        font: 24px/30px "Microsoft YH";
        color: #333;
        font-weight: 100;
    }
    .dialog_body {
        font: 18px/24px "Microsoft YH";
        color: #3e3e3e;
    }
    .dialog_footer {
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .dialog_footer a {
        display: block;
        padding: 5px 10px;
        background-color: rgba(88, 70, 245, 0.726);
        border-radius: 5px;
        text-decoration: none;
        color: #fff;
    }
</style>