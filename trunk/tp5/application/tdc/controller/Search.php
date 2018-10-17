<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 2018/10/17
 * Time: 10:35
 */

namespace app\tdc\controller;

use app\tdc\api\Status;
use think\Controller;
use think\Db;
use think\Session;

class Search extends Controller{
    public function GetDefaultTagList(){
        $sql = "select * from tdc_tag";
        $result = Db::query($sql);

        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "", json_encode($result));
    }

    public function GetMyRegion(){
        $userid = Session::get("userid");

        $sql = "select address from tdc_user where id = $userid";

        $result = Db::query($sql);

        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "", json_encode($result));
    }

}