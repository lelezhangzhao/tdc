<?php

namespace app\tdc\controller;

use think\Controller;
use think\Request;
use app\tdc\api\Status;

class ForgetPassword extends Controller{
    public function GetTelIdentify(Request $request){
        $tel = $request->param("tel");
        //手机号格式错误
        if(preg_match("/^1\d{10}$/", $tel) === 0){
            return Status::ReturnErrorStatus("ERROR_STATUS_TELFORMATERROR");
        }

        //手机号不存在
        $user = User::where("tel", $tel)->find();
        if(empty($user)){
            return Status::ReturnErrorStatus("ERROR_STATUS_TELISNOTEXIST");
        }

        //发送手机验证码
        if(true === TelIdentify::GetTelIdentify($tel)){
            return Status::ReturnJson("ERROR_STATUS_SUCCESS", "验证码发送成功");
        }

        //验证码发送失败，稍后重发
        return Status::ReturnJson("ERROR_STATUS_FAILED", "验证码发送失败，请稍后重试");
    }

    public function ForgetPasswordConfirm(Request $request){

    }
}
