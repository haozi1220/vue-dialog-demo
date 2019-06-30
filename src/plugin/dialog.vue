/** dialog vue*/
<template>
    <div v-if="showDialog">
        <!-- 标题 -->
        <div class="dialog_header" v-if="title">{{title}}</div>
        <!-- 主体 -->
        <div class="dialog_body">{{content}}</div>
        <!-- 按钮 -->
        <div class="dialog_footer">
            <a href="javascript:;" class="confirm_btn" @click="closeDialog('no')">{{confirmText}}</a>
            <a href="javascript:;" class="cancle_btn" @click="closeDialog('ok')">{{cancleText}}</a>
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
            
        }
    }
</script>
<style scoped>

</style>