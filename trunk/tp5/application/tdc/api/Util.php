<?php

namespace app\tdc\api;

class Util{
    static public function GetUUID(){
        $str = md5(uniqid(mt_rand(), true));
        return $str;
    }

    static public function HasTel(){
        return false;
    }

    static public function HasCaptcha(){
        return false;
    }

}