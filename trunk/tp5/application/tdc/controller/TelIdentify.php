<?php

namespace app\tdc\controller;

use think\Controller;
use think\Session;

use app\tdc\api\Util as UtilApi;

class TelIdentify extends Controller{
    static public function GetTelIdentify($tel){
        if(UtilApi::HasTel() === false)
            return true;

        $url = 'http://localtdc.com/index.php/tdc/post/index?mobile='.$tel;
        $ch = curl_init ();
        curl_setopt ( $ch, CURLOPT_URL, $url );
        curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, 1 );
        curl_setopt ( $ch, CURLOPT_CONNECTTIMEOUT, 10 );
        curl_setopt ( $ch, CURLOPT_POST, 1 ); //启用POST提交
        $file_contents = curl_exec ( $ch );
        Session::set('telidentify', $file_contents);
        curl_close ( $ch );

        return true;

    }

    static public function TelIdentifyOk($identify){
        if(UtilApi::HasTel() === false)
            return true;


        if(!Session::has('telidentify')){
            return false;
        }
        if((int)$identify !== (int)Session::get('telidentify')) {
            return false;
        } else {
            Session::delete('telidentify');
            return true;
        }
    }
}

