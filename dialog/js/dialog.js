/**
 * Created by huahua on 2017/9/7 
 */
(function(win) {
    function Dialog(options) {
        //默认参数
        this.defaultOptions = {
            title: '',
            content: '',
            alertBtnText:'确定',
            alertCallBack:null,
            confirmBtnText:'确定',
            confirmCallBack:null,
            cancelBtnText:'取消',
            cancalCallBack:null
        };
        this.callbacks = {};
    }

    Dialog.prototype = {
        createDom: function () {
            var footerHtml = '';
            switch (this.options.type){
                case 'alert':
                footerHtml = 
                        `<a class="m-btn-dialog primary alert-btn" href="javascript:;">${this.options.alertBtnText}</a>`;
                        break;
                case 'confirm': 
                footerHtml =  
                        `<a class="m-btn-dialog default cancel-btn" href="javascript:;">${this.options.cancelBtnText}</a>
                        <a class="m-btn-dialog primary confirm-btn" href="javascript:;">${this.options.confirmBtnText}</a>`
                        break;
            }

            this.dialogWrap = document.createElement("div"); //父节点
            this.dialogWrap.id = 'dialog';
            this.dialogWrap.className = 'm-dialog-'+this.options.type;
            var dialogInner =
                `<div class="m-mask"></div><div class="m-dialog">
                <div class="m-dialog-hd"><strong class="m-dialog-title">${this.options.title}</strong></div>
                <div class="m-dialog-bd">${this.options.content}</div>
                <div class="m-dialog-ft">${footerHtml}</div>
                </div>`;
            this.dialogWrap.innerHTML = dialogInner; //添加到父节点
            document.body.appendChild(this.dialogWrap); //添加到body
            this.callbacks = {};
            this.bindEvents();
        },
        bindEvents: function () {
            var _this = this;
            //判断是否有回调函数
            if(this.options.alertCallBack){
                if (typeof this.callbacks.alert == 'undefined') {
                    this.callbacks.alert = [];
                }
                this.callbacks.alert.push(this.options.alertCallBack);
            }
            if(this.options.confirmCallBack){
                if (typeof this.callbacks.confirm == 'undefined') {
                    this.callbacks.confirm = [];
                }
                this.callbacks.confirm.push(this.options.confirmCallBack);
            }
            if(this.options.cancalCallBack){
                if (typeof this.callbacks.cancel == 'undefined') {
                    this.callbacks.cancel = [];
                }
                this.callbacks.cancel.push(this.options.cancalCallBack);
            }
            //点击事件
            this.dialogWrap.addEventListener("click", function (e) {
                if(e.target===document.querySelector('.alert-btn')){
                    if (_this.callbacks.alert instanceof Array) {
                        var callbacks = _this.callbacks.alert;
                        for (var i = 0, len = callbacks.length; i < len; i++) {
                            callbacks[i]();
                        }
                    }   
                    
                    _this.close();
                }else if(e.target===document.querySelector('.confirm-btn')){
                    if (_this.callbacks.confirm instanceof Array) {
                            var callbacks = _this.callbacks.confirm;
                            for (var i = 0, len = callbacks.length; i < len; i++) {
                                callbacks[i]();
                            }
                    }
                    
                    _this.close();
                }else if(e.target===document.querySelector('.cancel-btn')){
                    if (_this.callbacks.cancel instanceof Array) {
                            var callbacks = _this.callbacks.cancel;
                            for (var i = 0, len = callbacks.length; i < len; i++) {
                                callbacks[i]();
                            }
                    }
                    _this.close();
                }
            }, false)


        },
        close:function(){
            document.body.removeChild(this.dialogWrap);
        },
        alert: function(options){
            //检查参数是否为对象类型
            if (Object.prototype.toString.call(options) != '[object Object]') {
                throw new Error('参数错误');
            }
            this.options = Object.assign(this.defaultOptions, options ,{type:'alert'})
            this.createDom();
        },
        confirm:function(options){
            if (Object.prototype.toString.call(options) != '[object Object]') {
                throw new Error('参数错误');
            }
            this.options = Object.assign(this.defaultOptions, options ,{type:'confirm'})
            this.createDom();
        }

    };
    win.$alert = function(options){
        return new Dialog().alert(options);
    }
    win.$confirm = function(options){
        return new Dialog().confirm(options);
    }

})(window)