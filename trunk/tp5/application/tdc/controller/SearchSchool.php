<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 2018/10/5
 * Time: 21:42
 */

namespace app\tdc\controller;

use think\Controller;
use think\Request;
use think\Db;

use app\tdc\api\Status;

class SearchSchool extends Controller{
    public function GetDefaultSchoolList(){
        //获取评价最高的10个
        $sql = "select a.id, a.tag, a.introduction, a.publishobject, b.name, b.logo from tdc_publish as a join tdc_user as b on a.userid = b.id where a.publishobject = 1 order by a.evaluateavg desc limit 10";
        $result = Db::query($sql);

        if(empty($result)){
            return Status::ReturnErrorStatus("ERROR_STATUS_LISTISNULL");
        }

        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "获取成功", json_encode($result));


    }

    public function GetSchoolListByCondition(Request $request){

        $region = $request->param("region");
        $danceType = $request->param("danceType");
        $welfare = $request->param("welfare");
        $other = $request->param("other");

        $region = str_replace(",", "-", $region);

        //workaddress匹配region
        //tag匹配danceType/welfare/other
        $sql = "select a.id, a.tag, a.introduction, a.publishobject, b.name, b.logo from tdc_publish as a join tdc_user as b on a.userid = b.id where a.publishobject = 1 and a.tag like '%" . $welfare . "%' and a.workaddress like '%" . $region . "%' and a.dancetype like '%" . $danceType . "%' and a.worktype like '%" . $other . "%'";

        $result = Db::query($sql);

        if(empty($result)){
            return Status::ReturnErrorStatus("ERROR_STATUS_LISTISNULL");
        }

        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "", json_encode($result));

    }


    public function GetSchoolInfo(Request $request){
        $publishId = $request->param("publishId");


    }

    public function Collection(Request $request){
        $publishId = $request->param("publishId");

    }

    public function GetTel(Request $request){
        $publishId = $request->param("publishId");

    }


}