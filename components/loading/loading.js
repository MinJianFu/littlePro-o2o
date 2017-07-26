
/**
 * 使用方法
 * 需要使用此组件的页面引入此模版后，再从getApp中引入loading方法
 */


function loading(){
    let pages = getCurrentPages();
    let curPage = pages[pages.length - 1];
    this.__page = curPage;
    let __showLoading = function(){
        curPage.setData({
            '__loading__.status': 1,
        })
    }
    let __hideLoading = function(){
        curPage.setData({
           '__loading__.status' : 0
        })
    }
    return {__showLoading, __hideLoading};
}
module.exports = {
    loading : loading
}