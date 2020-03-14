<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 2018/10/6
 * Time: 9:24
 */

namespace app\tdc\controller;

use app\tdc\api\Status;
use app\tdc\api\Times;
use app\tdc\api\GlobalData as GlobalDataApi;
use app\tdc\model\Publish;
use app\tdc\model\User as UserModel;
use think\Controller;
use think\Request;
use think\Session;
use think\Db;


class MineSchool extends Controller{
    public function GetInitializeInfo(){
        //获取第一次加载信息
        $userid = Session::get("userid");
        $sql = "select name, logo from tdc_user where id = $userid";
        $result = Db::query($sql);

//        $sql_publish = "select a.id, a.tag, a.introduction, a.publishobject, b.name, b.logo from tdc_publish as a join tdc_user as b on a.userid = b.id where b.id = $userid";
//        $result_publish = Db::query($sql_publish);
//
//        $result[0]["publishlist"] = $result_publish;

        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "获取成功", json_encode($result));
    }

    public function GetPublishList(){
        $userid = Session::get("userid");

        $sql = "select * from tdc_user where id = $userid";
        $result = Db::query($sql);

        $publishId = $result[0]["publishid"];

        if($publishId == null){
            return Status::ReturnErrorStatus("ERROR_STATUS_LISTISNULL");
        }

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

    public function GetPreviewInfo(){
        $userid = Session::get("userid");
        $sql = "select name, logo, tel, introduction, address, workaddress, photos, tag, photos, wagesbymonthmin, wagesbymonthmax, wagesbyclassmin, wagesbyclassmax, wagesfacetoface, wagesbymonth, wagesbyclass, hirecount, requireinfo, dancetype, worktype from tdc_user where id = $userid";
        $result = Db::query($sql);

        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "", json_encode($result));
    }


    public function FixPublishStatus(Request $request){
        $delete = $request->param("delete");
        $display = $request->param("display");


    }


    public function GetCollectionList(){
        $userid = Session::get("userid");
        $sql = "select publishid from tdc_collection where userid = $userid";
        $result = Db::query($sql);

        if(empty($result)){
            return Status::ReturnErrorStatus("ERROR_STATUS_LISTISNULL");
        }
        $publishId = $result[0]["publishid"];
        if($publishId == null){
            return Status::ReturnErrorStatus("ERROR_STATUS_LISTISNULL");
        }

        //拆分publishid
        $publishArr = explode(";", $publishId);
        $publishes = array();
        foreach($publishArr as $item){
            $sql = "select a.id, a.publishobject, a.tag, a.introduction, b.name, b.logo from tdc_publish as a join tdc_user as b on a.userid = b.id where a.id = $item";
            $result = Db::query($sql);

            $publish = json_encode($result);

            $publish = substr($publish, 1, strlen($publish) - 2);

            array_push($publishes, json_decode($publish));
        }

        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "获取成功", json_encode($publishes));
    }

    public function DeleteCollection(Request $request){
        $collectionId = $request->param("collectionId");
    }


    public function GetHistoryList(){
        $userid = Session::get("userid");
        $sql = "select publishid from tdc_history where userid = $userid";
        $result = Db::query($sql);

        if(empty($result)){
            return Status::ReturnErrorStatus("ERROR_STATUS_LISTISNULL");
        }
        $publishId = $result[0]["publishid"];
        if($publishId == null){
            return Status::ReturnErrorStatus("ERROR_STATUS_LISTISNULL");
        }

        //拆分publishid
        $publishArr = explode(";", $publishId);
        $publishes = array();
        foreach($publishArr as $item){
            $sql = "select a.id, a.publishobject, a.tag, a.introduction, b.name, b.logo from tdc_publish as a join tdc_user as b on a.userid = b.id where a.id = $item";
            $result = Db::query($sql);

            $publish = json_encode($result);

            $publish = substr($publish, 1, strlen($publish) - 2);

            array_push($publishes, json_decode($publish));
        }

        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "获取成功", json_encode($publishes));
    }

    public function DeleteFooter(Request $request){
        $footerId = $request->param("footerId");
    }

    public function PublishSchoolInfo(Request $request){

        $systemTime = Times::GetSystemTime();

        $wagesbymonth = $request->param("wagesbymonth");
        $wagesbymonthmin = $request->param("wagesbymonthmin");
        $wagesbymonthmax = $request->param("wagesbymonthmax");
        $wagesbyclass = $request->param("wagesbyclass");
        $wagesbyclassmin = $request->param("wagesbyclassmin");
        $wagesbyclassmax = $request->param("wagesbyclassmax");
        $wagesfacetoface = $request->param("wagesfacetoface");
        $introduction = $request->param("introduction");

        $tag = $request->param("tag");
        $danceType = $request->param("danceType");
        $workType = $request->param("workType");
        $requireinfo = $request->param("teacherType");
        $count = $request->param("count");

        $hireinfo = "招聘" . $danceType . $workType . "老师" . $count . "位";


        $userid = Session::get("userid");
        $user = UserModel::where("id", $userid)->find();

        $user["wagesbymonth"] = $wagesbymonth == 1;
        $user["wagesbymonthmin"] = $wagesbymonthmin;
        $user["wagesbymonthmax"] = $wagesbymonthmax;
        $user["wagesbyclass"] = $wagesbyclass == 1;
        $user["wagesbyclassmin"] = $wagesbyclassmin;
        $user["wagesbyclassmax"] = $wagesbyclassmax;
        $user["wagesfacetoface"] = $wagesfacetoface == 1;
        $user["introduction"] = $introduction;
        $user["tag"] = $tag;
        $user["dancetype"] = $danceType;
        $user["worktype"] = $workType;
        $user["requireinfo"] = $requireinfo;
        $user['hireinfo'] = $hireinfo;
        $user["hirecount"] = $count;
        $user->save();

        //查询user发布数量
        $publishid = $user["publishid"];
        $publishidArr = explode(";", $publishid);
        $publishLen = count($publishidArr);
        if($publishLen >= GlobalDataApi::$maxPublishCount){
            return Status::ReturnErrorStatus("ERROR_STATUS_PUBLISHLISTISFULL");
        }

        $publish = new Publish();
        $publish->publishobject = 1;
        $publish->userid = $userid;
        $publish->workaddress = $user->workaddress;
        $publish->publishtime = $systemTime;
        $publish->status = 0;
        $publish->evaluateavg = 0;
        $publish->evaluatecount = 0;
        $publish->tag = $user->tag;
        $publish->introduction = $user->introduction;
        $publish->photos = $user->photos;
        $publish->wagesbymonth = $user->wagesbymonth;
        $publish->wagesbymonthmin = $user->wagesbymonthmin;
        $publish->wagesbymonthmax = $user->wagesbymonthmax;
        $publish->wagesbyclass = $user->wagesbyclass;
        $publish->wagesbyclassmin = $user->wagesbyclassmin;
        $publish->wagesbyclassmax = $user->wagesbyclassmax;
        $publish->wagesfacetoface = $user->wagesfacetoface;
        $publish->hirecount = $user->hirecount;
        $publish->hireinfo = $user->hireinfo;
        $publish->requireinfo = $user->requireinfo;
        $publish->photos = $user->photos;
        $publish->dancetype = $user->dancetype;
        $publish->worktype = $user->worktype;

        $publish->save();

        $newPublishId = $publish->id;

        if($user["publishid"] != ""){
            $userPublishId = $user["publishid"] . ";" . $newPublishId;
        }else{
            $userPublishId = $newPublishId;
        }

        /*
        if($publishLen == 0){
            $publishid = $newPublishId;
        }else{
            $publishid = $publishid . ";" . $newPublishId;
        }
        */
        $user->publishid = $userPublishId;

        $user->save();

        return Status::ReturnJson("ERROR_STATUS_SUCCESS", "发布成功");
    }

    public function EditSchoolTag(Request $request){
        $tag = $request->param("tag");

        $userid = Session::get("userid");
        $sql = "update tdc_user set tag = '" . $tag . "' where id = $userid";
        Db::execute($sql);
        return Status::ReturnJson("ERROR_STATUS_SUCCESS", "标签修改成功");
    }

    public function FixSchoolLogo(Request $request){

    }

    public function FixSchoolName(Request $request){
        $name = $request->param("name");
        $userid = Session::get("userid");

        $sql = "update tdc_user set name = '" . $name . "' where id = $userid";
        Db::execute($sql);

        return Status::ReturnJson("ERROR_STATUS_SUCCESS", "修改成功");
    }

    public function FixSchoolTel(Request $request){
        $tel = $request->param("tel");
        $userid = Session::get("userid");
        $sql = "update tdc_user set tel = '" . $tel . "' where id = $userid";
        Db::execute($sql);
        return Status::ReturnErrorStatus("ERROR_STATUS_SUCCESS");
    }

    public function FixSchoolAddress(Request $request){
        $address = $request->param("address");
        $userid = Session::get("userid");
        $sql = "update tdc_user set address = '" . $address . "' where id = $userid";

        Db::execute($sql);

        return Status::ReturnErrorStatus("ERROR_STATUS_SUCCESS");
    }

    public function Arbitration(Request $request){

    }

    public function Logout(){

    }


    public function GetSchoolInfo(){
        $userid = Session::get("userid");


        $sql = "select logo, name, tel, address from tdc_user where id = $userid";

        $result = Db::query($sql);

        if(empty($result)){
            return Status::ReturnErrorStatus("ERROR_STATUS_USERISNOTEXIST");
        }


        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "", json_encode($result));

    }

    public function UploadPhoto(Request $request){
        $userid = Session::get("userid");
        $fileName = $request->param("fileName");

        $file = $request->file("$fileName");
        if($file){
            if(!$file->checkImg()){
                return Status::ReturnErrorStatus("ERROR_STATUS_UPLOADISNOTIMAGE");
            }
            $info = $file->move(ROOT_PATH . 'public/static/image/photo');

            if($info){
                $saveFileName = str_replace("\\", "/", $info->getSaveName());
                $imgurl = '/static/image/photo/' . $saveFileName;

                //存入数据库
                $user = User::get($userid);
                $photos = $user["photos"];
                $photoArr = explode(";", $photos);
                if(count($photoArr) >= 4){
                    return Status::ReturnErrorStatus("ERROR_STATUS_PHOTOISFULL");
                }
                if($photos == null){
                    $photos = $imgurl;
                }else{
                    $photos = $photos . ";" . $imgurl;
                }
                $user["photos"] = $photos;

                $user->save();
                return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "", $imgurl);
            }
        }
        return Status::ReturnErrorStatus("ERROR_STATUS_FAILED");
    }

    public function DeletePhoto(Request $request){
        $photoId = $request->param("photoid");
        $userid = Session::get("userid");

        $user = User::get($userid);
        $photos = $user["photos"];
        if($photos == null){
            return Status::ReturnErrorStatus("ERROR_STATUS_FAILED");
        }
        $photoArr = explode(";", $photos);
        array_splice($photoArr, $photoId, 1);
        if(count($photoArr) == 0){
            $photos = null;
            $user["photos"] = $photos;
        }else{
            $photos = implode(";", $photoArr);
            $user["photos"] = $photos;
        }
        $user->save();
        return Status::ReturnErrorStatus("ERROR_STATUS_SUCCESS");
    }

//    public function FixDanceType(Request $request){
//        $danceType = $request->param("danceType");
//
//        $userid = Session::get("userid");
//
//        $sql = "update tdc_user set dancetype = '" . $danceType . "' where id = $userid";
//        Db::execute($sql);
//
//        return Status::ReturnJson("ERROR_STATUS_SUCCESS", "修改成功");
//    }
//
//    public function FixWorkType(Request $request){
//        $workType = $request->param("workType");
//        $userid = Session::get("userid");
//        $sql = "update tdc_user set worktype = '" . $workType . "' where id = $userid";
//        Db::execute($sql);
//
//        return Status::ReturnJson("ERROR_STATUS_SUCCESS", "修改成功");
//    }
//
//    public function FixTeacherType(Request $request){
//        $teacherType = $request->param("teacherType");
//        $userid = Session::get("userid");
//        $sql = "update tdc_user set requireinfo = '" . $teacherType . "' where id = $userid";
//        Db::execute($sql);
//
//        return Status::ReturnJson("ERROR_STATUS_SUCCESS", "修改成功");
//    }
//
//    public function FixHireCount(Request $request){
//        $count = $request->param("count");
//        $userid = Session::get("userid");
//        $sql = "update tdc_user set hirecount = $count where id = $userid";
//        Db::execute($sql);
//        return Status::ReturnJson("ERROR_STATUS_SUCCESS", "修改成功");
//
//    }
//
//    public function FixSchoolWorkAddress(Request $request){
//        $workAddress = $request->param("workAddress");
//
//        $userid = Session::get("userid");
//
//        $sql = "update tdc_user set workaddress = '" . $workAddress . "' where id = $userid";
//        Db::execute($sql);
//
//        return Status::ReturnJson("ERROR_STATUS_SUCCESS", "更新成功");
//    }
}