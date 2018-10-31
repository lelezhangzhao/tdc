<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 2018/10/9
 * Time: 13:58
 */

namespace app\tdc\controller;

use app\tdc\api\Status;
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

        //是否有电话权限
        $fromUserId = Session::get("userid");
        $toUserId = $result[0]["publishuserid"];
        $sql_tel = "select * from tdc_telpermission where fromuserid = $fromUserId and touserid = $toUserId and status = 0";
        $result_tel = Db::query($sql_tel);
        if(empty($result_tel)){
            $result[0]["tel"] = "1**********";
        }

        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "获取成功", json_encode($result));
    }

    public function Collection(Request $request){
        $publishId = $request->param("publishId");
        $sql = "select * from tdc_publish where id = $publishId";
        $result = Db::query($sql);
        if(empty($result) || $result[status] !== 0){
            return Status::ReturnErrorStatus("ERROR_STATUS_PUBLISHALREADYDELETE");
        }
        $userid = Session::get("userid");

        $sql = "select * from tdc_collection where userid = $userid";
        $result = Db::query($sql);

        //重新构造collectionid
        $collectionid = $result[publishid];
        $collection_arr = explode(";", $collectionid);
        $collection_len = count($collection_arr);
        if($collection_len == 10){
            PublishInfo::RebuildArray($collection_arr, 10);
            $collection_len -= 1;
        }
        $collection_arr[$collection_len] = $publishId;
        $collectionid = implode(";", $collection_arr);

        $sql = "update tdc_collection set publishid = $collectionid where userid = $userid";
        Db::execute($sql);

        return Status::ReturnJson("ERROR_STATUS_SUCCESS", "收藏成功");

    }

    private function RebuildArray(&$arr, $len){
        for($i = 0; $i < $len - 1; ++$i){
            $arr[$i] = $arr[$i + 1];
        }
    }

}