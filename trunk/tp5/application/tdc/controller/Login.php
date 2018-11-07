<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 2018/9/26
 * Time: 14:04
 */

namespace app\tdc\controller;

use app\tdc\api\Status;
use app\tdc\api\Times;
use app\tdc\model\User;
use think\Controller;
use think\Request;
use think\Session;

class Login extends Controller{
    public function Login(Request $request){

        $currentTime = Times::GetSystemTime();

        $username = $request->param("username");
        $password = $request->param("password");

        //username
        $usernameLen = strlen($username);
        if($usernameLen < 5 || $usernameLen > 30){
            return Status::ReturnErrorStatus("ERROR_STATUS_USERNAMEFORMATERROR");
        }

        $user = User::where("username", $username)->find();
        if(empty($user)){
            $user = User::where("tel", $username)->find();
            if(empty($user)){
                return Status::ReturnErrorStatus("ERROR_STATUS_USERNAMEORPASSWORDERROR");
            }
        }
        if($user->password !== $password){
            return Status::ReturnErrorStatus("ERROR_STATUS_USERNAMEORPASSWORDERROR");
        }


        //登录成功
        $user->lastlogintime = $currentTime;
        $user->save();


        Session::set("userid", $user->id);

        $return_arr = array("userid" => $user->id, "role" => $user->role);
        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "", json_encode($return_arr));
    }
}