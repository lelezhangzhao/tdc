<?php

namespace app\tdc\controller;

use app\tdc\api\Status;
use app\tdc\api\Times;
use app\tdc\model\User;
use think\Controller;
use think\Request;
use think\Session;
use think\Db;



class Register extends Controller{
    public function GetTelIdentify(Request $request){
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
        //$telIdentify = $request->param("telIdentify");



        //和获取验证码的手机号相同
        //if(false === Session::has("registerTel")){
            //return Status::ReturnErrorStatus("ERROR_STATUS_NOTGETTELIDENTIFY");
        //}

        //$registerTel = Session::get("registerTel");
        //if(preg_match("/^1\d{10}$/", $tel) === 0){
            //return Status::ReturnErrorStatus("ERROR_STATUS_TELFORMATERROR");
        //}
        //if($registerTel !== $tel){
            //return Status::ReturnErrorStatus("ERROR_STATUS_TELISNOTEQUAL");
        //}

        //两次手机号相同，删除session
        //Session::delete("registerTel");

        //手机验证码
        //if(false === TelIdentify::TelIdentifyOk($telIdentify)){
            //return Status::ReturnErrorStatus("ERROR_STATUS_TELIDENTIFYERROR");
        //}


        //用户名合法
        $usernameLen = strlen($username);
        if($usernameLen < 5 || $usernameLen > 30){
            return Status::ReturnErrorStatus("ERROR_STATUS_USERNAMEFORMATERROR");
        }
        if(preg_match("/[a-zA-Z]{1}/", $username) === 0){
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
        $user->logo = "static/image/logo/logo.png";
        $user->status = 1; //注册，未选择身份
        $user->rmb = 0;
        $user->score = 0;
        $user->registertime = $currentTime;
        $user->evaluateavg = 0;
        $user->evaluatecount = 0;
        $user->sex = 0;
        $user->name = "姓名";
        $user->nickname = "昵称";
        $user->tel = $tel;
        $user->address = "广东省-广州市-天河区";
        $user->detailaddress = "广东省广州市天河区";
        $user->workaddress = "广东省-广州市-天河区";
        $user->detailworkaddress = "广东省广州市天河区";
        $user->tag = "拉丁;全职;在校;";
        $user->introduction = "";


        //注册成功直接登录
        $user->lastlogintime = $currentTime;
        $user->save();

        $userid = $user->id;
        Session::set("userid", $userid);

        //增加配套数据表
        $sql = "insert into tdc_collection(userid) values ($userid)";
        Db::execute($sql);

        $sql = "insert into tdc_history(userid) values ($userid)";
        Db::execute($sql);

        $sql = "insert into tdc_search(userid) values ($userid)";
        Db::execute($sql);



        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "注册成功", "$userid");
    }

    public function RegisterAsTeacher(){

        $userid = Session::get("userid");

        $user = User::get($userid);

        $user->role = 0;
        $user->save();

        return Status::ReturnErrorStatus("ERROR_STATUS_SUCCESS");
    }

    public function RegisterAsSchool(){
        $userid = Session::get("userid");
        $user = User::get($userid);

        $user->role = 1;
        $user->save();

        return Status::ReturnErrorStatus("ERROR_STATUS_SUCCESS");

    }

}