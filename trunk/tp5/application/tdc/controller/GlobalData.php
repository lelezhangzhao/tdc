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

    public function AddChatKey(Request $request){
        $key = $request->param("key");
        $userid = $request->param("userid");

        $sql = "update tdc_user set chatkey = '" . $key . "'where id = $userid";
        Db::execute($sql);

        return Status::ReturnErrorStatus("ERROR_STATUS_SUCCESS");
    }

    public function GetName(Request $request){
        $userid = $request->param("userid");

        $sql = "select name from tdc_user where id = $userid";


        $result = Db::query($sql);
        $name = $result[0]["name"];
        return Status::ReturnJsonWithContent("RROR_STATUS_SUCCESS", "", $name);
    }

    public function GetLogo(Request $request){
        $userid = $request->param("userid");

        $sql = "select logo from tdc_user where id = $userid";
        $result = Db::query($sql);
        $logo = $result[0]["logo"];
        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "", $logo);
    }

    public function GetRoleByPublishId(Request $request){
        $publishid = $request->param("publishid");
        $sql = "select publishobject from tdc_publish where id = $publishid";
        $result = Db::query($sql);

        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "", $result[0]["publishobject"]);
    }

}