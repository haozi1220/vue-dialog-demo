/**dialog js */
import Dialog from './dialog.vue'
const dialogs = {
    install(Vue, opt) {
        Vue.prototype.$dialog = (opt = {}) => {
            // 默认参数
            let defaultOpt = {
                title: 'QQ音乐',
                content: '我是QQ音乐',
                confirmText: '去打开',
                cancleText: '不去了'
            }
            // 如果传入字符串参数
            if (typeof opt == 'string') {
                defaultOpt.content = opt;
            }
            // 覆盖关系：调用参数 -> 插件安装时初始化参数 -> 默认参数
            opt = {...defaultOpt, ...opt};
            // 创建vue的子类
            let Dialogs = Vue.extend(Dialog);
            // 实力化dialog，放在根目录下
            let vm = new Dialogs({el: document.createElement('div')});
            // 将实例的根元素挂在到dody下
            document.body.appendChild(vm.$el);
            // 保存当前实例
            this.vm = vm;
            // 传参给组件实例
            Object.assign(vm, opt);
            // 显示弹窗组件
            vm.show = true;
            vm.$on('close', () => {
                // 监听到关闭事件时
                document.body.removeChild(vm.$el);
                vm.$destroy();
                this.vm = null;
            });
            let slotTemp = Vue.compile(opt.title.domTemp);
            let slotContent = {
                data(){return {}},
                methods: {
                    showAlert(){
                        alert(3333);
                    }
                },
                render: slotTemp.render,
                staticRenderFns: slotTemp.staticRenderFns
            }
            vm.$slots.title = [vm.$createElement(slotContent)];
        };    
    }
}

export default dialogs;