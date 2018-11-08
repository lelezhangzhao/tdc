<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 2018/9/27
 * Time: 11:26
 */

namespace app\tdc\controller;

use app\tdc\api\Status;
use app\tdc\api\GlobalData;

use think\Controller;
use think\Request;
use think\Session;
use think\Db;


class Index extends Controller{
    public function StartChatServer(){
        if(!GlobalData::$chatServerHasStarted){
            GlobalData::$chatServerHasStarted = true;

//            $userid = Session::get("userid");
            $userid = 16;

            $chatServet = new ChatServer("127.0.0.1", "9608", $userid);
            $chatServet->run();



        }
    }
    public function GetHighEvalList(Request $request){


        //返回evaluateavg为10的项，每次返回20个
        $begin = $request->param("begin");

        $sql = 'select a.id,a.publishobject,a.evaluateavg,a.tag,a.introduction,b.logo,b.name from tdc_publish as a join tdc_user as b on a.userid = b.id where a.evaluateavg = 10 limit 20 offset '.$begin;

        $result = Db::query($sql);


        if(empty($result)){
            return Status::ReturnJsonWithContent("ERROR_STATUS_LISTISNULL", "高评用户列表为空", "");
        }

        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "获取成功", json_encode($result));

    }




}