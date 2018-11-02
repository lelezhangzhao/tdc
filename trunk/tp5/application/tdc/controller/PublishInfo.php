<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 2018/10/9
 * Time: 13:58
 */

namespace app\tdc\controller;

use app\tdc\api\Status;
use app\tdc\api\Times;
use think\Controller;
use think\Request;
use think\Session;
use think\Db;

class PublishInfo extends Controller{
    public function GetPublishTeacherInfo(Request $request){

        $publishId = $request->param("publishId");


        $sql = "select * from (select b.id as publishuserid,b.logo,b.tel,b.name,b.nickname,a.id,a.status,a.workaddress,a.introduction from tdc_publish as a left join tdc_user as b on a.userid = b.id) as d where status = 0 and id = $publishId";

        $result = Db::query($sql);
        if(empty($result)){
            return Status::ReturnErrorStatus("ERROR_STATUS_PUBLISHALREADYDELETE");
        }

        $sql_evaluate = "select a.score,a.content,a.evaluatetime,a.disabledtime,a.status,b.nickname from tdc_evaluate as a join tdc_user as b on a.userid = b.id where a.publishid = $publishId";
        $result_evaluate = Db::query($sql_evaluate);
        $result[0]["evaluatelist"] = $result_evaluate;


        //是否已收藏该publishid
        $userid = Session::get("userid");
        $sql_hascollection = "select publishid from tdc_collection where userid = $userid";
        $result_hascollection = Db::query($sql_hascollection);

        $hasCollectioned = 0;
        if(!empty($result_hascollection)){
            if($this->ExistPublishId($result_hascollection[0]["publishid"], $publishId)){
                $hasCollectioned = 1;
            }
        }
        $result[0]["hascollectioned"] = $hasCollectioned;

        //是否有电话权限
        $fromUserId = Session::get("userid");
        $toUserId = $result[0]["publishuserid"];
        $sql_tel = "select * from tdc_telpermission where fromuserid = $fromUserId and touserid = $toUserId and status = 0";
        $result_tel = Db::query($sql_tel);
        if($fromUserId != $toUserId && empty($result_tel)){
            $result[0]["tel"] = "1**********";
        }

        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "获取成功", json_encode($result));
    }

    public function GetPublishSchoolInfo(Request $request){
        $publishId = $request->param("publishId");

        $sql = "select * from (select b.id as publishuserid, b.logo, b.tel, b.name, b.nickname, a.id, a.status, a.workaddress, a.introduction, a.wagesbymonthmin, a.wagesbymonthmax, a.wagesbyclassmin, a.wagesbyclassmax, a.wagesfacetoface, a.wagesbymonth, a.wagesbyclass, a.hirecount, a.hireinfo, a.requireinfo, a.tag from tdc_publish as a left join tdc_user as b on a.userid = b.id) as d where status = 0 and id = $publishId";
        $result = Db::query($sql);
        if(empty($result)){
            return Status::ReturnErrorStatus("ERROR_STATUS_PUBLISHALREADYDELETE");
        }
        $sql_evaluate = "select a.score, a.content, a.evaluatetime, a.disabledtime, a.status, b.nickname from tdc_evaluate as a join tdc_user as b on a.userid = b.id where a.publishid = $publishId";
        $result_evaluate = Db::query($sql_evaluate);

        $result[0]["evaluatelist"] = $result_evaluate;

        //是否已收藏该publishid
        $userid = Session::get("userid");
        $sql_hascollection = "select publishid from tdc_collection where userid = $userid";
        $result_hascollection = Db::query($sql_hascollection);

        $hasCollectioned = 0;
        if(!empty($result_hascollection)){
            if($this->ExistPublishId($result_hascollection[0]["publishid"], $publishId)){
                $hasCollectioned = 1;
            }
        }
        $result[0]["hascollectioned"] = $hasCollectioned;

        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "获取成功", json_encode($result));

    }

    public function Collection(Request $request){
        $publishId = $request->param("publishId");
        $sql = "select * from tdc_publish where id = $publishId";
        $result = Db::query($sql);

        if(empty($result) || $result[0]["status"] != 0){
            return Status::ReturnErrorStatus("ERROR_STATUS_PUBLISHALREADYDELETE");
        }
        $userid = Session::get("userid");


        $sql = "select * from tdc_collection where userid = $userid";
        $result = Db::query($sql);

        //重新构造collectionid
        $collectionid = $result[0]["publishid"];

        if($this->ExistPublishId($collectionid, $publishId)){
            return Status::ReturnErrorStatus("ERROR_STATUS_PUBLISHHASCOLLECTIONED");
        }
        $collectionid = $this->AddPublishId($collectionid, $publishId);

        $sql = "update tdc_collection set publishid = '" . $collectionid . "'where userid = $userid";
        Db::execute($sql);

        return Status::ReturnJson("ERROR_STATUS_SUCCESS", "收藏成功");

    }

    private function AddPublishId($collectionid, $publishId){
        if($collectionid == ""){
            return $publishId;
        }
        $collection_arr = explode(";", $collectionid);
        $collection_len = count($collection_arr);
        if($collection_len == 10){
            $this->RebuildArray($collection_arr, 10);
            $collection_len -= 1;
        }
        $collection_arr[$collection_len] = $publishId;
        $collectionid = implode(";", $collection_arr);
        return $collectionid;
    }

    private function ExistPublishId($collectionid, $publishId){

        if($collectionid == ""){
            return false;
        }
        $collection_arr = explode(";", $collectionid);
        //是否已收藏$publishid
        for($i = 0; $i < count($collection_arr); ++$i){
            if($collection_arr[$i] == $publishId){
                return true;
            }
        }
        return false;
    }

    private function RebuildArray(&$arr, $len){
        for($i = 0; $i < $len - 1; ++$i){
            $arr[$i] = $arr[$i + 1];
        }
    }

    public function ApplyForPermission(Request $request){
        $systemTime = Times::GetSystemTime();
        $toUserId = $request->param("touserid");
        $fromUserId = Session::get("userid");

        $sql = "select * from tdc_telpermission where fromuserid = $fromUserId and touserid = $toUserId";
        $result = Db::query($sql);
        if(!empty($result)){
            if($result[0]["status"] != 0){
                $sql = "update tdc_telpermission set permissiontime = '". $systemTime ."', status = 0 where fromuserid = $fromUserId and touserid = $toUserId";
                Db::execute($sql);
            }
        }else{
            $sql = "insert into tdc_telpermission(fromuserid, touserid, permissiontime, status) values($fromUserId, $toUserId, '" . $systemTime . "', 1)";
            Db::execute($sql);
        }

        return Status::ReturnJson("ERROR_STATUS_SUCCESS", "申请成功，等待对方确认");
    }

}