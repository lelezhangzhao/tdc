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

//        $sql = "select * from ((select a.fromuserid, a.touserid, a.fromuserid as otherid, a.sendtime, a.isread, a.content, b.name, b.logo from tdc_chat as a join tdc_user as b on a.fromuserid = b.id where a.touserid = $userid) as c) union
//(select a.fromuserid, a.touserid, a.touserid as otherid, a.sendtime, a.isread, a.content, b.name, b.logo from tdc_chat as a join tdc_user as b on a.touserid = b.id where a.fromuserid = $userid) order by sendtime desc";
        $sql = "select * from ((select a.fromuserid, a.touserid, a.fromuserid as otherid, a.lastsendtime, a.hasunreadmsg, a.briefcontent, b.name as othername, b.logo as otherlogo from tdc_chatassist as a join tdc_user as b on a.fromuserid = b.id where a.touserid = $userid) as c) union
(select a.fromuserid, a.touserid, a.touserid as otherid, a.lastsendtime, a.hasunreadmsg, a.briefcontent, b.name as othername, b.logo as otherlogo from tdc_chatassist as a join tdc_user as b on a.touserid = b.id where a.fromuserid = $userid) order by lastsendtime desc";

//        $sql = "select a.fromuserid, a.touserid, a.sendtime, a.isread, a.content, b.name, b.logo from tdc_chat as a join tdc_user as b on a.fromuserid = b.id or a.touserid = b.id where a.fromuserid = $userid or a.touserid = $userid order by a.sendtime desc";
        $result = Db::query($sql);
        if(empty($result)){
            return Status::ReturnErrorStatus("ERROR_STATUS_LISTISNULL");
        }
        $needDelete = array();
        $unique_result = array();
        for($i = 0; $i < count($result); ++$i){
            if(array_key_exists($i, $needDelete)){
                continue;
            }
            for($j = $i + 1; $j < count($result); ++$j){
                if(array_key_exists($j, $needDelete)){
                    continue;
                }
                if($result[$j]["fromuserid"] == $result[$i]["touserid"] && $result[$j]["touserid"] == $result[$i]["fromuserid"]){
                    $needDelete[] = $j;
                }
            }
        }

        $result = array_diff_key($result, $needDelete);

        foreach($result as &$item){
            if($item["fromuserid"] != $userid){
                $hasunreadmsg = $item["hasunreadmsg"];
            }else{
                $hasunreadmsg = false;
            }
            $item["hasunreadmsg"] = $hasunreadmsg;
        }


//        foreach($result as $item){
//            $key = $item["fromuserid"] . ";" . $item["touserid"];
//            if(!array_key_exists($key, $unique_result)){
//
//                if($item["fromuserid"] != $userid){
//                    $hasunreadmsg = !$item["isread"];
//                }else{
//                    $hasunreadmsg = false;
//                }
//                $unique_result[$key] = array("content" => $item['content'], "othername" => $item['name'], "otherlogo" => $item['logo'], "otherid" => $item["otherid"], "hasunreadmsg" => $hasunreadmsg);
//
//            }
//        }
//
//        $return_result = array();
//        foreach($unique_result as $key => $value){
//            $useridarr = explode(";", $key);
//            $fromuserid = $useridarr[0];
//            $touserid = $useridarr[1];
//            $return_result[] = array("fromuserid" => $fromuserid, "touserid" => $touserid, "content" => $value["content"], "othername" => $value["othername"], "otherlogo" => $value["otherlogo"], "otherid" => $value["otherid"], "hasunreadmsg" => $value["hasunreadmsg"]);
//        }

        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "", json_encode($result));
    }


//    public function HasUnreadInfo(Request $request){
//        $theOtherUserId = $request->param("theOtherUserId");
//        $userid = Session::get("userid");
//
//        $sql = "select hasunreadmsg from tdc_chatassist where fromuserid = $theOtherUserId and touserid = $userid";
//        $result = Db::query($sql);
//
//        if(empty($result)){
//            return Status::ReturnErrorStatus("ERROR_STATUS_LISTISNULL");
//        }
//
//
//        $returnJsoncontent = $result[0]["hasunreadmsg"] ? "true" : "false";
//
//        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "", $returnJsoncontent);
//    }

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


        $sql = "select * from ((select fromuserid, fromuserid as otherid, sendtime, content from tdc_chat where fromuserid = $theOtherUserId and touserid = $userid) as a) union 
(select fromuserid, touserid as otherid, sendtime, content from tdc_chat where fromuserid = $userid and touserid = $theOtherUserId) order by sendtime";
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