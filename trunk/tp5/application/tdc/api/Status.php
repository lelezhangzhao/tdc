<?php

namespace app\tdc\api;

class Status{



    static public $ERROR_STATUS = array(
        "ERROR_STATUS_SUCCESS" => "正常",
        "ERROR_STATUS_FAILED" => "失败",
        "ERROR_STATUS_TEST" => "测试",
        "ERROR_STATUS_USERNAMEFORMATERROR" => "用户名格式错误",
        "ERROR_STATUS_USERNAMEISALREADYEXIST" => "用户名已存在",
        "ERROR_STATUS_USERNAMEISNOTEXIST" => "用户名不存在",
        "ERROR_STATUS_USERISNOTEXIST" => "用户不存在",
        "ERROR_STATUS_USERNAMEORPASSWORDERROR" => "用户名或密码错误",
        "ERROR_STATUS_USERNAMEISFROZEN" => "用户已封号",
        "ERROR_STATUS_PASSWORDFORMATERROR" => "密码格式错误",
        "ERROR_STATUS_OLDPASSWORDISNOTRIGHT" => "旧密码不正确",
        "ERROR_STATUS_NOTLOGIN" => "未登录",
        "ERROR_STATUS_TELFORMATERROR" => "手机号格式错误",
        "ERROR_STATUS_NOTGETTELIDENTIFY" => "未获取手机验证码",
        "ERROR_STATUS_TELISNOTEQUAL" => "两次手机号不相同",
        "ERROR_STATUS_TELISALREADYEXIST" => "手机号已存在",
        "ERROR_STATUS_TELISNOTEXIST" => "手机号不存在",
        "ERROR_STATUS_TELIDENTIFYERROR" => "手机验证码错误",
        "ERROR_STATUS_CAPTCHAEMPTY" => "图片验证码为空",
        "ERROR_STATUS_CAPTCHAERROR" => "图片验证码错误",
        "ERROR_STATUS_HACKER" => "非法访问，账号已冻结",
        "ERROR_STATUS_PARAMERROR" => "参数错误",
        "ERROR_STATUS_PUBLISHALREADYDELETE" => "发布已删除",
        "ERROR_STATUS_LISTISNULL" => "列表为空",
        "ERROR_STATUS_PUBLISHLISTISFULL" => "发布列表已满",
        "ERROR_STATUS_PUBLISHHASCOLLECTIONED" => "该发布已收藏",
        "ERROR_STATUS_WXREGISTERSUCCESS" => "微信注册成功",
        "ERROR_STATUS_UPLOADISNOTIMAGE" => "上传的不是图片",
        "ERROR_STATUS_PHOTOISFULL" => "上传的图片已满",
    );

    static public function ReturnJson($code, $msg){
        $json_arr = ["code" => $code, "msg" => $msg];
        return json_encode($json_arr);
    }

    static public function ReturnErrorStatus($code){
        return self::ReturnJson($code, Status::$ERROR_STATUS[$code]);
    }

    static public function ReturnJsonWithContent($code, $msg, $jsoncontent){
        $json_arr = ["code" => $code, "msg" => $msg, "jsoncontent" => $jsoncontent];
        return json_encode($json_arr);
    }
}
