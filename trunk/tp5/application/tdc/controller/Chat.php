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

        $sql = "select fromuserid, touserid, hasunreadmsg from tdc_chatassist where fromuserid = $userid or touserid = $userid";
        $result = Db::query($sql);

        if(empty($result)){
            return Status::ReturnErrorStatus("ERROR_STATUS_LISTISNULL");
        }
        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "", json_encode($result));
    }



    //获取未读聊天信息
    public function GetUnReadInfo(Request $request){

        $theOtherUserId = $request->param("theOtherUserId");
//        $publishId = $request->param("publishId");

        //发布人的id
//        $sql = "select * from tdc_publish where id = $publishId";
//        $result = Db::query($sql);

//        $theOtherUserId = Db::name("publish")->where("id", $publishId)->value("userid");
//
//        if(empty($theOtherUserId)){
//            return Status::ReturnErrorStatus("ERROR_STATUS_PUBLISHALREADYDELETE");
//        }
        $userid = Session::get("userid");


        //是否有未读消息
//        $sql = "select hasunreadmsg from tdc_chatassist where fromuserid = $theOtherUserId and touserid = $userid";
//        $result = Db::query($sql);

        $hasunreadmsg = Db::name("chatassist")->where("fromuserid", $theOtherUserId)->where("touserid", $userid)->value("hasunreadmsg");

        //有$theOtherUserId发来的未读消息
        if(!empty($hasunreadmsg) && $hasunreadmsg == true){
            $sql = "select * from tdc_chat where fromuserid = $theOtherUserId and touserid = $userid and isread = false";
            $result = Db::query($sql);
            if(!empty($result)){
                //有未读消息，读取，更改状态
                $sql = "update tdc_chatassist set hasunreadmsg = false where fromuserid = $theOtherUserId and touserid = $userid";
                Db::execute($sql);

                $sql = "select * from tdc_chat where fromuserid = $theOtherUserId and touserid = $userid and isread = false order by sendtime";
                $result = Db::query($sql);

                $sql = "update tdc_chat set isread = true where fromuserid = $theOtherUserId and touserid = $userid";
                Db::execute($sql);


                return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "", json_encode($result));
            }
        }
        return Status::ReturnErrorStatus("ERROR_STATUS_LISTISNULL");
    }

    public function GetHistoryInfo(Request $request){
//        $publishId = $request->param("publishId");
        $theOtherUserId = $request->param("theOtherUserId");


//        $sql = "select userid from tdc_publish where id = $publishId";
//        $result = Db::query($sql);
//        $theOtherUserId = Db::name("publish")->where("id", $publishId)->value("userid");
//
//        if(empty($theOtherUserId)){
//            return Status::ReturnErrorStatus("ERROR_STATUS_PUBLISHALREADYDELETE");
//        }


        $userid = Session::get("userid");

        $sql = "select * from tdc_chat where (fromuserid = $theOtherUserId and touserid = $userid) or (fromuserid = $userid and touserid = $theOtherUserId) order by sendtime";
        $result = Db::query($sql);
        if(empty($result)){
            return Status::ReturnErrorStatus("ERROR_STATUS_LISTISNULL");
        }

        //更改状态--chatassist
        $sql = "update tdc_chatassist set hasunreadmsg = false where fromuserid = $theOtherUserId and touserid = $userid and hasunreadmsg = true";
        Db::execute($sql);

        //更改状态--chat
        $sql = "update tdc_chat set isread = true where fromuserid = $theOtherUserId and touserid = $userid and isread = false";
        Db::execute($sql);


        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "", json_encode($result));
    }

    public function AddChatInfo(Request $request){

        $systemTime = Times::GetSystemTime();

        $theOtherUserId = $request->param("theOtherUserId");

//        $publishId = $request->param("publishId");
        $content = $request->param("content");

//        $sendTime = $request->param('sendTime');
//        $systemTime = date("Y-m-d H:i:s", $sendTime);


        $userid = Session::get("userid");

        $hasunreadmsg = Db::name("chatassist")->where("fromuserid", $userid)->where("touserid", $theOtherUserId)->value("hasunreadmsg");

        if(empty($hasunreadmsg)){
            //新增记录
            $sql = "insert into tdc_chatassist(fromuserid, touserid, hasunreadmsg) values ($userid, $theOtherUserId, true)";
            Db::execute($sql);
        }else{
            //如果hasunreadmsg为false，置为true
            if($hasunreadmsg == false){
                $sql = "update tdc_chatassist set hasunreadmsg = true where fromuserid = $userid and touserid = $theOtherUserId";
                Db::execute($sql);
            }
        }

        //插入chat表
//        $sql = "insert into tdc_chat(content, fromuserid, touserid, sendtime, isread) values('123', 3, 1, '2018-10-11 10:00:00', false)";
        $sql = "insert into tdc_chat(content, fromuserid, touserid, sendtime, isread) values ($content, $userid, $theOtherUserId,'" . $systemTime . "', false);";

        Db::execute($sql);


        return Status::ReturnJson("ERROR_STATUS_SUCCESS", "发送成功");
    }

}