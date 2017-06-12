let {WeToast} = require('../components/toast/toast.js');

const app = getApp();




function formatTime(date) {
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()

    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()


    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}


//根据后台需要，封装了微信小程序网络请求
let o2oAjax = function (obj) {


    let session = wx.getStorageSync('session_key');
    wx.request({
        url: obj.url,
        method: obj.method,
        header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': session
        },
        data: obj.data,

        success: (result) => {
            if (result.data.status == 8888) {
                console.log("登录信息过期，重新登录！")
                wxLogin();
                return;
            }
            else if (result.data.status != 0) {
                WeToast().toast({
                    title: result.data.msg,
                    duration: 1500
                })
                return;
            }
            else {
                obj.success(result.data);
            }
        }
    })
}



//微信登录方法
const wxLogin = ()=>{
    wx.login({
        success: function (res) {
            if (res.code) {
                //发起网络请求
                wx.request({
                    url: 'https://www.pcclub.top/Home/Index/login', //仅为示例，并非真实的接口地址
                    method: "POST",
                    header: {
                        'content-type': 'application/x-www-form-urlencoded',
                    },
                    data: {
                        code: res.code
                    },
                    success: function (result) {
                        wx.setStorage({
                            key: "session_key",
                            data: result.data.obj.session_key
                        })
                    }
                })
            } else {
                console.log('获取用户登录态失败！' + res.errMsg)
            }
        }
    });

}


module.exports = {
    formatTime : formatTime,
    o2oAjax : o2oAjax,
    wxLogin : wxLogin

}
