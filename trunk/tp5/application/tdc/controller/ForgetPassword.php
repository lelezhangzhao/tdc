<?php

namespace app\tdc\controller;

use app\tdc\model\User;
use think\Controller;
use think\Request;
use think\Session;
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
            Session::set("forgetpasswordtel", $tel);
            return Status::ReturnJson("ERROR_STATUS_SUCCESS", "验证码发送成功");
        }

        //验证码发送失败，稍后重发
        return Status::ReturnJson("ERROR_STATUS_FAILED", "验证码发送失败，请稍后重试");
    }

    public function ForgetPasswordConfirm(Request $request){

        if(!Session::has("forgetpasswordtel")){
            return Status::ReturnErrorStatus("ERROR_STATUS_NOTGETTELIDENTIFY");
        }

        $tel = $request->param("tel");
        $newPassword = $request->param("password");

        if($tel !== Session::get("forgetpasswordtel")){
            return Status::ReturnErrorStatus("ERROR_STATUS_TELISNOTEQUAL");
        }

        Session::delete("forgetpasswordtel");
        $user = User::where("tel", $tel)->find();
        if(empty($user)){
            return Status::ReturnErrorStatus("ERROR_STATUS_TELISNOTEXIST");
        }

        $user->password = $newPassword;
        $user->save();

        return Status::ReturnJson("ERROR_STATUS_SUCCESS", "密码重置成功");
    }
}
