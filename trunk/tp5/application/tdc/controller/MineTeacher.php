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

    }

    public function FixTeacherNickName(Request $request){

    }

    public function FixTeacherTel(Request $request){

    }

    public function FixTeacherSex(Request $request){

    }

    public function FixTeacherBirthday(Request $request){

    }

    public function FixTeacherAddress(Request $request){

    }

    public function Arbitration(Request $request){

    }

    public function Logout(){

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

