var globalData = require("../util/globaldata.js");

var Server = globalData.GetServerHttps() + "index.php/tdc/";

function uploadFile(url, filePath, name, formData = { openid: "test" }) {

  var httpUrl = Server + url;

  console.log(httpUrl);
  console.log(filePath);
  console.log(name);
  return new Promise((resolve, reject) => {
    let opts = { url: httpUrl, filePath: filePath, name: name, formData: formData, header: { 'Content-Type': "multipart/form-data" }, success: resolve, fail: reject };
    wx.uploadFile(opts);
  });
}

module.exports = {
  uploadFile: uploadFile
} 