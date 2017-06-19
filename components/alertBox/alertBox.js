
/**
 * 使用方法
 * alert方法接受两个参数，参数一为对象（title : 弹窗title, text : 弹窗内容），参数二为点击确定按钮后的回调方法
 */


function alertBox(){
    let pages = getCurrentPages();
    let curPage = pages[pages.length - 1];
    this.__page = curPage;
    this.alert = function(obj, sureFn){
        this.__page.setData({
            '__alertBox__.status': 1,
            '__alertBox__.title' : obj.title,
            '__alertBox__.text' : obj.text,
        })
        this.__page.callBackFn = sureFn;
    }
    this.__page.__hideAlertBox = function(){
        this.setData({
           '__alertBox__.status' : 0
        })
        this.callBackFn &&　this.callBackFn();
    }
    return this;
}
module.exports = {
    alertBox : alertBox
}