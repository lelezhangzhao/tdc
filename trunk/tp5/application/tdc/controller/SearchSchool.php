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
        $sql = "select * from tdc_publish where publishobject = 1 order by evaluateavg desc limit 10";
        $result = Db::query($sql);
        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "", json_encode($result));
    }

    public function GetSchoolListByCondition(Request $request){
        $map = $request->param("map");
        $search = $request->param("search");
        $field = $request->param("field");
        $danceType = $request->param("danceType");
        $welfare = $request->param("welfare");
        $other = $request->param("other");

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