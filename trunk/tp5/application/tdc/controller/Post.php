<?php

namespace app\tdc\controller;

use think\Controller;

class Post extends Controller{
    /************************************************************************************/
//获得账户
    public function get_user($ch,$apikey){
        curl_setopt ($ch, CURLOPT_URL, 'https://sms.yunpian.com/v2/user/get.json');
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query(array('apikey' => $apikey)));
        $result = curl_exec($ch);
        $error = curl_error($ch);
        $this->checkErr($result,$error);
        return $result;
    }
    public function send($ch,$data){
        curl_setopt ($ch, CURLOPT_URL, 'https://sms.yunpian.com/v2/sms/single_send.json');
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        $result = curl_exec($ch);
        $error = curl_error($ch);
        $this->checkErr($result,$error);
        return $result;
    }
    public function tpl_send($ch,$data){
        curl_setopt ($ch, CURLOPT_URL,
            'https://sms.yunpian.com/v2/sms/tpl_single_send.json');
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        $result = curl_exec($ch);
        $error = curl_error($ch);
        $this->checkErr($result,$error);
        return $result;
    }
    public function voice_send($ch,$data){
        curl_setopt ($ch, CURLOPT_URL, 'http://voice.yunpian.com/v2/voice/send.json');
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        $result = curl_exec($ch);
        $error = curl_error($ch);
        $this->checkErr($result,$error);
        return $result;
    }
    public function notify_send($ch,$data){
        curl_setopt ($ch, CURLOPT_URL, 'https://voice.yunpian.com/v2/voice/tpl_notify.json');
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        $result = curl_exec($ch);
        $error = curl_error($ch);
        $this->checkErr($result,$error);
        return $result;
    }

    public function checkErr($result,$error) {
        if($result === false)
        {
            echo 'Curl error: ' . $error;
        }
        else
        {
//echo '操作完成没有任何错误';
        }
    }


    public function Index($mobile)
    {
        $apikey = "38b284da1118dc4148a5d5a639fbeb17"; //修改为您的apikey(https://www.yunpian.com)登录官网后获取
//        $mobile = $_POST['mobile']; //获取传入的手机号
// $mobile = "xxxxxxxxxxx"; //请用自己的手机号代替
        $num = rand(1000,9999);   //随机产生四位数字的验证码
        setcookie('shopCode',$num);
        $text="您的验证码是".$num;
        $ch = curl_init();

        /* 设置验证方式 */
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept:text/plain;charset=utf-8',
            'Content-Type:application/x-www-form-urlencoded', 'charset=utf-8'));
        /* 设置返回结果为流 */
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        /* 设置超时时间*/
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);

        /* 设置通信方式 */
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

// 取得用户信息
        $json_data = $this->get_user($ch,$apikey);
        $array = json_decode($json_data,true);
// echo '<pre>';print_r($array);

// 发送短信
        $data=array('text'=>$text,'apikey'=>$apikey,'mobile'=>$mobile);
        $json_data = $this->send($ch,$data);
        $array = json_decode($json_data,true);
// echo '<pre>';print_r($array);

// 发送模板短信
// 需要对value进行编码
        $data = array('tpl_id' => '1', 'tpl_value' => ('#code#').
            '='.urlencode($num).
            '&'.urlencode('#company#').
            '='.urlencode('蒙羊羊'), 'apikey' => $apikey, 'mobile' => $mobile);
// print_r ($data);
        $json_data = $this->tpl_send($ch,$data);
        $array = json_decode($json_data,true);


        return $num;
    }

}

