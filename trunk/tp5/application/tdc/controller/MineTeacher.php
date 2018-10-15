<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 2018/10/6
 * Time: 9:24
 */

namespace app\tdc\controller;

use app\tdc\api\Status;
use think\Controller;
use think\Session;
use think\Request;
use think\Db;


class MineTeacher extends Controller{
    public function GetPublishList(){

    }

    public function GetPublishInfo(Request $request){
        $publishId = $request->param("publishId");


    }

    public function FixPublishStatus(Request $request){
        $delete = $request->param("delete");
        $display = $request->param("display");


    }


    public function GetCollectionList(){

    }

    public function DeleteCollection(Request $request){
        $collectionId = $request->param("collectionId");
    }


    public function GetFooterList(){

    }

    public function DeleteFooter(Request $request){
        $footerId = $request->param("footerId");
    }

    public function PublishTeacherInfo(Request $request){

    }

    public function EditTeacherTag(Request $request){

    }

    public function FixTeacherLogo(Request $request){
        return $request;
    }

    public function FixTeacherName(Request $request){
        $name = $request->param("name");
        $userid = Session::get("userid");

        $sql = "update tdc_user set name = '" . $name . "' where id = $userid";
        Db::execute($sql);

        return Status::ReturnJson("ERROR_STATUS_SUCCESS", "修改成功");

    }

    public function FixTeacherNickName(Request $request){
        $nickName = $request->param("nickname");
        $userid = Session::get("userid");

        $sql = "update tdc_user set nickname = '" . $nickName . "' where id = $userid";
        Db::execute($sql);

        return Status::ReturnErrorStatus("ERROR_STATUS_SUCCESS");
    }

    public function FixTeacherTel(Request $request){
        $tel = $request->param("tel");
        $userid = Session::get("userid");
        $sql = "update tdc_user set tel = '" . $tel . "' where id = $userid";
        Db::execute($sql);
        return Status::ReturnErrorStatus("ERROR_STATUS_SUCCESS");
    }

    public function FixTeacherSex(Request $request){
        $sex = $request->param("sex");
        $userid = Session::get("userid");
        $sql = "update tdc_user set sex = $sex where id = $userid";
        Db::execute($sql);
        return Status::ReturnErrorStatus("ERROR_STATUS_SUCCESS");
    }

    public function FixTeacherBirthday(Request $request){
        $birthday = $request->param("birthday");
        $userid = Session::get("userid");
        $sql = "update tdc_user set birthday = $birthday where id = $userid";
        Db::execute($sql);
        return Status::ReturnErrorStatus("ERROR_STATUS_SUCCESS");
    }

    public function FixTeacherAddress(Request $request){
        $address = $request->param("address");
        $userid = Session::get("address");
        $sql = "update tdc_user set address = $address where id = $userid";
        Db::execute($sql);
        return Status::ReturnErrorStatus("ERROR_STATUS_SUCCESS");
    }

    public function Arbitration(Request $request){

    }

    public function Logout(Request $request){
        $logoutTime = $request->param("logoutTime");
        $userid = Session::get("userid");
        $sql = "update tdc_user set logouttime = $logoutTime where id = $userid";
        Db::execute($sql);

        Session::delete("userid");

        return Status::ReturnErrorStatus("ERROR_STATUS_SUCCESS");

    }
    
    public function GetMineTeacherInfo(){
        $userid = Session::get("userid");


        $sql = "select logo, name, nickname, tel, sex, birthday, address from tdc_user where id = $userid";

        $result = Db::query($sql);

        if(empty($result)){
            return Status::ReturnErrorStatus("ERROR_STATUS_USERISNOTEXIST");
        }


        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "", json_encode($result));


    }



}

