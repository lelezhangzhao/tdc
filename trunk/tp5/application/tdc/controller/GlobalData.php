<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 2018/10/19
 * Time: 11:49
 */

namespace app\tdc\controller;

use app\tdc\api\Status;
use think\Controller;
use think\Db;
use think\Request;

class GlobalData{

    public function GetTag(){
        $sql = "select * from tdc_tag";
        $result = Db::query($sql);
        if(empty($result)){
            return Status::ReturnErrorStatus("ERROR_STATUS_LISTISNULL");
        }

        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "", json_encode($result));
    }

}