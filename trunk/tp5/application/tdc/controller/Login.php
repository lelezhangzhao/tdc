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
use think\Db;

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

    public function Logout(Request $request){
        $systemTime = Times::GetSystemTime();
        $userid = Session::get("userid");


        $sql = "select chatkey from tdc_user where id = $userid";
        $result = Db::query($sql);

        $sql = "update tdc_user set logouttime = '" . $systemTime . "' where id = $userid";
        Db::execute($sql);

        Session::delete("userid");



        return Status::ReturnErrorStatus("ERROR_STATUS_SUCCESS");
    }

    public function LoginByWx(Request $request){
        $code = $request->param("code");

        $urls = "https://api.weixin.qq.com/sns/jscode2session";
        $appid = "?appid=wx11615bd4e97a1c58";
        $secret = "&secret=032200031701fb194e3e980f3766d69b";
        $js_code = "&js_code=" . $code;
        $grant_type = "&grant_type=authorization_code";

        $url= $urls . $appid . $secret . $js_code . $grant_type;

        $userinfo = json_decode(file_get_contents($url), true);

        $openid = $userinfo["openid"];
        $session_key = $userinfo["session_key"];

        $sql = "select id, role from tdc_user where username = '" . $openid . "'";
        $result = Db::query($sql);

        if(empty($result)){
            $systemTime = Times::GetSystemTime();
            //注册成功
            $user = new User();
            $user->username = $openid;
            $user->password = $session_key;
            $user->logo = "static/image/global/user_logo.png";
            $user->status = 1; //注册，未选择身份
            $user->rmb = 0;
            $user->score = 0;
            $user->registertime = $systemTime;
            $user->evaluateavg = 0;
            $user->evaluatecount = 0;
            $user->sex = 0;
            $user->name = "姓名";
            $user->nickname = "昵称";
            $user->tel = "电话";
            $user->workaddress = "工作地址";
            $user->tag = "拉丁;全职;在校;";
            $user->introduction = "";

            //注册成功直接登录
            $user->lastlogintime = $systemTime;
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

            return Status::ReturnJsonWithContent("ERROR_STATUS_WXREGISTERSUCCESS", "", $userid);
        }

        $userid = $result[0]["id"];
        Session::set('userid', $userid);
        $return_arr = array("userid" => $result[0]["id"], "role" => $result[0]["role"]);
        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "", json_encode($return_arr));

    }

    public function AddWxInfo(Request $request){
        $nickname = $request->param("nickname");
        $sex = $request->param("sex");
        $sex = $sex == 1 ? 0 : 1;
        $address = $request->param("address");
        $detailaddress = str_replace('-','',$address);

        $userid = Session::get("userid");

        $sql = "update tdc_user set nickname = '" . $nickname . "', sex = $sex, address = '" . $address . "', workaddress='" . $address . "', detailaddress = '" . $detailaddress . "', detailworkaddress = '" . $detailaddress . "' where id = $userid";

        Db::execute($sql);
        return $sql;
        return Status::ReturnErrorStatus("ERROR_STATUS_SUCCESS");
    }

}