<?php
namespace app\tdc\controller;
use think\Controller;

class Captcha extends Controller
{
// 验证码表单
    public function Index(){
        return $this->fetch();
    }
}