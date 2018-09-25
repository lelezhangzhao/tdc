<?php

namespace app\tdc\controller;

use app\tdc\api\Status;
use app\tdc\api\Times;
use app\tdc\model\User;
use think\Controller;
use think\Request;
use think\Session;



class Register extends Controller{
    public function getTelIdentify(Request $request){
        $tel = $request->param("tel");
        //手机号格式错误
        if(preg_match("/^1\d{10}$/", $tel) === 0){
            return Status::ReturnErrorStatus("ERROR_STATUS_TELFORMATERROR");
        }

        //手机号已存在
        $user = User::where("tel", $tel)->find();
        if(!empty($user)){
            return Status::ReturnErrorStatus("ERROR_STATUS_TELISALREADYEXIST");
        }


        //记录手机号，注册时验证
        Session::set("registerTel", $tel);


        //发送手机验证码
        if(true === TelIdentify::GetTelIdentify($tel)){
            return Status::ReturnJson("ERROR_STATUS_SUCCESS", "验证码发送成功");
        }

        //验证码发送失败，稍后重发
        return Status::ReturnJson("ERROR_STATUS_FAILED", "验证码发送失败，请稍后重试");
    }

    public function Register(Request $request){

        $currentTime = Times::GetSystemTime();

        $username = $request->param("username");
        $password = $request->param("password");
        $tel = $request->param("tel");
        $telIdentify = $request->param("telIdentify");



        //和获取验证码的手机号相同
        if(false === Session::has("registerTel")){
            return Status::ReturnErrorStatus("ERROR_STATUS_NOTGETTELIDENTIFY");
        }

        $registerTel = Session::get("registerTel");
        if(preg_match("/^1\d{10}$/", $tel) === 0){
            return Status::ReturnErrorStatus("ERROR_STATUS_TELFORMATERROR");
        }
        if($registerTel !== $tel){
            return Status::ReturnErrorStatus("ERROR_STATUS_TELISNOTEQUAL");
        }

        //两次手机号相同，删除session
        Session::delete("registerTel");

        //手机验证码
        if(false === TelIdentify::TelIdentifyOk($telIdentify)){
            return Status::ReturnErrorStatus("ERROR_STATUS_TELIDENTIFYERROR");
        }


        //用户名合法
        $usernameLen = strlen($username);
        if($usernameLen < 5 || $usernameLen > 30){
            return Status::ReturnErrorStatus("ERROR_STATUS_USERNAMEFORMATERROR");
        }

        //用户名唯一
        $user = User::where("username", $username)->find();
        if(!empty($user)){
            return Status::ReturnErrorStatus("ERROR_STATUS_USERNAMEISALREADYEXIST");
        }

        //注册成功
        $user = new User();
        $user->username = $username;
        $user->password = $password;
        $user->tel = $tel;
        $user->status = 1; //注册，未选择身份
        $user->rmb = 0;
        $user->score = 0;
        $user->registertime = $currentTime;
        $user->evaluateavg = 0;
        $user->evaluatecount = 0;
        $user->allowField(true)->save();

        return Status::ReturnJson("ERROR_STATUS_SUCCESS", "注册成功");
    }
}