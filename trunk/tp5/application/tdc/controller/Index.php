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
//    private $chatServer;

    public function DeleteSocket(Request $request){
        $userid = Session::get("userid");
        $sql = "select chatkey from tdc_user where id = $userid";
        $result = Db::query($sql);

        $key = $result[0]["chatkey"];


        return Status::ReturnErrorStatus("ERROR_STATUS_SUCCESS");
    }

    public function StartChatServer(){

        if(!GlobalData::$chatServerHasStarted){
            GlobalData::$chatServerHasStarted = true;

//            $userid = Session::get("userid");


            ChatServer::buildScket("127.0.0.1", "9612");
            ChatServer::run();

//            $this->chatServer = new ChatServer();
//            $this->chatServer->run();
        }
    }
    public function GetHighEvalList(Request $request){
        GlobalData::$chatServerHasStarted = true;

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