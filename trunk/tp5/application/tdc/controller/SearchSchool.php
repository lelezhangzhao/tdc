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

class SearchSchool extends Controller{
    public function GetDefaultSchoolList(){

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