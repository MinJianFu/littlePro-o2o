
function alertBox(){
    let pages = getCurrentPages();
    let curPage = pages[pages.length - 1];
    this.__page = curPage;
    this.alert = function(obj){
        this.__page.setData({
            '__alertBox__.status': 1,
            '__alertBox__.title' : obj.title,
            '__alertBox__.text' : obj.text,
        })
    }
    this.__page.__hideAlertBox = function(){
        this.setData({
           '__alertBox__.status' : 0
        })
    }
    return this;
}
module.exports = {
    alertBox : alertBox
}