<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 2018/10/6
 * Time: 10:18
 */

namespace app\tdc\controller;

use app\tdc\api\Status;
use app\tdc\api\Times;

use think\Controller;
use think\Request;
use think\Db;
use think\Session;


class Chat extends Controller{

    //获取聊天列表
    public function GetChatList(){
        $userid = Session::get("userid");

        $sql = "select * from tdc_chatassist where fromuserid = $userid or touserid = $userid";
        $result = Db::query($sql);

        if(empty($result)){
            return Status::ReturnErrorStatus("ERROR_STATUS_LISTISNULL");
        }
        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "", json_encode($result));
    }



    //获取未读聊天信息
    public function GetUnReadInfo(Request $request){

        $publishId = $request->param("publishId");

        //发布人的id
        $sql = "select userid from tdc_publish where id = $publishId";

        $result = Db::query($sql);

        if(empty($result)){
            return Status::ReturnErrorStatus("ERROR_STATUS_PUBLISHALREADYDELETE");
        }
        $userid = Session::get("userid");

        while($row = $result->fetch()){
            return $row[userid];
        }
        return json_encode($result.);

        $publishUserId = json_encode($result).userid;



        //是否有未读消息
        $sql = "select hasunreadmsg from tdc_chatassist where fromuserid = $publishUserId and touserid = $userid";
        $result = Db::query($sql);

        //有$publishUserId发来的未读消息
        if(!empty($result) && $result == true){
            $sql = "select * from tdc_chat where fromuserid = $publishUserId and touserid = $userid and isread = false";
            $result = Db::query($sql);
            if(!empty($result)){
                //有未读消息，读取，更改状态
                $sql = "update tdc_chatassist set hasunreadmsg = false where fromuserid = $publishUserId and touserid = $userid";
                Db::execute($sql);

                $sql = "select * from tdc_chat where fromuserid = $publishUserId and touserid = $userid and isread = false order by sendtime";
                $result = Db::query($sql);

                $sql = "update tdc_chat set isread = true where fromuserid = $publishUserId and touserid = $userid";
                Db::execute($sql);

                return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "", json_encode($result));
            }
        }
        return Status::ReturnErrorStatus("ERROR_STATUS_LISTISNULL");
    }

    public function GetHistoryInfo(Request $request){
        $publishId = $request->param("publishId");

        $sql = "select userid from tdc_publish where id = $publishId";
        $result = Db::query($sql);
        if(empty($result)){
            return Status::ReturnErrorStatus("ERROR_STATUS_PUBLISHALREADYDELETE");
        }

        $publishUserId = $result;

        $userid = Session::get("userid");

        $sql = "select * from tdc_chat where fromuserid = $publishUserId and touserid = $userid";
        $result = Db::query($sql);
        if(empty($result)){
            return Status::ReturnErrorStatus("ERROR_STATUS_LISTISNULL");
        }

        //更改状态--chatassist
        $sql = "update tdc_chatassist set hasunreadmsg = false where fromuserid = $publishId and touserid = $userid and hasunreadmsg = true";
        Db::execute($sql);

        //更改状态--chat
        $sql = "update tdc_chat set isread = true where fromuserid = $publishId and touserid = $userid and isread = false";
        Db::execute($sql);


        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "", json_encode($result));
    }

    public function AddChatInfo(Request $request){

        $systemTime = Times::GetSystemTime();

        $publishId = $request->param("publishId");
        $content = $request->param("content");
        $userid = Session::get("userid");

        $sql = "select * from tdc_chatassist where fromuserid = $userid and touserid = $publishId";
        $result = Db::qiery($sql);
        if(empty($result)){
            //新增记录
            $sql = "insert into tdc_chatassist(fromuserid, touserid, hasunreadmsg) values ($userid, $publishId, true)";
            Db::execute($sql);
        }else{
            //如果hasunreadmsg为false，置为true
            if($result[hasunreadmsg] == false){
                $sql = "update tdc_chatassist set hasunreadmsg = true where fromuserid = $userid and touserid = $publishId";
                Db::execute($sql);
            }
        }

        //插入chat表
        $sql = "insert into tdc_chat(content, formuserid, touserid, sendtime, isread) values($content, $userid, $publishId, $systemTime, false)";
        Db::execute($sql);

        return Status::ReturnJson("ERROR_STATUS_SUCCESS", "发送成功");
    }

}