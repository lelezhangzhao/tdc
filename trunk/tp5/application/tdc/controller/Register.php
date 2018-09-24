<?php

namespace app\tdc\controller;

use app\tdc\api\Status;
use think\Controller;
use think\Request;



class Register extends Controller{
    public function getTelIdentify(Request $request){
        $tel = $request->param("tel");
        //验证手机号格式
        if(preg_match($tel, "/^1\d{10}$/") === 0){
            return Status::ReturnErrorStatus(ERROR_STATUS_TELFORMATERROR);
        }

        //手机号已存在
        $user =


        //发送手机验证码
        if(true === TelIdentify::GetTelIdentify($tel)){

        }else{

        }
    }
}