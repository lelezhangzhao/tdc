<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 2018/10/6
 * Time: 9:24
 */

namespace app\tdc\controller;

use app\tdc\api\GlobalData;
use app\tdc\api\Status;
use app\tdc\api\Times;
use app\tdc\model\Publish;
use think\Controller;
use think\Session;
use think\Request;
use think\Db;


class MineTeacher extends Controller{
    public function GetPublishList(){
        $userid = Session::get("userid");

        $sql = "select * from tdc_user where id = $userid";
        $result = Db::query($sql);

        $publishId = $result[0]["publishid"];


        $publishIdArr = explode(";", $publishId);

        if(count($publishIdArr) == 0){
            return Status::ReturnErrorStatus("ERROR_STATUS_LISTISNULL");
        }

        $publishes = array();

        foreach($publishIdArr as $item){

            $sql = "select a.id, a.publishobject, a.evaluateavg, a.evaluatecount, a.tag, a.workaddress, a.introduction, a.photos from tdc_publish as a where a.id = $item";
            $result = Db::query($sql);

            $publish = json_encode($result);

            $publish = substr($publish, 1, strlen($publish) - 2);

            array_push($publishes, json_decode($publish));
        }

        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "", json_encode($publishes));
    }

    public function GetPublishInfo(){
        $userid = Session::get("userid");

        $sql = "select * from tdc_user where id = $userid";
        $result = Db::query($sql);

        $count = count($result);

        return $count;


    }

    public function FixPublishStatus(Request $request){
        $delete = $request->param("delete");
        $display = $request->param("display");


    }


    public function GetCollectionList(){
        $userid = Session::get("userid");
        $sql = "select * from tdc_collection where userid = $userid";
        $result = Db::query($sql);

        if(empty($result)){
            return Status::ReturnErrorStatus("ERROR_STATUS_LISTISNULL");
        }
        $publishid = $result[0]["publishid"];
        if(empty($publishid)){
            return Status::ReturnErrorStatus("ERROR_STATUS_LISTISNULL");
        }
        $publishIdArr = explode(";", $publishid);

        $publishes = array();
        if(count($publishIdArr) == 0){
            return Status::ReturnErrorStatus("ERROR_STATUS_LISTISNULL");
        }

        foreach($publishIdArr as $item){
            $sql = "select * from tdc_publish where id = $item";
            $result = Db::query($sql);
            if($result[0]["publishobject"] == 0){
                $sql = "select a.id, a.publishobject, a.evaluateavg, a.evaluatecount, a.tag, a.workaddress, a.introduction, a.photos from tdc_publish as a where a.id = $item and a.publishobject = 0";
            }else if($result[0]["publishobject"] == 1){
                $sql = "select a.id, a.publishobject, a.evaluateavg, a.evaluatecount, a.tag, a.workaddress, a.introduction, a.photos from tdc_publish as a where a.id = $item and a.publishobject = 1";
            }

            $result = Db::query($sql);

            $publish = json_encode($result);

            $publish = substr($publish, 1, strlen($publish) - 2);

            array_push($publishes, json_decode($publish));
        }

        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "", json_encode($publishes));
    }

    public function DeleteCollection(Request $request){
        $collectionId = $request->param("collectionId");
    }


    public function GetFooterList(){
        $userid = Session::get("userid");
        $sql = "select * from tdc_history where userid = $userid";
        $result = Db::query($sql);

        if(empty($result)){
            return Status::ReturnErrorStatus("ERROR_STATUS_LISTISNULL");
        }
        $publishid = $result[0]["publishid"];
        $publishIdArr = explode(";", $publishid);

        $publishes = array();
        if(count($publishIdArr) == 0){
            return Status::ReturnErrorStatus("ERROR_STATUS_LISTISNULL");
        }

        foreach($publishIdArr as $item){
            $sql = "select * from tdc_publish where id = $item";
            $result = Db::query($sql);
            if($result[0]["publishobject"] == 0){
                $sql = "select a.id, a.publishobject, a.evaluateavg, a.evaluatecount, a.tag, a.workaddress, a.introduction, a.photos from tdc_publish as a where a.id = $item and a.publishobject = 0";
            }else if($result[0]["publishobject"] == 1){
                $sql = "select a.id, a.publishobject, a.evaluateavg, a.evaluatecount, a.tag, a.workaddress, a.introduction, a.photos from tdc_publish as a where a.id = $item and a.publishobject = 1";
            }

            $result = Db::query($sql);

            $publish = json_encode($result);

            $publish = substr($publish, 1, strlen($publish) - 2);

            array_push($publishes, json_decode($publish));
        }

        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "", json_encode($publishes));

    }

    public function DeleteFooter(Request $request){
        $footerId = $request->param("footerId");
    }

    public function PublishTeacherInfo(Request $request){
        $systemTime = Times::GetSystemTime();

        $userid = Session::get("userid");

        $userPublishId = Db::name("user")->where("id", $userid)->field("publishid")->find();



        if($userPublishId["publishid"] != null){

            $publishIdArr = explode(";", $userPublishId);

            $publish_len = count($publishIdArr);

            if($publish_len >= GlobalData::$maxPublishCount){
                return Status::ReturnErrorStatus("ERROR_STATUS_PUBLISHLISTISFULL");
            }
        }


        $tag = $request->param("tag");
        $workaddress = $request->param("workaddress");
        $introduction = $request->param("introduction");


        //插入publish
        $newPublish = new Publish();
        $newPublish->publishobject = 0;
        $newPublish->userid = $userid;
        $newPublish->workaddress = $workaddress;
        $newPublish->publishtime = $systemTime;
        $newPublish->status = 0;
        $newPublish->evaluateavg = 0;
        $newPublish->evaluatecount = 0;
        $newPublish->tag = $tag;
        $newPublish->introduction = $introduction;
        $newPublish->save();

        $newPublishId = $newPublish->id;


        if($userPublishId["publishid"] != null){
            $userPublishId = $userPublishId["publishid"] . ";" . $newPublishId;
        }else{
            $userPublishId = $newPublishId;
        }
        $sql = "update tdc_user set publishid = $userPublishId where id = $userid";
        Db::execute($sql);

        return Status::ReturnJson("ERROR_STATUS_SUCCESS", "发布成功");
    }

    public function EditTeacherTag(Request $request){
        $tag = $request->param("tag");

        $userid = Session::get("userid");
        $sql = "update tdc_user set tag = '" . $tag . "' where id = $userid";
        Db::execute($sql);
        return Status::ReturnJson("ERROR_STATUS_SUCCESS", "标签修改成功");
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
        $sql = "update tdc_user set birthday = '" . $birthday . "'where id = $userid";
        Db::execute($sql);
        return Status::ReturnErrorStatus("ERROR_STATUS_SUCCESS");
    }

    public function FixTeacherAddress(Request $request){
        $address = $request->param("address");
        $userid = Session::get("userid");
        $sql = "update tdc_user set address = '" . $address . "' where id = $userid";

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


        $sql = "select logo, name, nickname, tel, sex, DATE_FORMAT(birthday, '%Y-%m-%d') as birthday, address from tdc_user where id = $userid";

        $result = Db::query($sql);

        if(empty($result)){
            return Status::ReturnErrorStatus("ERROR_STATUS_USERISNOTEXIST");
        }


        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "", json_encode($result));
    }

    public function GetPreviewInfo(){
        $userid = Session::get("userid");

        $sql = "select name, nickname, logo, tel, introduction, workaddress, photos, tag from tdc_user where id = $userid";
        $result = Db::query($sql);

        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "", json_encode($result));
    }



}

