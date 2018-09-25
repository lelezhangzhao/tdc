let Server = "https://localtdc.com/index.php/tdc/";

function NetRequest({ url, data, success, fail, complete, method = "POST" }) {
  var session_id = wx.getStorageSync('PHPSESSID');//本地取存储的sessionID
  if (session_id != "" && session_id != null) {
    var header = { 'content-type': 'application/x-www-form-urlencoded', 'Cookie': session_id }
  } else {
    var header = { 'content-type': 'application/x-www-form-urlencoded' }
  }

  console.log(session_id);
  url = Server + url;
  wx.request({
    url: url,
    method: method,
    data: data,
    header: header,
    success: res => {
      if (session_id == "" || session_id == null) {
        var cookie = res.header["Set-Cookie"];
        if(undefined !== cookie){
          var sessionPos;
          if ((sessionPos = cookie.indexOf("PHPSESSID=")) != -1){
            wx.setStorageSync('PHPSESSID', cookie.substr(sessionPos, 36)); //如果本地没有就说明第一次请求 把返回的session id 存入本地
          }
        }
      }
      console.log(res);
      let data = res.data

      res['statusCode'] === 200 ? success(data) : fail(res)
    },
    fail: fail,
    complete: complete
  })

}

module.exports = {
  NetRequest: NetRequest
} 